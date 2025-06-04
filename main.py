# main.py
from fastapi import FastAPI, Depends, HTTPException, status, BackgroundTasks
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import List, Optional
import asyncio
from contextlib import asynccontextmanager

from database import SessionLocal, engine, Base
from models import User, Task
from schemas import UserCreate, UserResponse, TaskCreate, TaskResponse, TaskUpdate, Token, TaskStats
from auth import get_password_hash, verify_password, create_access_token, decode_access_token
from email_service import send_task_notification, send_deadline_reminder
from crud import create_user, get_user_by_email, create_task, get_tasks, update_task, delete_task, get_task_stats

# Create tables
Base.metadata.create_all(bind=engine)

security = HTTPBearer()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    asyncio.create_task(background_task_scheduler())
    yield
    # Shutdown
    pass

app = FastAPI(title="Task Manager API", lifespan=lifespan)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Dependency to get current user
async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(get_db)):
    token = credentials.credentials
    payload = decode_access_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials"
        )
    
    user = db.query(User).filter(User.email == payload.get("sub")).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    return user

# Background task scheduler
async def background_task_scheduler():
    while True:
        await asyncio.sleep(3600)  # Check every hour
        db = SessionLocal()
        try:
            # Get tasks with upcoming deadlines (within 24 hours)
            upcoming_deadline = datetime.utcnow() + timedelta(hours=24)
            tasks = db.query(Task).filter(
                Task.deadline <= upcoming_deadline,
                Task.deadline > datetime.utcnow(),
                Task.status != "completed"
            ).all()
            
            for task in tasks:
                user = db.query(User).filter(User.id == task.user_id).first()
                if user:
                    send_deadline_reminder(user.email, task.title, task.deadline)
        finally:
            db.close()

# Authentication endpoints
@app.post("/auth/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, user.email)
    if db_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )
    return create_user(db, user)

@app.post("/auth/login", response_model=Token)
def login(user: UserCreate, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, user.email)
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )
    
    access_token = create_access_token(data={"sub": db_user.email})
    return {"access_token": access_token, "token_type": "bearer"}

# Task endpoints
@app.post("/tasks", response_model=TaskResponse)
def create_task_endpoint(
    task: TaskCreate, 
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    db_task = create_task(db, task, current_user.id)
    # Send confirmation email in background
    background_tasks.add_task(
        send_task_notification, 
        current_user.email, 
        db_task.title, 
        "created"
    )
    return db_task

@app.get("/tasks", response_model=List[TaskResponse])
def read_tasks(
    status: Optional[str] = None,
    priority: Optional[str] = None,
    date_from: Optional[str] = None,
    date_to: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return get_tasks(db, current_user.id, status, priority, date_from, date_to)

@app.put("/tasks/{task_id}", response_model=TaskResponse)
def update_task_endpoint(
    task_id: int,
    task: TaskUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return update_task(db, task_id, task, current_user.id)

@app.delete("/tasks/{task_id}")
def delete_task_endpoint(
    task_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return delete_task(db, task_id, current_user.id)

@app.get("/tasks/stats", response_model=TaskStats)
def get_task_statistics(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return get_task_stats(db, current_user.id)
