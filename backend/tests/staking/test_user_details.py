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
        percentage=10
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
def test_get_user_stakings_success(api_client, user, staking_level):
    """Проверяет, что API возвращает список стейкингов пользователя."""
    # Создаем 2 стейкинга для пользователя
    UserStaking.objects.create(
        user=user, staking_level=staking_level, amount=500,
        end_date=timezone.now() + timezone.timedelta(days=30)
    )
    UserStaking.objects.create(
        user=user, staking_level=staking_level, amount=1000,
        end_date=timezone.now() + timezone.timedelta(days=60)
    )

    api_client.force_authenticate(user=user)
    url = reverse("user_staking")  # Замените на правильное имя URL

    response = api_client.get(url)

    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) == 2  # Должны вернуться оба стейкинга
    assert response.data[0]["amount"] == "500.00"
    assert response.data[1]["amount"] == "1000.00"


@pytest.mark.django_db
def test_get_user_stakings_empty(api_client, user):
    """Проверяет, что API возвращает пустой список, если у пользователя нет стейкингов."""
    api_client.force_authenticate(user=user)
    url = reverse("user_staking")

    response = api_client.get(url)

    assert response.status_code == status.HTTP_200_OK
    assert response.data == []  # Пустой список


@pytest.mark.django_db
def test_get_user_stakings_unauthenticated(api_client):
    """Проверяет, что API не позволяет неавторизованному пользователю получить список стейкингов."""
    url = reverse("user_staking")

    response = api_client.get(url)

    assert response.status_code == status.HTTP_401_UNAUTHORIZED
