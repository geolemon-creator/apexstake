from django.urls import path

from .views import StakingLevelsAPIView, OpenStakingAPIView, UserStakingAPIView, LevelDetailsAPIView, ChangeStakingAPIView


urlpatterns = [
    path('staking/me/', UserStakingAPIView.as_view(), name='user_staking'),
    path('staking/levels/', StakingLevelsAPIView.as_view(), name='staking_levels'),
    path('staking/open/', OpenStakingAPIView.as_view(), name='open_staking'),
    path('staking/change/', ChangeStakingAPIView.as_view(), name='change_staking'),
    path('staking/details/<int:staking_level>/', LevelDetailsAPIView.as_view(), name='level_details'),
]