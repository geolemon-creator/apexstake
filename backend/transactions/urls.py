from django.urls import path
from .views import CreateTransactionView, GetUserTransactionAPIView

urlpatterns = [
    path('create-transaction/', CreateTransactionView.as_view(), name='create_transaction'),
    path('transactions/', GetUserTransactionAPIView.as_view(), name='get_transactions')
]