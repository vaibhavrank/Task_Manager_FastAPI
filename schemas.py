
# schemas.py
from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional
from models import PriorityEnum, StatusEnum

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    deadline: datetime
    priority: PriorityEnum = PriorityEnum.MEDIUM

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    deadline: Optional[datetime] = None
    priority: Optional[PriorityEnum] = None
    status: Optional[StatusEnum] = None

class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    deadline: datetime
    priority: PriorityEnum
    status: StatusEnum
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class TaskStats(BaseModel):
    total_tasks: int
    pending: int
    in_progress: int
    completed: int
    high_priority: int
    medium_priority: int
    low_priority: int

