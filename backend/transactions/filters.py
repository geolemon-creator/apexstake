import django_filters
from .models import Transactions


class TransactionFilter(django_filters.FilterSet):
    start_date = django_filters.IsoDateTimeFilter(field_name='timestamp', lookup_expr='gte')
    end_date = django_filters.IsoDateTimeFilter(field_name='timestamp', lookup_expr='lte')
    operation_type = django_filters.CharFilter(field_name='operation_type', lookup_expr='exact')

    class Meta:
        model = Transactions
        fields = ['operation_type', 'start_date', 'end_date']