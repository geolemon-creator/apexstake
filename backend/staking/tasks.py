from celery import shared_task
from datetime import datetime
from django.utils import timezone

from .services import close_user_staking


@shared_task
def close_staking(staking_id):
    from .models import UserStaking

    try:
        staking = UserStaking.objects.get(id=staking_id)
        # Проверяем, что дата уже прошла
        if staking.end_date <= timezone.now() and staking.status == 'in_progress':
            close_user_staking(staking=staking)
    except UserStaking.DoesNotExist:
        pass  # В случае если стейкинг был удалён