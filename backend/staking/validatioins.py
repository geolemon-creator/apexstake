
from django.core.exceptions import ValidationError
from django.utils import timezone
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from rest_framework.exceptions import NotFound

def validate_amount(amount, user_balance):
    """
    Валидация суммы
    """
    try:
        amount = float(amount)
    except ValueError:
        raise ValidationError('Amount must be a valid number.')

    if amount <= 0:
        raise ValidationError('Amount must be greater than zero.')

    if user_balance < amount:
        raise ValidationError('Insufficient balance.')

    return amount


def validate_deposit(amount, staking):
    """
    Валидация депозита на соответствие минимальному и максимальному депозиту
    """
    if amount < staking.min_deposit or amount > staking.max_deposit:
        raise ValidationError(
            f'Amount should be between {staking.min_deposit} and {staking.max_deposit}.'
        )