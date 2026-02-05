from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from funcs.calculate_interest import calculateTotalWithTimeline, validateData
from models.savings import SavingsData, ValidatedSavingsData
import math

app = FastAPI()

# Allow requests from my frontend origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/save_savings")  # Decorate the function to become endpoint
async def save_savings(data: SavingsData):
    # Validate user input data
    valid_data = validateData(data)
    # Pass valid data to calculate function
    calculated_data = calculateTotalWithTimeline(valid_data)
    # Get results
    total = calculated_data["final"]  # savings total
    timeline = calculated_data["timeline"]  # timeline of yearly totals

    return calculated_data


@app.get("/api/hello")
async def hello():
    return {"message": "Hello from Python Luke!"}
