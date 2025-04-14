from django.contrib import admin

from .models import FarmingTask, UserFarmingTask


@admin.register(FarmingTask)
class FarmingTaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'reward_amount', 'link')
    search_fields = ('title', 'en_title')


@admin.register(UserFarmingTask)
class UserFarmingTaskAdmin(admin.ModelAdmin):
    list_display = ('user', 'farming_task', 'timestamp')
    list_filter = ('timestamp',)