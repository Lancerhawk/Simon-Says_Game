from pydantic import BaseModel, Field, EmailStr
from typing import Optional, Dict, List
from datetime import datetime
import uuid

class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    username: str = Field(..., min_length=3, max_length=20)
    email: EmailStr
    avatar_url: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_active: datetime = Field(default_factory=datetime.utcnow)
    total_games_played: int = 0
    achievements: List[str] = Field(default_factory=list)
    preferences: Dict = Field(default_factory=dict)

class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=20)
    email: EmailStr
    avatar_url: Optional[str] = None

class UserUpdate(BaseModel):
    username: Optional[str] = Field(None, min_length=3, max_length=20)
    email: Optional[EmailStr] = None
    avatar_url: Optional[str] = None
    preferences: Optional[Dict] = None