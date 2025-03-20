from django.contrib import admin

from .models import StakingLevel, StakingStage, UserStaking, UserStakingReward


admin.site.register(StakingLevel)
admin.site.register(StakingStage)
admin.site.register(UserStaking)
admin.site.register(UserStakingReward)