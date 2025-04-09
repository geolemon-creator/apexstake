from celery import shared_task
from django.utils import timezone

from .services import close_user_staking


@shared_task
def close_staking(staking_id):
    from .models import UserStaking

    try:
        staking = UserStaking.objects.get(id=staking_id)

        if staking.end_date <= timezone.now() and staking.status == 'in_progress':
            close_user_staking(staking=staking)
    except UserStaking.DoesNotExist:
        pass
