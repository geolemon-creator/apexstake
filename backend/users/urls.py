from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import UserModelViewSet, LeadersAPIView, AuthAPIView, RegisterUserAPIView, GetInvitedUsersAPIView, GetLeadersListAPIView


router = DefaultRouter()
router.register(r'users', UserModelViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),
    path('users/leaders/', LeadersAPIView.as_view(), name='users_leaders'),
    path('auth/', AuthAPIView.as_view(), name='auth'),
    path('register/', RegisterUserAPIView.as_view(), name='register'),
    path('invited-users/', GetInvitedUsersAPIView.as_view(), name='invited_users'),
    path('leaders/', GetLeadersListAPIView.as_view(), name='leaders-list'),
    path('jwt/create/', TokenObtainPairView.as_view(), name='jwt_create'),
    path('jwt/refresh/', TokenRefreshView.as_view(), name='jwt_create'),
]