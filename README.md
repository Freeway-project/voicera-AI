# voicera-AI|# from emotion-app/backend
python -m venv .venv && source .venv/bin/activate
pip install --upgrade pip
pip install fastapi uvicorn[standard] transformers torch --extra-index-url https://download.pytorch.org/whl/cpu
