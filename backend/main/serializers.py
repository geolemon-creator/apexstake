from rest_framework import serializers

from .models import Contest, Banner, ContestInfo


class ContestSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    badge_content = serializers.SerializerMethodField()
    
    class Meta:
        model = Contest
        fields = [
            'id',
            'title',
            'badge_content',
            'condition',
            'prize_amount',
            'img',
            'end_date',
        ]

    def get_title(self, obj):
        request = self.context.get('request')
        if request and request.LANGUAGE_CODE == 'en':
            return obj.en_title or obj.title
        return obj.title

    def get_badge_content(self, obj):
        request = self.context.get('request')
        if request and request.LANGUAGE_CODE == 'en':
            return obj.en_badge_content or obj.badge_content
        return obj.badge_content

class ContestInfoSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    content = serializers.SerializerMethodField()

    class Meta:
        model = ContestInfo
        fields = [
            'title',
            'content',
            'amount',
        ]

    def get_title(self, obj):
        request = self.context.get('request')
        if request and request.LANGUAGE_CODE == 'en':
            return obj.en_title or obj.title
        return obj.title

    def get_content(self, obj):
        request = self.context.get('request')
        if request and request.LANGUAGE_CODE == 'en':
            return obj.en_content or obj.content
        return obj.content

class BannerSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()

    class Meta:
        model = Banner
        fields = ['title', 'description', 'img', 'link']

    def get_title(self, obj):
        request = self.context.get('request')
        if request and request.LANGUAGE_CODE == 'en':
            return obj.en_title or obj.title
        return obj.title

    def get_description(self, obj):
        request = self.context.get('request')
        if request and request.LANGUAGE_CODE == 'en':
            return obj.en_description or obj.description
        return obj.description