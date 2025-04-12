from django.urls import path

from .views import BannerListView, RandomWalletAPIView, ContestListAPIView, CommissionAPIView, ContestDetailsAPIView, EnterContestAPIView

urlpatterns = [
    path('banners/', BannerListView.as_view(), name='banners_list'),
    path('wallet/', RandomWalletAPIView.as_view(), name='random_wallet'),
    path('contests/', ContestListAPIView.as_view(), name='contests'),
    path('contest/<int:contest_id>/', ContestDetailsAPIView.as_view(), name='contest_details'),
    path('enter-contest/<int:contest_id>/', EnterContestAPIView.as_view(), name='enter-contest'),
    path('commission/', CommissionAPIView.as_view(), name='commission')
]