from decimal import Decimal
from django.db import transaction
from rest_framework.exceptions import ValidationError

from users.models import UserReferralReward
from .models import Transactions


def create_transaction(user, operation_type, amount):
    """
    Создаёт транзакцию для пользователя: депозит или вывод.
    Обрабатывает изменение баланса и, при необходимости, начисляет награду рефереру.
    """
    if operation_type not in dict(Transactions.OPERATION_TYPES):
        raise ValidationError("Invalid operation type")

    try:
        amount = Decimal(amount)
    except:
        raise ValidationError("Invalid amount")

    transaction_status = 'completed' if operation_type == 'deposit' else 'waiting' #TODO: Добавить валидацию транзакции

    with transaction.atomic():
        txn = Transactions.objects.create(
            user=user,
            operation_type=operation_type,
            amount=amount,
            status=transaction_status
        )

        if operation_type == 'deposit':
            _handle_deposit(user, amount, txn)
        elif operation_type == 'withdraw':
            try:
                user.decrease_balance(amount)
            except ValueError as e:
                raise ValidationError(str(e))

    return txn


def _handle_deposit(user, amount, txn):
    """
    Обрабатывает депозит: увеличивает баланс и начисляет награду рефереру при первом пополнении.
    """
    user.increase_balance(amount)

    has_deposited_before = Transactions.objects.filter(
        user=user,
        operation_type='deposit'
    ).exclude(id=txn.id).exists()

    if user.referred_by and not has_deposited_before:
        _reward_referral(user)


def _reward_referral(user):
    """
    Начисляет реферальный бонус пригласившему пользователю.
    """
    referred_by = user.referred_by

    referral_count = UserReferralReward.objects.filter(user=referred_by, first_deposite=True).count() + 1

    reward_amount = 350 if referral_count % 10 == 0 else 150

    reward_obj, created = UserReferralReward.objects.get_or_create(
        user=referred_by,
        referral=user
    )
    if created:
        reward_obj.reward = reward_amount
        reward_obj.first_deposite = True
        reward_obj.save()

        referred_by.increase_tokens(reward_amount)
