from django.urls import path, include
from rest_framework.routers import DefaultRouter
from users.views import UserModelViewSet

router = DefaultRouter()
router.register(r'users', UserModelViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),
]