#!/usr/bin/env bash
set -e

echo "🧹 Cleaning up old environment..."
rm -rf .venv __pycache__ app/__pycache__ app/**/__pycache__

echo "📦 Creating virtual environment..."
python3 -m venv .venv

echo "⬆️  Upgrading pip..."
source .venv/bin/activate
pip install --upgrade pip

echo "📥 Installing dependencies..."
pip install -r requirements.txt

echo "📥 Installing PyTorch (CPU version)..."
pip install torch==2.4.0 torchvision==0.19.0 torchaudio==2.4.0 --index-url https://download.pytorch.org/whl/cpu

echo "✅ Setup complete! Run ./run.sh to start the server"
