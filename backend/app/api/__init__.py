from fastapi import APIRouter
from .routers import summarize, emotion

api_router = APIRouter()
api_router.include_router(summarize.router)
api_router.include_router(emotion.router)
