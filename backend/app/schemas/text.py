from pydantic import BaseModel, Field

class TextIn(BaseModel):
    text: str = Field(..., min_length=1)
    max_words: int | None = Field(default=None, ge=10, le=300)
