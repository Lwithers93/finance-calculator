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
    if not isinstance(data, ValidatedSavingsData):
        print(f"Error: Expected Valid Savings Data, got {type(valid_data.__name__)}")
        return {"message": "Invalid data input from user. Please try again."}
    # Pass valid data to calculate function
    calculated_data = calculateTotalWithTimeline(valid_data)
    # Get results
    total = calculated_data["final"]  # savings total
    timeline = calculated_data["timeline"]  # timeline of yearly totals

    return {
        "message": f"Starting with £{data.amount:.2f}. Depositing £{data.deposits:.2f} at {data.frequency} intervals. You have saved £{total}."
    }


# @app.get("/api/hello")
# async def hello():
#     return {"message": "Hello from Python Luke!"}
