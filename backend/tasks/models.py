from django.db import models

from users.models import CustomUser


class FarmingTask(models.Model):
    title = models.CharField(max_length=120)
    description = models.CharField(max_length=200, null=True, blank=True)
    icon = models.ImageField(upload_to='tasks/icons')
    link = models.URLField()
    reward_amount = models.IntegerField()

    def __str__(self):
        return f'Task: {self.title} | {self.reward_amount}$'


class UserFarmingTask(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    farming_task = models.ForeignKey(FarmingTask, on_delete=models.DO_NOTHING)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'User: {self.user.username} | {self.farming_task}'