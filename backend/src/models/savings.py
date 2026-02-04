from pydantic import BaseModel
from typing import Literal


# Pydantic model for type-safe request/response
class SavingsData(BaseModel):
    frequency: str  # can validate against allowd options
    amount: float
    deposits: float
    rate: float
    time: int


# Model for validated data
class ValidatedSavingsData(BaseModel):
    frequency: Literal["monthly", "yearly"]
    amount: float
    deposits: float
    rate: float
    time: int
