from rest_framework import serializers
from .models import StakingStage, StakingLevel, UserStaking
from datetime import timedelta
from django.utils.timezone import now


class StakingStageSerializer(serializers.ModelSerializer):
    class Meta:
        model = StakingStage
        fields = ['id', 'stage', 'staking_time']

class StakingLevelSerializer(serializers.ModelSerializer):
    stage = StakingStageSerializer()

    class Meta:
        model = StakingLevel
        fields = ['id', 'stage', 'level', 'min_deposite', 'max_deposite', 'percentage']


class StakingLevelDetailsSerializer(serializers.ModelSerializer):
    stage = StakingStageSerializer()
    start_date = serializers.SerializerMethodField()
    end_date = serializers.SerializerMethodField()
    full_rate = serializers.SerializerMethodField()

    class Meta:
        model = StakingLevel
        fields = [
            'id', 'stage', 'level', 'min_deposite', 'max_deposite', 'percentage',
            'start_date', 'end_date', 'full_rate'
        ]

    def get_start_date(self, obj):
        return now().isoformat()

    def get_end_date(self, obj):
        staking_time = obj.stage.staking_time if obj.stage else 0
        return (now() + timedelta(days=staking_time)).isoformat()

    def get_full_rate(self, obj):
        print(obj.percentage, obj.stage.staking_time, 'FULL RATE')
        return obj.percentage * (obj.stage.staking_time if obj.stage else 1)


class UserStakingSerializer(serializers.ModelSerializer):
    percentage = serializers.SerializerMethodField()
    daily_earning = serializers.SerializerMethodField()
    daily_percentage = serializers.SerializerMethodField()
    current_day = serializers.SerializerMethodField()
    total_days = serializers.SerializerMethodField()
    now_date = serializers.SerializerMethodField()

    class Meta:
        model = UserStaking
        fields = ['id', 'user', 'staking_level', 'amount', 'percentage', 'start_date', 'end_date', 'daily_earning', 'daily_percentage', 'current_day', 'total_days', 'now_date']
        read_only_fields = ['id', 'start_date', 'end_date']

    def get_percentage(self, obj):
        user_staking_stage = obj.user.staking_stage
        staking_level = StakingLevel.objects.get(stage=user_staking_stage, level=obj.staking_level.level)
        return staking_level.percentage
    
    def get_total_days(self, obj):
        return (obj.end_date - obj.start_date).days
    
    def get_current_day(self, obj):
        return (now().date() - obj.start_date.date()).days + 1
    
    def get_daily_percentage(self, obj):
        total_days = self.get_total_days(obj)
        return self.get_percentage(obj) / total_days if total_days > 0 else 0
    
    def get_daily_earning(self, obj):
        return (obj.amount * self.get_daily_percentage(obj)) / 100
    
    def get_now_date(self, obj):
        return now().isoformat()

    def validate_amount(self, value):
        """
        Проверка, что сумма депозита соответствует min/max депозита уровня стейкинга
        """
        staking_level = self.initial_data.get('staking_level')
        if not staking_level:
            raise serializers.ValidationError("Staking level is required.")

        try:
            staking_level = self.instance.staking_level if self.instance else self.Meta.model.staking_level.field.related_model.objects.get(id=staking_level)
        except self.Meta.model.staking_level.field.related_model.DoesNotExist:
            raise serializers.ValidationError("Invalid staking level.")

        if value < staking_level.min_deposite:
            raise serializers.ValidationError(f"Amount must be at least {staking_level.min_deposite}.")
        if value > staking_level.max_deposite:
            raise serializers.ValidationError(f"Amount cannot exceed {staking_level.max_deposite}.")

        return value    

class OpenStakingSerializer(serializers.Serializer):
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    staking_level = serializers.IntegerField()

    def validate_amount(self, value):
        """
        Проверка, что сумма депозита меньше или равна балансу пользователя
        """
        user = self.context.get('user')
        if user.balance < value:
            raise serializers.ValidationError('Insufficient balance.')
        
        return value

    def validate_staking_level(self, value):
        """
        Проверка на корректность уровня стейкинга.
        """
        user = self.context.get('user')
        try:
            staking = StakingLevel.objects.get(level=value, stage=user.staking_stage)
        except StakingLevel.DoesNotExist:
            raise serializers.ValidationError('Staking level not found for the user’s current staking stage.')
        return staking