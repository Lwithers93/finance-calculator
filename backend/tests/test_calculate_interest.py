import math
import pytest
from src.funcs.calculate_interest import validateData
from src.models.savings import SavingsData


# Test data is rounded and typed correctly
def test_validate_data_rounds_and_casts_values():
    data = SavingsData(
        frequency="monthly", amount=2000.578, deposits=200.138, rate=4.4564, time=3.9
    )

    validated = validateData(data)

    assert validated.amount == 2000.58  # Check for float
    assert validated.deposits == 200.14  # Check for float
    assert validated.rate == 4.46  # Check for float
    assert validated.time == 3  # Check for int


# Test for validation on error
def test_validate_data_raises_on_negative_values():
    data = SavingsData(
        frequency="yearly", amount=-100.0, deposits=200.0, rate=4.0, time=3
    )

    with pytest.raises(ValueError):
        validateData(data)


# Test that infinite values are rejected
def test_validate_data_rejects_infinite_values():
    data = SavingsData(
        frequency="yearly", amount=math.inf, deposits=200.0, rate=4.0, time=3
    )

    with pytest.raises(ValueError):
        validateData(data)
