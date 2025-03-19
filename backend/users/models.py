import time
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, Group, Permission

from .managers import CustomUserManager


class CustomUser(AbstractBaseUser, PermissionsMixin):
    from staking.models import StakingStage

    id = models.CharField(max_length=13, unique=True, primary_key=True, editable=False)
    username = models.CharField(max_length=50, unique=True)
    avatar = models.ImageField(default="users/avatar/default-avatar.png", upload_to='users/avatar/')
    wallet = models.CharField(max_length=30, null=True, blank=True)
    staking_stage = models.ForeignKey(StakingStage, null=True, blank=True, on_delete=models.CASCADE)
    telegram_id = models.CharField(max_length=50)
    balance = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    referred_by = models.ForeignKey('CustomUser', on_delete=models.CASCADE)
    referral_code = models.CharField(max_length=8)
    created_at = models.DateTimeField(auto_now_add=True)

    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    # Добавляем related_name к группам и разрешениям
    groups = models.ManyToManyField(Group, related_name="customuser_set", blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name="customuser_set", blank=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['username', 'avatar', 'telegram_id']

    def save(self, *args, **kwargs):
        if not self.id:  # Generate custom ID if it doesn't already exist
            self.id = self.generate_custom_id()
        super().save(*args, **kwargs)

    def generate_custom_id(self):
        """
        Generate a custom ID in the format of a 13-digit number.
        """
        return str(int(time.time() * 1000))

    def __str__(self):
        return f'{self.username} | {self.balance}'