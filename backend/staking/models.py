from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from datetime import timedelta
from django.core.validators import MaxValueValidator, MinValueValidator

from .tasks import close_staking


class StakingLevel(models.Model):
    stage = models.ForeignKey('StakingStage', on_delete=models.CASCADE)
    level = models.IntegerField()
    min_deposite = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    max_deposite = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    percentage = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return f'Level: {self.level} | Stage: {self.stage}'

class StakingStage(models.Model):
    STAGE_CHOICES = [
        (1, 'Stage 1'),
        (2, 'Stage 2'),
        (3, 'Stage 3'),
    ]
    stage = models.IntegerField(choices=STAGE_CHOICES, unique=True)
    days_for_change = models.IntegerField(default=60)
    staking_time = models.IntegerField()

    def __str__(self):
        return f'Stage: {self.stage}'
    

class UserStaking(models.Model):
    from users.models import CustomUser
    STATUS_CHOICES = [
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('closed_prematurely', 'Closed Prematurely'),
    ]
    
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    staking_level = models.ForeignKey(StakingLevel, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='in_progress')
    amount = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField()

    def __str__(self):
        return f'User: {self.user.username} | Lvl: {self.staking_level.level}'
    
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
    user_staking = models.ForeignKey(UserStaking, on_delete=models.CASCADE)
    amount = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    tokens = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'User: {self.user_staking.user.username} | Amount: {self.amount} | Tokens: {self.tokens}'

class Competition(models.Model):
    title = models.CharField(max_length=28)
    badge_content = models.CharField(max_length=12, null=True, blank=True)
    img = models.ImageField()
    end_date = models.DateTimeField()

    def __str__(self):
        return self.title

class Wallets(models.Model):
    title = models.CharField(max_length=100)
    wallet = models.CharField(max_length=48)

    def __str__(self):
        short_wallet = self.wallet[:16] + '...' if len(self.wallet) > 16 else self.wallet
        return f'{self.title} {short_wallet}'

class Banner(models.Model):
    title = models.CharField(max_length=18)
    description = models.CharField(max_length=18)
    img = models.ImageField()
    link = models.URLField()

    def __str__(self):
        return f'{self.title}'

class Commission(models.Model):
    percent = models.IntegerField(
        default=10,
        validators=[
            MinValueValidator(0),
            MaxValueValidator(100)
        ]
    )

    def save(self, *args, **kwargs):
        if not self.pk and Commission.objects.exists():
            raise ValueError("Можно создать только один объект Commission.")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Commission: {self.percent}%"