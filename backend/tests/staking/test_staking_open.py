import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.utils import timezone
from staking.models import UserStaking, StakingLevel, StakingStage
from users.models import CustomUser


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def staking_stage(db):
    return StakingStage.objects.create(stage=1, staking_time=30)


@pytest.fixture
def staking_level(db, staking_stage):
    return StakingLevel.objects.create(
        stage=staking_stage,
        level=1,
        min_deposite=100,
        max_deposite=1000,
        percentage=10,
    )


@pytest.fixture
def user(db, django_user_model, staking_stage):
    return django_user_model.objects.create_user(
        id="testuser123",
        username="testuser",
        telegram_id=1,
        staking_stage=staking_stage,
        balance=5000,
        password="testpassword"
    )

@pytest.mark.django_db
def test_open_staking_unauthenticated(api_client, staking_level):
    """Проверяет, что неавторизованный пользователь не может открыть стейкинг."""
    url = reverse("open_staking")
    data = {"amount": 500, "staking_level": staking_level.id}

    response = api_client.post(url, data, format="json")

    assert response.status_code == status.HTTP_401_UNAUTHORIZED

@pytest.mark.django_db
def test_open_staking_success(api_client, user, staking_level):
    """Проверяет успешное открытие стейкинга."""
    api_client.force_authenticate(user=user)
    url = reverse("open_staking")

    data = {"amount": 500, "staking_level": staking_level.id}
    response = api_client.post(url, data, format="json")
    print(response.data, 'response')
    assert response.status_code == status.HTTP_200_OK
    assert UserStaking.objects.filter(user=user).exists()
    assert "Staking successfully opened" in response.data["message"]

@pytest.mark.django_db
def test_end_date_computation(api_client, user, staking_level):
    """Проверяет, что поле end_date вычисляется правильно."""
    api_client.force_authenticate(user=user)
    url = reverse("open_staking")

    data = {"amount": 500, "staking_level": staking_level.id}
    response = api_client.post(url, data, format="json")

    assert response.status_code == status.HTTP_200_OK
    assert UserStaking.objects.filter(user=user).exists()

    user_staking = UserStaking.objects.get(user=user)

    staking_time_in_days = staking_level.stage.staking_time
    expected_end_date = user_staking.start_date + timezone.timedelta(days=staking_time_in_days)

    assert user_staking.end_date.replace(microsecond=0) == expected_end_date.replace(microsecond=0)

@pytest.mark.django_db
def test_open_staking_already_exists(api_client, user, staking_level):
    """Проверяет, что нельзя открыть второй стейкинг."""
    UserStaking.objects.create(
        user=user, staking_level=staking_level, amount=500,
    )

    api_client.force_authenticate(user=user)
    url = reverse("open_staking")
    data = {"amount": 500, "staking_level": staking_level.id}

    response = api_client.post(url, data, format="json")

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.data["error"] == "You already have an active staking."

@pytest.mark.django_db
def test_open_staking_invalid_amount(api_client, user, staking_level):
    """Проверяет, что сумма вклада не выходит за пределы min/max депозита."""
    api_client.force_authenticate(user=user)
    url = reverse("open_staking")

    data = {"amount": 50, "staking_level": staking_level.id}
    response = api_client.post(url, data, format="json")

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "Amount should be between" in response.data["error"]

@pytest.mark.django_db
def test_open_staking_invalid_data(api_client, user):
    """Проверяет, что API корректно обрабатывает неверные данные."""
    api_client.force_authenticate(user=user)
    url = reverse("open_staking")

    data = {"amount": "wrong_value", "staking_level": "invalid_id"}
    response = api_client.post(url, data, format="json")

    assert response.status_code == status.HTTP_400_BAD_REQUEST
