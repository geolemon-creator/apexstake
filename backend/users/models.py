from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, Group, Permission
from decimal import Decimal

from .managers import CustomUserManager
from .utils import generate_referral_code, generate_custom_id


class CustomUser(AbstractBaseUser, PermissionsMixin):
    from staking.models import StakingStage

    id = models.CharField(max_length=13, unique=True, primary_key=True, editable=False)
    username = models.CharField(max_length=50, unique=True)
    avatar = models.URLField()
    wallet = models.CharField(max_length=48, null=True, blank=True)
    staking_stage = models.ForeignKey(StakingStage, null=True, blank=True, on_delete=models.CASCADE)
    telegram_id = models.IntegerField()
    balance = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    blocked_balance = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    tokens = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    referred_by = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=True, blank=True)
    referral_code = models.CharField(max_length=8)
    created_at = models.DateTimeField(auto_now_add=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    # Добавляем related_name к группам и разрешениям
    groups = models.ManyToManyField(Group, related_name="customuser_set", blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name="customuser_set", blank=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['avatar', 'telegram_id']

    def save(self, *args, **kwargs):
        if not self.id:  # Generate custom ID if it doesn't already exist
            self.id = generate_custom_id()
        if not self.referral_code:
            self.referral_code = generate_referral_code()
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.username} | {self.balance}'
    

    def increase_balance(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive.")
        self.balance += amount
        self.save()

    def decrease_balance(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive.")
        if self.balance < amount:
            raise ValueError("Insufficient balance.")
        self.balance -= amount
        self.save()

    def increase_tokens(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive.")
        self.tokens += amount
        self.save()

    def decrease_tokens(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive.")
        if self.tokens < amount:
            raise ValueError("Insufficient tokens.")
        self.tokens -= amount
        self.save()

    def decrease_blocked_balance(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive.")
        if self.blocked_balance < amount:
            raise ValueError(f"Insufficient blocked balance. Available balance: {self.blocked_balance}")
        
        self.blocked_balance -= amount
        if self.blocked_balance < 0:
            raise ValueError("Final blocked balance cannot be negative.")  # Если это необходимо по бизнес-логике
        
        self.save()

    def open_staking(self, amount):
        """
        Открыть стейкинг с блокировкой части баланса.
        """
        if amount <= 0:
            raise ValueError("Amount must be positive.")

        if self.balance < Decimal(amount):
            raise ValueError("Insufficient balance.")

        self.balance -= Decimal(amount)
        self.blocked_balance += Decimal(amount)

        self.save()

class UserReferralReward(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='referral_rewards')
    referral = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='referred_rewards')
    first_deposite = models.BooleanField(default=False)
    reward = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'User: {self.user.username} | Referral: {self.referral.username} | Reward: {self.reward}'