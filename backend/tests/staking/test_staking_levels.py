import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from staking.models import StakingLevel, StakingStage
from users.models import CustomUser


@pytest.mark.django_db
class TestStakingLevelsAPIView:
    @pytest.fixture
    def api_client(self):
        return APIClient()

    @pytest.fixture
    def staking_stage(self):
        return StakingStage.objects.create(stage=1, staking_time=30)

    @pytest.fixture
    def user(self, staking_stage):
        return CustomUser.objects.create_user(
            username="testuser",
            staking_stage=staking_stage,
            telegram_id=123456,
            balance=1000.00
        )

    @pytest.fixture
    def staking_levels(self, staking_stage):
        return [
            StakingLevel.objects.create(stage=staking_stage, level=1, min_deposite=100, max_deposite=1000, percentage=5),
            StakingLevel.objects.create(stage=staking_stage, level=2, min_deposite=1000, max_deposite=5000, percentage=10),
        ]

    def test_staking_levels_success(self, api_client, user, staking_levels):
        """
        Тест: Получение списка уровней стейкинга
        """
        api_client.force_authenticate(user=user)
        url = reverse("staking_levels")
        response = api_client.get(url)

        assert response.status_code == 200
        assert len(response.data) == 2
        assert response.data[0]["level"] == 1
        assert response.data[1]["level"] == 2

    def test_staking_levels_no_levels(self, api_client, user):
        """
        Тест: Нет доступных уровней стейкинга
        """
        api_client.force_authenticate(user=user)
        url = reverse("staking_levels")
        response = api_client.get(url)

        assert response.status_code == 404
        assert response.data["error"] == "No staking levels found for the user's current stage."

    def test_staking_stage_is_none(self, api_client, staking_stage, staking_levels):
        """
        Тест: Пользователь без стадии стейкинга должен получить stage=1
        """
        user = CustomUser.objects.create_user(username="newuser", telegram_id=12456, balance=500.00)

        api_client.force_authenticate(user=user)
        url = reverse("staking_levels")
        response = api_client.get(url)

        user.refresh_from_db()
        assert response.status_code == 200
        assert user.staking_stage == staking_stage
        assert user.staking_stage.stage == 1
