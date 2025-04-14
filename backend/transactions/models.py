from django.db import models
from users.models import CustomUser
from staking.models import UserStaking


class Transactions(models.Model):
    OPERATION_TYPES = [
        ('withdraw', 'Withdraw'),
        ('deposit', 'Deposit'),
    ]
    TRANSACTION_STATUS = [
        ('completed', 'Completed'),
        ('canceled', 'Canceled'),
        ('waiting', 'Waiting'),
    ]
    
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name="Пользователь")
    wallet = models.CharField(max_length=48, verbose_name="Кошелек")
    operation_type = models.CharField(max_length=8, choices=OPERATION_TYPES, default='deposit', verbose_name="Тип операции")
    amount = models.DecimalField(default=0, max_digits=10, decimal_places=2, verbose_name="Сумма")
    status = models.CharField(max_length=9, choices=TRANSACTION_STATUS, default='waiting', verbose_name="Статус")
    timestamp = models.DateTimeField(auto_now_add=True, verbose_name="Дата и время")

    class Meta:
        verbose_name = "Транзакция"
        verbose_name_plural = "Транзакции"

    def __str__(self):
        return f'{self.user.username}: {self.amount} {self.timestamp}'