import pytest
from staking.models import StakingStage
from django.db import IntegrityError

from users.models import CustomUser


@pytest.fixture
def custom_user():
    # Создаем фикстуру для пользователя CustomUser
    return CustomUser.objects.create_user(
        username="testuser",
        password="password123",
        telegram_id="123456789",
    )

@pytest.mark.django_db
def test_user_creation(custom_user):
    """Тест на создание пользователя"""
    user = custom_user
    assert user.username == "testuser"
    assert user.telegram_id == "123456789"
    assert user.is_active is False  # По умолчанию is_active должно быть False
    assert user.balance == 0  # Баланс должен быть 0 по умолчанию
    assert user.tokens == 0  # Токены должны быть 0 по умолчанию

@pytest.mark.django_db
def test_custom_id_on_creation(custom_user):
    """Тест на создание кастомного ID"""
    user = custom_user
    assert len(user.id) == 13  # ID должен быть 13-значным числом

@pytest.mark.django_db
def test_referral_code_generation(custom_user):
    """Тест на автоматическую генерацию реферального кода"""
    user = custom_user
    assert len(user.referral_code) == 8  # Реферальный код должен быть 8 символов
    assert user.referral_code.isalpha()  # Реферальный код должен быть только из букв

@pytest.mark.django_db
def test_increase_balance(custom_user):
    """Тест на увеличение баланса"""
    user = custom_user
    initial_balance = user.balance
    user.increase_balance(50)
    assert user.balance == initial_balance + 50

@pytest.mark.django_db
def test_decrease_balance(custom_user):
    """Тест на уменьшение баланса"""
    user = custom_user
    user.increase_balance(100)
    initial_balance = user.balance
    user.decrease_balance(50)
    assert user.balance == initial_balance - 50

@pytest.mark.django_db
def test_decrease_balance_insufficient(custom_user):
    """Тест на попытку уменьшить баланс, если недостаточно средств"""
    user = custom_user
    with pytest.raises(ValueError):
        user.decrease_balance(50)  # Баланс по умолчанию 0, ошибка должна быть выброшена

@pytest.mark.django_db
def test_increase_tokens(custom_user):
    """Тест на увеличение токенов"""
    user = custom_user
    initial_tokens = user.tokens
    user.increase_tokens(20)
    assert user.tokens == initial_tokens + 20

@pytest.mark.django_db
def test_decrease_tokens(custom_user):
    """Тест на уменьшение токенов"""
    user = custom_user
    user.increase_tokens(50)
    initial_tokens = user.tokens
    user.decrease_tokens(30)
    assert user.tokens == initial_tokens - 30

@pytest.mark.django_db
def test_decrease_tokens_insufficient(custom_user):
    """Тест на попытку уменьшить токены, если их недостаточно"""
    user = custom_user
    with pytest.raises(ValueError):
        user.decrease_tokens(50)  # Токенов по умолчанию 0, ошибка должна быть выброшена
