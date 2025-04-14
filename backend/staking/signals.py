import logging

from django.db.models.signals import post_save
from django.dispatch import receiver

from .tasks import close_staking
from .models import UserStaking

logger = logging.getLogger(__name__)


@receiver(post_save, sender=UserStaking)
def schedule_close_staking(sender, instance, **kwargs):
    try:
        if instance.status == 'in_progress' and (
            instance.task_scheduled_at is None or instance.task_scheduled_at != instance.end_date
        ):
            close_staking.apply_async(args=[instance.id], eta=instance.end_date)
            instance.task_scheduled_at = instance.end_date
            instance.save(update_fields=['task_scheduled_at'])
    except Exception as e:
        logger.error(f"Ошибка при установке в очередь стейкинга {instance.id}: {e}")