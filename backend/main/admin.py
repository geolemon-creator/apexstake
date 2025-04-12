from django.contrib import admin
from django.db.models import Sum

from .models import Banner, Commission, Contest, Wallets, ContestInfo, UserContest
from staking.models import UserStaking
from transactions.models import Transactions
from users.models import CustomUser


admin.site.register(Banner)
admin.site.register(Commission)
admin.site.register(Contest)
admin.site.register(ContestInfo)
admin.site.register(Wallets)


@admin.register(UserContest)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('user', 'contest', 'total_refferals', 'total_staking_deposite', 'start_date')

    def total_refferals(self, obj):
        user = obj.user
        refferals = CustomUser.objects.filter(referred_by=user)
        refferal_count = 0
        for refferal in refferals:
            if UserStaking.objects.filter(user=refferal).exists():
                refferal_count +=1

        return refferal_count
    total_refferals.short_description = 'Количество рефералов'

    def total_staking_deposite(self, obj):
        user = obj.user
        total_deposit = Transactions.objects.filter(user=user, operation_type='deposit').aggregate(Sum('amount'))
        
        return total_deposit['amount__sum']

    total_staking_deposite.short_description = 'Всего вложено в стейкинг'
