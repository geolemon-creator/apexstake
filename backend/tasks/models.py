from django.db import models

from users.models import CustomUser


class FarmingTask(models.Model):
    title = models.CharField("Название", max_length=120)
    en_title = models.CharField("Английское название", max_length=120)
    description = models.CharField("Описание", max_length=200, null=True, blank=True)
    icon = models.ImageField("Иконка", upload_to='tasks/icons')
    link = models.URLField("Ссылка")
    reward_amount = models.IntegerField("Награда (в $)")

    def __str__(self):
        return f'Задача: {self.title} | {self.reward_amount}$'

    class Meta:
        verbose_name = "Задача"
        verbose_name_plural = "Задачи"

class UserFarmingTask(models.Model):
    user = models.ForeignKey(CustomUser, verbose_name="Пользователь", on_delete=models.CASCADE)
    farming_task = models.ForeignKey(FarmingTask, verbose_name="Задача", on_delete=models.DO_NOTHING)
    timestamp = models.DateTimeField("Дата выполнения", auto_now_add=True)

    def __str__(self):
        return f'Пользователь: {self.user.username} | {self.farming_task}'

    class Meta:
        verbose_name = "Выполненная задача"
        verbose_name_plural = "Выполненные задачи"