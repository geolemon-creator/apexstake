from rest_framework import serializers
from .models import FarmingTask


class FarmingTaskSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()

    class Meta:
        model = FarmingTask
        fields = ['id', 'title', 'description', 'icon', 'link', 'reward_amount']

    def get_title(self, obj):
        request = self.context.get('request')
        if request and request.LANGUAGE_CODE == 'en':
            return obj.en_title or obj.title
        return obj.title
