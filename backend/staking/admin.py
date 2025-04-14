from django.contrib import admin
from django.db.models import Sum, Count

from .models import StakingLevel, StakingStage, UserStaking, UserStakingReward


class UserStakingAdmin(admin.ModelAdmin):
    list_display = ('user', 'staking_level', 'status', 'amount')
    search_fields = ('user__username', 'staking_level__level')
    list_filter = ('status', 'staking_level')
    ordering = ('-start_date',)
    readonly_fields = ('start_date',)

@admin.register(UserStakingReward)
class UserStakingRewardAdmin(admin.ModelAdmin):
    list_display = ('user_staking', 'amount', 'tokens', 'timestamp')
    list_filter = ('timestamp',)
    search_fields = ('user_staking__user__username',)

class StakingLevelAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {
            'fields': ('stage', 'level', 'min_deposite', 'max_deposite', 'percentage')
        }),
    )
    list_display = ('stage', 'level', 'min_deposite', 'max_deposite', 'percentage')
    list_filter = ('stage',)
    search_fields = ('stage__name', 'level')
    ordering = ('level',)

class StakingStageAdmin(admin.ModelAdmin):
    list_display = ('stage', 'days_for_change', 'staking_time')
    list_filter = ('stage',)
    search_fields = ('stage',)
    ordering = ('stage',)
    fieldsets = (
        (None, {
            'fields': ('stage', 'days_for_change', 'staking_time')
        }),
    )

    def stage_display(self, obj):
        return dict(obj.STAGE_CHOICES).get(obj.stage)
    
    stage_display.short_description = 'Этап'

admin.site.register(StakingStage, StakingStageAdmin)
admin.site.register(StakingLevel, StakingLevelAdmin)
admin.site.register(UserStaking, UserStakingAdmin)