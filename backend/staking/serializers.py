from rest_framework import serializers
from .models import StakingStage, StakingLevel, UserStaking


class StakingStageSerializer(serializers.ModelSerializer):
    class Meta:
        model = StakingStage
        fields = ['id', 'stage', 'staking_time']

class StakingLevelSerializer(serializers.ModelSerializer):
    stage = StakingStageSerializer()

    class Meta:
        model = StakingLevel
        fields = ['id', 'stage', 'level', 'min_deposite', 'max_deposite', 'percentage']

class UserStakingSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserStaking
        fields = ['id', 'user', 'staking_level', 'amount', 'start_date', 'end_date']
        read_only_fields = ['id', 'start_date', 'end_date']

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