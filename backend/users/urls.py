from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import UserModelViewSet, LeadersAPIView


router = DefaultRouter()
router.register(r'users', UserModelViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),
    path('users/leaders/', LeadersAPIView.as_view(), name='users_leaders'),
    path('jwt/create/', TokenObtainPairView.as_view(), name='jwt_create'),
    path('jwt/refresh/', TokenRefreshView.as_view(), name='jwt_create'),
]