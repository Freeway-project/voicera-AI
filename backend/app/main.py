from fastapi import FastAPI
from app.core.config import setup_cors
from app.api import api_router

def get_app() -> FastAPI:
    app = FastAPI(title="NLP Demo (Modular FastAPI)")
    setup_cors(app)
    app.include_router(api_router)
    return app

app = get_app()
