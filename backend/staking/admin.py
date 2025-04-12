from django.contrib import admin
from django.db.models import Sum, Count

from .models import StakingLevel, StakingStage, UserStaking, UserStakingReward


class UserStakingAdmin(admin.ModelAdmin):
    list_display = ('user', 'staking_level', 'status', 'amount', 'start_date', 'end_date')
    search_fields = ('user__username', 'staking_level__level')
    list_filter = ('status', 'staking_level')
    ordering = ('-start_date',)
    readonly_fields = ('start_date',)

admin.site.register(UserStaking, UserStakingAdmin)
admin.site.register(StakingLevel)
admin.site.register(StakingStage)
admin.site.register(UserStakingReward)