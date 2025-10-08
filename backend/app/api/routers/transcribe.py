from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.nlp import transcribe_audio
import tempfile
import os

router = APIRouter(prefix="/api", tags=["transcribe"])

@router.post("/transcribe")
async def transcribe(audio: UploadFile = File(...)):
    """
    Transcribe audio file to text using Whisper model
    """
    if not audio.content_type or not audio.content_type.startswith("audio/"):
        raise HTTPException(status_code=400, detail="File must be an audio file")

    try:
        # Save uploaded file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as tmp_file:
            content = await audio.read()
            tmp_file.write(content)
            tmp_path = tmp_file.name

        # Transcribe audio
        transcript = transcribe_audio(tmp_path)

        # Clean up temp file
        os.unlink(tmp_path)

        return {"text": transcript}

    except Exception as e:
        # Clean up temp file if it exists
        if 'tmp_path' in locals() and os.path.exists(tmp_path):
            os.unlink(tmp_path)
        raise HTTPException(status_code=500, detail=f"Transcription failed: {str(e)}")
