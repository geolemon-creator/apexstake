import logging

from django.db.models.signals import post_save
from django.dispatch import receiver

from .tasks import close_staking
from .models import UserStaking

logger = logging.getLogger(__name__)


@receiver(post_save, sender=UserStaking)
def schedule_close_staking(sender, instance, **kwargs):
    try:
        if instance.status == 'in_progress':
            close_staking.apply_async(args=[instance.id], eta=instance.end_date)
    except Exception as e:
        logger.error(f"Ошибка при установке в очередь стейкинга {instance.id}: {e}")