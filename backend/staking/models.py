from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _


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
    stage = models.IntegerField(choices=STAGE_CHOICES)
    staking_time = models.IntegerField()

    def __str__(self):
        return f'Stage: {self.stage}'
    

class UserStaking(models.Model):
    from users.models import CustomUser
    
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    staking_level = models.ForeignKey(StakingLevel, on_delete=models.CASCADE)
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
        self.clean()
        super().save(*args, **kwargs)
    
class UserStakingReward(models.Model):
    user_staking = models.ForeignKey(UserStaking, on_delete=models.CASCADE)
    amount = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'User: {self.user_staking.user.username} | Amount: {self.amount}'
