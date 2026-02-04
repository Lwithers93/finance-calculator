from pydantic import BaseModel
from typing import List


class TimelinePoint(BaseModel):
    year: int
    total: float


class SavingsResult(BaseModel):
    final: float
    timeline: List[TimelinePoint]
