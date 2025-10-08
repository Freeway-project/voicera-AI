from fastapi import APIRouter
from app.schemas.text import TextIn
from app.services.nlp import summarizer

router = APIRouter(prefix="/api", tags=["summarize"])

 @router.post("/summarize")
def summarize(payload: TextIn):
    text = payload.text.strip()
    max_tokens = 180
    if payload.max_words:
        max_tokens = max(60, min(300, payload.max_words * 2))
    out = summarizer(
        text,
        max_length=max_tokens,
        min_length=max(30, max_tokens // 3),
        do_sample=False
    )
    return {"summary": out[0]["summary_text"]}
