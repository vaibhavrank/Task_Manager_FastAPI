
# database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from decouple import config
import os

# Database URL - SQLite for development, PostgreSQL for production
DATABASE_URL = config("DATABASE_URL", default="sqlite:///./task_manager.db")

if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
else:
    engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

from models import Base
