import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from users.models import CustomUser
from tasks.models import FarmingTask, UserFarmingTask

@pytest.fixture
def user():
    """Создание тестового пользователя."""
    return CustomUser.objects.create_user(
        username="testuser",
        password="password123",
        telegram_id="12345",
        referral_code="ABCDEFGH"
    )

@pytest.fixture
def farming_task():
    """Создание тестовой задачи."""
    return FarmingTask.objects.create(
        title="Test Task",
        description="Test Description",
        icon="tasks/icons/test-icon.png",
        link="https://example.com",
        reward_amount=100  # 100 токенов за выполнение задачи
    )

@pytest.fixture
def api_client():
    """Фикстура для клиента API."""
    return APIClient()

@pytest.mark.django_db
def test_complete_task(api_client, user, farming_task):
    """Тестируем выполнение задачи и увеличение токенов пользователя."""
    
    # Авторизация пользователя
    api_client.force_authenticate(user=user)

    # Проверяем исходное количество токенов пользователя
    initial_tokens = user.tokens

    # Делаем запрос на выполнение задачи
    url = reverse('task_complete', args=[farming_task.id])  # Путь к вашему API
    response = api_client.post(url)

    # Проверяем, что ответ успешный
    assert response.status_code == status.HTTP_200_OK
    assert response.data['detail'] == f"Task completed successfully! {farming_task.reward_amount} tokens added!"
    
    # Проверяем, что задача была выполнена и записана в UserFarmingTask
    assert UserFarmingTask.objects.filter(user=user, farming_task=farming_task).exists()

    # Проверяем, что токены увеличились на соответствующую сумму
    assert user.tokens == initial_tokens + farming_task.reward_amount

@pytest.mark.django_db
def test_task_already_completed(api_client, user, farming_task):
    """Тестируем выполнение задачи повторно, что должно вернуть ошибку."""
    
    # Авторизация пользователя
    api_client.force_authenticate(user=user)
    
    # Выполним задачу первый раз
    url = reverse('task_complete', args=[farming_task.id])
    api_client.post(url)

    # Попробуем выполнить задачу повторно
    response = api_client.post(url)

    # Проверяем, что возвращается ошибка, так как задача уже выполнена
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.data['detail'] == "Task already completed."
