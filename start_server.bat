@echo off
start cmd /k "cd backend && venv\Scripts\activate && uvicorn server:app --reload"
start cmd /k "cd frontend && npm start"