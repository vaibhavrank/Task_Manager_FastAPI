
# crud.py
from sqlalchemy.orm import Session
from sqlalchemy import and_
from models import User, Task
from schemas import UserCreate, TaskCreate, TaskUpdate
from auth import get_password_hash
from datetime import datetime
from dateutil import parser

def create_user(db: Session, user: UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_task(db: Session, task: TaskCreate, user_id: int):
    db_task = Task(**task.dict(), user_id=user_id)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def get_tasks(db: Session, user_id: int, status=None, priority=None, date_from=None, date_to=None):
    query = db.query(Task).filter(Task.user_id == user_id)
    
    if status:
        query = query.filter(Task.status == status)
    if priority:
        query = query.filter(Task.priority == priority)
    if date_from:
        date_from = parser.parse(date_from)
        query = query.filter(Task.created_at >= date_from)
    if date_to:
        date_to = parser.parse(date_to)
        query = query.filter(Task.created_at <= date_to)
    
    return query.order_by(Task.created_at.desc()).all()

def update_task(db: Session, task_id: int, task: TaskUpdate, user_id: int):
    db_task = db.query(Task).filter(and_(Task.id == task_id, Task.user_id == user_id)).first()
    if not db_task:
        return None
    
    for field, value in task.dict(exclude_unset=True).items():
        setattr(db_task, field, value)
    
    db_task.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_task)
    return db_task

def delete_task(db: Session, task_id: int, user_id: int):
    db_task = db.query(Task).filter(and_(Task.id == task_id, Task.user_id == user_id)).first()
    if not db_task:
        return None
    
    db.delete(db_task)
    db.commit()
    return {"message": "Task deleted successfully"}

def get_task_stats(db: Session, user_id: int):
    tasks = db.query(Task).filter(Task.user_id == user_id).all()
    
    stats = {
        "total_tasks": len(tasks),
        "pending": len([t for t in tasks if t.status.value == "pending"]),
        "in_progress": len([t for t in tasks if t.status.value == "in_progress"]),
        "completed": len([t for t in tasks if t.status.value == "completed"]),
        "high_priority": len([t for t in tasks if t.priority.value == "high"]),
        "medium_priority": len([t for t in tasks if t.priority.value == "medium"]),
        "low_priority": len([t for t in tasks if t.priority.value == "low"])
    }
    
    return stats
