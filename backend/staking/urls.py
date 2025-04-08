from django.urls import path

from .views import StakingLevelsAPIView, OpenStakingAPIView, UserStakingAPIView, LevelDetailsAPIView, ChangeStakingAPIView, RandomWalletAPIView, CompetitionListAPIView, BannerListView, CommissionAPIView


urlpatterns = [
    path('staking/me/', UserStakingAPIView.as_view(), name='user_staking'),
    path('staking/levels/', StakingLevelsAPIView.as_view(), name='staking_levels'),
    path('staking/open/', OpenStakingAPIView.as_view(), name='open_staking'),
    path('staking/change/', ChangeStakingAPIView.as_view(), name='change_staking'),
    path('staking/details/<int:staking_level>/', LevelDetailsAPIView.as_view(), name='level_details'),
    path('banners/', BannerListView.as_view(), name='banners_list'),
    path('wallet/', RandomWalletAPIView.as_view(), name='random_wallet'),
    path('competitions/', CompetitionListAPIView.as_view(), name='competitions'),
    path('commission/', CommissionAPIView.as_view(), name='commission')
]