from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum
import uuid

class GameDifficulty(str, Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"
    NONSTOP = "nonstop"

class GameStatus(str, Enum):
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    ABANDONED = "abandoned"

class GameSession(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    difficulty: GameDifficulty
    status: GameStatus = GameStatus.IN_PROGRESS
    level_reached: int = 1
    final_score: int = 0
    sequence_length: int = 1
    total_attempts: int = 0
    correct_sequences: int = 0
    started_at: datetime = Field(default_factory=datetime.utcnow)
    completed_at: Optional[datetime] = None
    duration_seconds: Optional[int] = None
    mistakes_made: int = 0
    is_high_score: bool = False

class GameSessionCreate(BaseModel):
    user_id: str
    difficulty: GameDifficulty

class GameSessionUpdate(BaseModel):
    status: Optional[GameStatus] = None
    level_reached: Optional[int] = None
    final_score: Optional[int] = None
    sequence_length: Optional[int] = None
    total_attempts: Optional[int] = None
    correct_sequences: Optional[int] = None
    completed_at: Optional[datetime] = None
    duration_seconds: Optional[int] = None
    mistakes_made: Optional[int] = None
    is_high_score: Optional[bool] = None

class HighScore(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    username: str
    difficulty: GameDifficulty
    score: int
    level_reached: int
    achieved_at: datetime = Field(default_factory=datetime.utcnow)
    duration_seconds: int
    sequence_length: int

class LeaderboardEntry(BaseModel):
    rank: int
    user_id: str
    username: str
    score: int
    level_reached: int
    achieved_at: datetime
    duration_seconds: int