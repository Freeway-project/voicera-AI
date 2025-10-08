#!/usr/bin/env bash
set -e

echo "🚀 Starting model training..."

# Activate virtual environment
source .venv/bin/activate

# Check if model already exists
if [ -d "app/models/emotion-roberta-demo" ]; then
    echo "⚠️  Model already exists!"
    echo "Removing old model to retrain..."
    rm -rf app/models/emotion-roberta-demo
fi

# Create models directory
mkdir -p app/models

echo "🎓 Training emotion detection model..."
echo "⏰ This will take 10-20 minutes..."
echo ""

# Run training
python app/train_emotion.py

echo ""
echo "✅ Training complete!"
