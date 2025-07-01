from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from datetime import datetime
from enum import Enum
import uuid

class AchievementType(str, Enum):
    LEVEL_BASED = "level_based"
    SCORE_BASED = "score_based"
    STREAK_BASED = "streak_based"
    TIME_BASED = "time_based"
    SPECIAL = "special"

class Achievement(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    icon: str
    type: AchievementType
    difficulty: Optional[str] = None
    requirement: Dict[str, Any]  # e.g., {"level": 10}, {"score": 1000}
    points: int = 0
    rarity: str = "common"  # common, rare, epic, legendary
    is_hidden: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

class UserAchievement(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    achievement_id: str
    achievement_name: str
    achieved_at: datetime = Field(default_factory=datetime.utcnow)
    progress: Dict[str, Any] = Field(default_factory=dict)

class AchievementProgress(BaseModel):
    achievement_id: str
    achievement_name: str
    description: str
    icon: str
    type: str
    requirement: Dict[str, Any]
    current_progress: Dict[str, Any]
    is_completed: bool = False
    completion_percentage: float = 0.0