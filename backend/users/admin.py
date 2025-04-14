from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import CustomUser, UserReferralReward
from django.db.models import Sum, Count
from staking.models import UserStaking
from transactions.models import Transactions


@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'balance', 'blocked_balance', 'staking_count', 'total_staking_amount', 'total_refferrals', 'refferrals_with_deposite')

    def staking_count(self, obj):
        return UserStaking.objects.filter(user=obj).count()
    staking_count.short_description = 'Количество стейкингов'

    def total_staking_amount(self, obj):
        result = UserStaking.objects.filter(user=obj).aggregate(total=Sum('amount'))
        return result['total'] or 0
    
    def total_refferrals(self, obj):
        referrals = CustomUser.objects.filter(referred_by=obj)
        referrals_with_staking = 0
        for referral in referrals:
            if UserStaking.objects.filter(user=referral).exists():
                referrals_with_staking += 1
        return referrals_with_staking
    total_refferrals.short_description = 'Активные рефералы'

    def refferrals_with_deposite(self, obj):
        referrals = CustomUser.objects.filter(referred_by=obj)
        refferals_with_deposite = 0
        for refferal in referrals:
            refferal_transaction = Transactions.objects.filter(user=refferal, operation_type='deposit').exists()
            if refferal_transaction:
                refferals_with_deposite += 1
        return refferals_with_deposite
    refferrals_with_deposite.short_description = 'Рефералы с депозитом'


class UserReferralRewardAdmin(admin.ModelAdmin):
    model = UserReferralReward
    
    list_display = ('user', 'referral', 'first_deposite', 'reward', 'timestamp')
    list_filter = ('first_deposite', 'timestamp', 'reward')
    search_fields = ('user__username', 'referral__username', 'reward')
    
    ordering = ('-timestamp',)
    exclude = ('timestamp',)

admin.site.register(UserReferralReward, UserReferralRewardAdmin)