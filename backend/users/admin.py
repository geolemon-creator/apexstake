from django.contrib import admin

from .models import CustomUser, UserReferralReward


admin.site.register(CustomUser)
admin.site.register(UserReferralReward)