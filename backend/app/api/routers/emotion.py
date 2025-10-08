from fastapi import APIRouter
from app.schemas.text import TextIn
from app.services.nlp import emotion

router = APIRouter(prefix="/api", tags=["emotion"])

 @router.post("/emotion")
def detect_emotion(payload: TextIn):
    text = payload.text.strip()
    scores = sorted(emotion(text)[0], key=lambda x: x["score"], reverse=True)
    return {"top": scores[0], "probs": scores}
