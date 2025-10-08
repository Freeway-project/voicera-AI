from fastapi import APIRouter
from .routers import summarize, emotion, transcribe

api_router = APIRouter()
api_router.include_router(summarize.router)
api_router.include_router(emotion.router)
api_router.include_router(transcribe.router)
