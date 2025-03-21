from rest_framework import serializers
from .models import FarmingTask


class FarmingTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = FarmingTask
        fields = ['id', 'title', 'description', 'icon', 'link', 'reward_amount']
