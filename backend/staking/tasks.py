from celery import shared_task
from django.utils import timezone
from django.db import transaction

from .services import close_user_staking


@shared_task
def close_staking(staking_id, **kwargs):
    from .models import UserStaking

    try:
        with transaction.atomic():
            staking = UserStaking.objects.select_for_update().get(id=staking_id)

            if staking.end_date <= timezone.now() and staking.status == 'in_progress':
                close_user_staking(staking=staking)
    except UserStaking.DoesNotExist:
        pass