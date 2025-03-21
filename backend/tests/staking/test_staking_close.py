import pytest
from unittest.mock import patch
from django.utils import timezone
from celery.result import AsyncResult
from rest_framework.test import APIClient
from staking.models import StakingLevel, StakingStage, UserStaking
from users.models import CustomUser
from pytest_mock import mocker


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def staking_stage(db):
    return StakingStage.objects.create(stage=1, staking_time=1)


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
def test_task_is_scheduled_when_staking_is_created(api_client, user, staking_level, mocker):
    end_date = timezone.now() + timezone.timedelta(minutes=5)

    # Создаем стейкинг
    staking = UserStaking.objects.create(
        user=user,
        staking_level=staking_level,
        amount=100.00,
        status='in_progress',
        end_date=end_date,
    )

    # Мокаем задачу Celery
    mock_apply_async = mocker.patch('staking.models.close_staking.apply_async')

    # Сохраняем объект, чтобы задача была запланирована
    staking.save()

    # Проверяем, что задача была вызвана с правильными аргументами
    mock_apply_async.assert_called_once_with((staking.id,), eta=staking.end_date)