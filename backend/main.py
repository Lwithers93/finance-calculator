from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
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


# Pydantic model for type-safe request/response
class SavingsData(BaseModel):
    frequency: str  # can validate against allowd options
    amount: float
    deposits: float
    rate: float
    time: int


def calculateTotalWithTimeline(data):
    # Set data variables
    initial = float(data.amount)
    deposits = float(data.deposits)
    rate = float(data.rate) / 100
    years = int(data.time)

    timeline = []  # My list of savings over time
    total = initial  # Initialise savings total

    # Initialise timeline with year 0 value
    timeline.append({"year": 0, "total": round(total, 2)})

    if data.frequency == "yearly":
        for year in range(1, years + 1):
            total = total * (1 + rate) + deposits
            timeline.append({"year": year, "total": round(total, 2)})
    elif data.frequency == "monthly":
        monthly_rate = rate / 12

        for year in range(1, years + 1):
            for _ in range(12):
                total = total * (1 + monthly_rate) + deposits
            timeline.append({"year": year, "total": round(total, 2)})

    return {
        "final": f"{total:.2f}",
        "timeline": timeline,
    }


# def calculateTotal(data):
#     initial = data.amount
#     deposits = data.deposits
#     rate = float(data.rate) / 100
#     time = data.time
#     if data.frequency == "yearly":
#         total = (
#             initial * math.pow((1 + rate), time)
#             + deposits * (math.pow(1 + rate, time) - 1) / rate
#         )
#     elif data.frequency == "monthly":
#         n = 12
#         rate_monthly = rate / n
#         total_months = time * n
#         total = (
#             initial * (1 + rate_monthly) ** total_months
#             + deposits * ((1 + rate_monthly) ** total_months - 1) / rate_monthly
#         )

#     return f"{total: .2f}"


@app.post("/api/save_savings")  # Decorate the function to become endpoint
async def save_savings(data: SavingsData):
    # For now just echo back information provided
    calculated_data = calculateTotalWithTimeline(data)
    total = calculated_data["final"]
    timeline = calculated_data["timeline"]

    return {
        "message": f"Starting with £{data.amount:.2f}. Depositing £{data.deposits:.2f} at {data.frequency} intervals. You have saved £{total}."
    }
    # return calculated_data


@app.get("/api/hello")
async def hello():
    return {"message": "Hello from Python Luke!"}
