from transformers import pipeline


summarizer = pipeline(
    "summarization",
    model="sshleifer/distilbart-cnn-12-6",
    device=-1
)

# Multi-emotion (anger, disgust, fear, joy, neutral, sadness, surprise)
emotion = pipeline(
    "text-classification",
    model="j-hartmann/emotion-english-distilroberta-base",
    return_all_scores=True
)

__all__ = ["summarizer", "emotion"]
