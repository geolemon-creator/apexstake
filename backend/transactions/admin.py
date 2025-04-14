from django.contrib import admin

from .models import Transactions


class TransactionsAdmin(admin.ModelAdmin):
    list_display = ('user', 'wallet', 'operation_type', 'amount', 'status', 'timestamp')  # Какие поля показывать в списке
    list_filter = ('operation_type', 'status', 'user')  # Фильтрация по этим полям
    search_fields = ('user__username', 'wallet')  # Поиск по пользователю и кошельку
    ordering = ('-timestamp',)  # Сортировка по времени в убывающем порядке (по умолчанию последние транзакции)

admin.site.register(Transactions, TransactionsAdmin)