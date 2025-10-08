#!/usr/bin/env bash
cd "$(dirname "$0")"
source .venv/bin/activate
.venv/bin/uvicorn app.main:app --reload --port 5000
