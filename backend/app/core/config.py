from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

ALLOWED_ORIGINS = [
  "*"
]

def setup_cors(app: FastAPI):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=ALLOWED_ORIGINS,
        allow_credentials=False,
        allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allow_headers=["Content-Type", "Authorization"],
    )
