from django.utils.timezone import now
from .services import (
    calculate_current_profit,
    calculate_daily_percentage,
    calculate_daily_earning,
)

class UserStakingCalculationMixin:
    def get_percentage(self, obj):
        stage = obj.user.staking_stage
        return obj.staking_level.percentage  # или через stage-level связь

    def get_total_days(self, obj):
        return (obj.end_date - obj.start_date).days

    def get_current_day(self, obj):
        return (now().date() - obj.start_date.date()).days + 1

    def get_now_date(self, obj):
        return now().isoformat()

    def get_daily_percentage(self, obj):
        return calculate_daily_percentage(self.get_percentage(obj), self.get_total_days(obj))

    def get_daily_earning(self, obj):
        return calculate_daily_earning(obj.amount, self.get_daily_percentage(obj))

    def get_current_profit(self, obj):
        return calculate_current_profit(obj.amount, self.get_percentage(obj), obj.start_date, obj.end_date)
