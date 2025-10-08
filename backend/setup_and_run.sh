#!/usr/bin/env bash

# Exit on error
set -e

# Create virtual environment if it doesn't exist
if [ ! -d ".venv" ]; then
    python3 -m venv .venv
fi

# Install dependencies
.venv/bin/pip install -r requirements.txt --extra-index-url https://download.pytorch.org/whl/cpu

# Run the application
.venv/bin/uvicorn app.main:app --reload --port 5000
