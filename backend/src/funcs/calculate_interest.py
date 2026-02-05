import math
import numpy as np
from models.savings import SavingsData, ValidatedSavingsData
from models.output import SavingsResult, TimelinePoint
from typing import List


def validateData(data: SavingsData) -> ValidatedSavingsData:
    # For each field in the data object
    for field_name in ["amount", "deposits", "rate", "time"]:
        value = getattr(data, field_name)

        # Check numbers for negatives or if infinite
        if not math.isfinite(value) or value < 0:
            raise ValueError(
                f"{field_name} must be a positive number and not infinite. Got: 0{value}"
            )
        # Round money values to 2 decimal places
        if field_name in ["amount", "deposits", "rate"]:
            rounded = round(float(value), 2)
            setattr(data, field_name, rounded)
        # Ensure time is an integer
        if field_name == "time":
            setattr(data, field_name, int(value))
    return data


def calculateTotalWithTimeline(data: ValidatedSavingsData) -> SavingsResult:
    # Set data variables
    initial = data.amount
    deposits = data.deposits
    rate = data.rate / 100
    years = data.time

    timeline: List[TimelinePoint] = []  # My list of savings over time
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
        "final": round(total, 2),
        "timeline": timeline,
    }
