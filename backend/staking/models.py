from django.db import models


class StakingLevel(models.Model):
    stage = models.ForeignKey('StakingStage', on_delete=models.CASCADE)
    level = models.IntegerField()
    min_deposite = models.IntegerField()
    max_deposite = models.IntegerField()
    percentage = models.IntegerField()

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
    amount = models.IntegerField()
    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField()

    def __str__(self):
        return f'User: {self.user.username} | Lvl: {self.staking_level.level}'
    
class UserStakingReward(models.Model):
    user_staking = models.ForeignKey(UserStaking, on_delete=models.CASCADE)
    amount = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'User: {self.user_staking.user.username} | Amount: {self.amount}'
