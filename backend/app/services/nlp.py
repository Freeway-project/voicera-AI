from transformers import pipeline
import whisper


summarizer = pipeline(
    "summarization",
    model="sshleifer/distilbart-cnn-12-6",
    device=-1
)


emotion = pipeline("text-classification", model="app/models/emotion-roberta-demo", return_all_scores=True)


# Load Whisper model for speech-to-text
whisper_model = whisper.load_model("base")


def transcribe_audio(audio_path: str) -> str:
    """
    Transcribe audio file to text using Whisper
    """
    result = whisper_model.transcribe(audio_path)
    return result["text"]


__all__ = ["summarizer", "emotion", "transcribe_audio"]
