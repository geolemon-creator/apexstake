from django.urls import path

from .views import BannerListView, RandomWalletAPIView, ContestListAPIView, CommissionAPIView

urlpatterns = [
    path('banners/', BannerListView.as_view(), name='banners_list'),
    path('wallet/', RandomWalletAPIView.as_view(), name='random_wallet'),
    path('competitions/', ContestListAPIView.as_view(), name='competitions'),
    path('commission/', CommissionAPIView.as_view(), name='commission')
]