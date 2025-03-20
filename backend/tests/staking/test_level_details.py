import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from staking.models import StakingLevel, StakingStage
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
        percentage=5.0
    )


@pytest.fixture
def user(db, staking_stage):
    return CustomUser.objects.create_user(
        id="testuser123",
        username="testuser",
        telegram_id=1,
        staking_stage=staking_stage,
        balance=5000,
        password="testpassword"
    )


@pytest.mark.django_db
def test_get_staking_level_success(api_client, user, staking_level):
    """Проверяет, что API возвращает информацию о стейкинг-уровне"""
    api_client.force_authenticate(user=user)
    url = reverse("level_details", kwargs={"staking_level": 1})

    response = api_client.get(url)

    assert response.status_code == status.HTTP_200_OK
    assert response.data["level"] == 1
    assert response.data["min_deposite"] == "100.00"
    assert response.data["max_deposite"] == "1000.00"
    assert response.data["percentage"] == "5.00"


@pytest.mark.django_db
def test_get_staking_level_not_found(api_client, user):
    """Проверяет, что API возвращает 404, если уровень стейкинга не существует"""
    api_client.force_authenticate(user=user)
    url = reverse("level_details", kwargs={"staking_level": 99})  # Не существует

    response = api_client.get(url)

    assert response.status_code == status.HTTP_404_NOT_FOUND


@pytest.mark.django_db
def test_get_staking_level_unauthenticated(api_client):
    """Проверяет, что API не позволяет неавторизованному пользователю получить информацию"""
    url = reverse("level_details", kwargs={"staking_level": 1})

    response = api_client.get(url)

    assert response.status_code == status.HTTP_401_UNAUTHORIZED
