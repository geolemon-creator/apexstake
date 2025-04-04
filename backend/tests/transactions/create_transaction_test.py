import pytest
from decimal import Decimal
from transactions.services import create_transaction
from transactions.models import Transactions
from users.models import CustomUser, UserReferralReward
from rest_framework.exceptions import ValidationError


@pytest.fixture
def user(db):
    return CustomUser.objects.create_user(username='testuser', telegram_id='123', password='pass123', balance=0)

@pytest.fixture
def referred_user(db, user):
    referred = CustomUser.objects.create_user(username='ref_user', telegram_id='124', password='pass123', referred_by=user)
    return referred

def test_create_deposit_transaction(user):
    txn = create_transaction(user, 'deposit', '100.00')
    user.refresh_from_db()

    assert txn.operation_type == 'deposit'
    assert txn.status == 'completed'
    assert user.balance == Decimal('100.00')


def test_create_withdraw_transaction(user):
    user.balance = Decimal('200.00')
    user.save()

    txn = create_transaction(user, 'withdraw', '50.00')
    user.refresh_from_db()

    assert txn.operation_type == 'withdraw'
    assert txn.status == 'waiting'
    assert user.balance == Decimal('150.00')


def test_withdraw_insufficient_balance_raises(user):
    with pytest.raises(ValidationError):
        create_transaction(user, 'withdraw', '999.00')


def test_invalid_amount_raises(user):
    with pytest.raises(ValidationError):
        create_transaction(user, 'deposit', 'invalid_amount')


def test_invalid_operation_type_raises(user):
    with pytest.raises(ValidationError):
        create_transaction(user, 'steal_money', '100.00')
