# finance-calculator

A full-stack finance calculator application built with:

⚛️ React (Frontend)

🚀 FastAPI (Python backend)

🔗 REST API communication between frontend and backend

This app allows users to perform common financial calculations (e.g. loan payments, interest calculations, investment growth, etc.) through a simple web interface.

## Local Development Setup

Make sure you have installed:

- Node.js(v18+ recommended)
- npm or yarn
- Python (3.9+ recommended)
- pip
- (Optional but recommeneded) virtualenv

## Backend Setup

1. Navigate to backend folder:
   cd backend
2. Create virtual environment:
   python3 -m venv venv
   venv/Scripts/activate
3. Install dependencies:
   pip install fastapi uvicorn
4. Run backend server
   uvicorn main:app --reload

Backend will run at: http://localhost:8000

## Frontend Setup

1. Navigate to folder:
   cd frontend
2. Install dependencies:
   npm install
3. Start development server:
   npm start
   or (if using vite)
   npm run dev

Frontend will run at: http://localhost:3000

## Connect Frontend to Backend

- Update main.py with localhost for frontend
- Ensure Frontend and Backend are running in separate terminals

## Future Improvements

Upcoming future improvements:

- Authentication for users
- Persistent storage for ongoing savings data
- Income and tax calculations
- Dockerization (frontend + backend)

## Author

Luke Withers
