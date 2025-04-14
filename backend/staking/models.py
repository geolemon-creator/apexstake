from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from datetime import timedelta


class StakingLevel(models.Model):
    stage = models.ForeignKey('StakingStage', on_delete=models.CASCADE, verbose_name='Этап стейкинга')
    level = models.IntegerField(verbose_name='Уровень')
    min_deposite = models.DecimalField(default=0, max_digits=10, decimal_places=2, verbose_name='Минимальный депозит')
    max_deposite = models.DecimalField(default=0, max_digits=10, decimal_places=2, verbose_name='Максимальный депозит')
    percentage = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='Процент')

    class Meta:
        verbose_name = 'Уровень стейкинга'
        verbose_name_plural = 'Уровни стейкинга'

    def __str__(self):
        return f'Уровень {self.level} | {self.percentage}%'

class StakingStage(models.Model):
    STAGE_CHOICES = [
        (1, 'Этап 1'),
        (2, 'Этап 2'),
        (3, 'Этап 3'),
    ]
    stage = models.IntegerField("Этап", choices=STAGE_CHOICES, unique=True)
    days_for_change = models.IntegerField("Дней для смены уровня", default=60)
    staking_time = models.IntegerField("Длительность (дни)")

    class Meta:
        verbose_name = 'Этап стейкинга'
        verbose_name_plural = 'Этапы стейкинга'

    def __str__(self):
        return f'{dict(self.STAGE_CHOICES).get(self.stage)}' 
    

class UserStaking(models.Model):
    from users.models import CustomUser
    STATUS_CHOICES = [
        ('in_progress', 'В процессе'),
        ('completed', 'Завершено'),
        ('closed_prematurely', 'Закрыто досрочно'),
    ]
    
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name='Пользователь')
    staking_level = models.ForeignKey(StakingLevel, on_delete=models.CASCADE, verbose_name='Уровень стейкинга')
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='in_progress',
        verbose_name='Статус'
    )
    amount = models.DecimalField(default=0, max_digits=10, decimal_places=2, verbose_name='Сумма')
    withdrawn_amount = models.DecimalField(default=0, max_digits=10, decimal_places=2, verbose_name='Выведенная сумма')
    start_date = models.DateTimeField(auto_now_add=True, verbose_name='Дата начала')
    end_date = models.DateTimeField(verbose_name='Дата окончания')
    task_scheduled_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = 'Стейкинг пользователя'
        verbose_name_plural = 'Стейкинги пользователей'

    def __str__(self):
        return f'User: {self.user.username} | Статус: {self.get_status_display()} | Сумма: {self.amount}'
    
    def get_profit(self) -> float:
        if self.status != 'in_progress':
            return 0.0

        total_duration = (self.end_date - self.start_date).total_seconds()
        elapsed_time = min((timezone.now() - self.start_date).total_seconds(), total_duration)

        if total_duration <= 0:
            return 0.0

        progress_ratio = elapsed_time / total_duration

        # Доход за весь срок: (сумма * процент / 100)
        full_profit = float(self.amount) * float(self.staking_level.percentage) / 100

        current_profit = full_profit * progress_ratio
        total_profit = current_profit - float(self.withdrawn_amount)

        return total_profit
    
    def clean(self):
        """
        Валидация, что amount находится в пределах от min_deposite до max_deposite
        """
        if self.staking_level is None:
            raise ValidationError(_('Staking level cannot be null.'))
        
        if self.amount < self.staking_level.min_deposite:
            raise ValidationError(
                _('Amount must be greater than or equal to the minimum deposit of this level.')
            )
        if self.amount > self.staking_level.max_deposite:
            raise ValidationError(
                _('Amount must be less than or equal to the maximum deposit of this level.')
            )
    
    def save(self, *args, **kwargs):
        if not self.start_date:
            self.start_date = timezone.now()

        if self.end_date is None and self.staking_level and self.staking_level.stage:
            # Вычисляем end_date - start_date + staking_time в днях
            self.end_date = self.start_date + timedelta(minutes=self.staking_level.stage.staking_time)
        self.clean()

        super().save(*args, **kwargs)
    
class UserStakingReward(models.Model):
    user_staking = models.ForeignKey(UserStaking, on_delete=models.CASCADE, verbose_name="Стейкинг пользователя")
    amount = models.DecimalField(default=0, max_digits=10, decimal_places=2, verbose_name="Сумма (в TON)")
    tokens = models.DecimalField(default=0, max_digits=10, decimal_places=2, verbose_name="Токены")
    timestamp = models.DateTimeField(auto_now_add=True, verbose_name="Дата и время")

    class Meta:
        verbose_name = "Награда за стейкинг"
        verbose_name_plural = "Награды за стейкинг"

    def __str__(self):
        return f'User: {self.user_staking.user.username} | Amount: {self.amount} | Tokens: {self.tokens}'