from motor.motor_asyncio import AsyncIOMotorClient
from typing import Optional, List
from models.user import User, UserCreate, UserUpdate
from datetime import datetime
import os

class UserService:
    def __init__(self, db: AsyncIOMotorClient):
        self.db = db
        self.collection = db.users

    async def create_user(self, user_data: UserCreate) -> User:
        # Check if username or email already exists
        existing_user = await self.collection.find_one({
            "$or": [
                {"username": user_data.username},
                {"email": user_data.email}
            ]
        })
        
        if existing_user:
            if existing_user["username"] == user_data.username:
                raise ValueError("Username already exists")
            if existing_user["email"] == user_data.email:
                raise ValueError("Email already exists")
        
        user = User(**user_data.dict())
        result = await self.collection.insert_one(user.dict())
        
        if result.inserted_id:
            return user
        raise Exception("Failed to create user")

    async def get_user_by_id(self, user_id: str) -> Optional[User]:
        user_data = await self.collection.find_one({"id": user_id})
        return User(**user_data) if user_data else None

    async def get_user_by_username(self, username: str) -> Optional[User]:
        user_data = await self.collection.find_one({"username": username})
        return User(**user_data) if user_data else None

    async def get_user_by_email(self, email: str) -> Optional[User]:
        user_data = await self.collection.find_one({"email": email})
        return User(**user_data) if user_data else None

    async def update_user(self, user_id: str, update_data: UserUpdate) -> Optional[User]:
        update_dict = {k: v for k, v in update_data.dict().items() if v is not None}
        
        if update_dict:
            update_dict["last_active"] = datetime.utcnow()
            
            result = await self.collection.update_one(
                {"id": user_id},
                {"$set": update_dict}
            )
            
            if result.modified_count:
                return await self.get_user_by_id(user_id)
        
        return await self.get_user_by_id(user_id)

    async def increment_games_played(self, user_id: str) -> None:
        await self.collection.update_one(
            {"id": user_id},
            {
                "$inc": {"total_games_played": 1},
                "$set": {"last_active": datetime.utcnow()}
            }
        )

    async def add_achievement(self, user_id: str, achievement_id: str) -> None:
        await self.collection.update_one(
            {"id": user_id},
            {"$addToSet": {"achievements": achievement_id}}
        )

    async def get_top_users(self, limit: int = 10) -> List[User]:
        cursor = self.collection.find().sort("total_games_played", -1).limit(limit)
        users = []
        async for user_data in cursor:
            users.append(User(**user_data))
        return users

    async def delete_user(self, user_id: str) -> bool:
        result = await self.collection.delete_one({"id": user_id})
        return result.deleted_count > 0