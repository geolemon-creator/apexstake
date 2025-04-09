from django.urls import path

from .views import StakingLevelsAPIView, OpenStakingAPIView, UserStakingAPIView, LevelDetailsAPIView, ChangeStakingAPIView, UserStakingProfitView, WithdrawStakingProfit


urlpatterns = [
    path('me/', UserStakingAPIView.as_view(), name='user_staking'),
    path('levels/', StakingLevelsAPIView.as_view(), name='staking_levels'),
    path('open/', OpenStakingAPIView.as_view(), name='open_staking'),
    path('change/', ChangeStakingAPIView.as_view(), name='change_staking'),
    path('details/<int:staking_level>/', LevelDetailsAPIView.as_view(), name='level_details'),
    path('profit/', UserStakingProfitView.as_view(), name='staking_profit'),
    path('withdraw-profit/', WithdrawStakingProfit.as_view(), name='withdraw_profit')
]