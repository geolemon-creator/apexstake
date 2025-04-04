from django.urls import path
from .views import CreateTransactionView

urlpatterns = [
    path('create-transaction/', CreateTransactionView.as_view(), name='create_transaction')
]