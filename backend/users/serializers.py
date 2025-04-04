from rest_framework import serializers
from staking.models import UserStaking
from django.utils.timezone import make_aware
from django.utils import timezone
from .models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    selected_level = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'staking_stage', 'avatar', 'wallet', 'telegram_id', 'balance', 'tokens', 'selected_level', 'created_at']

    def get_selected_level(self, obj):
        staking = UserStaking.objects.filter(user=obj, status='in_progress').first()
        return staking.staking_level.level if staking else None
    
class LeadersListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'avatar', 'balance', 'tokens']

class RegisterUserSerializer(serializers.ModelSerializer):
    referral_code = serializers.CharField(required=False, allow_blank=True, allow_null=True)

    class Meta:
        model = CustomUser
        fields = ["telegram_id", "username", "avatar", "referral_code"]

    def create(self, validated_data):
        referral_code = validated_data.pop("referral_code", None)
        referred_by = None

        if referral_code:
            referred_by = CustomUser.objects.filter(referral_code=referral_code).first()

        user, created = CustomUser.objects.get_or_create(
            telegram_id=validated_data["telegram_id"],
            defaults={
                "username": validated_data.get("username"),
                "avatar": validated_data.get("avatar") or "users/avatar/default-avatar.png",
                "referred_by": referred_by,
            },
        )

        if not created:
            user.username = validated_data.get("username", user.username)
            user.avatar = validated_data.get("avatar", user.avatar)
            user.save() 
        return user