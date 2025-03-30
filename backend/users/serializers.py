from rest_framework import serializers
from staking.models import UserStaking
from .models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    selected_level = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'staking_stage', 'avatar', 'wallet', 'telegram_id', 'balance', 'selected_level', 'created_at']

    def get_selected_level(self, obj):
        staking = UserStaking.objects.filter(user=obj, status='in_progress').first()
        return staking.staking_level.level if staking else None