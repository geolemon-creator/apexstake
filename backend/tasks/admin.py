from django.contrib import admin

from .models import FarmingTask, UserFarmingTask


admin.site.register(FarmingTask)
admin.site.register(UserFarmingTask)
