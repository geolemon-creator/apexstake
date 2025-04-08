from django.db import models
from users.models import CustomUser


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
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    wallet = models.CharField(max_length=48)
    operation_type = models.CharField(max_length=8, choices=OPERATION_TYPES, default='deposit')
    amount = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    status = models.CharField(max_length=9, choices=TRANSACTION_STATUS, default='waiting')
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username}: {self.amount} {self.timestamp}'