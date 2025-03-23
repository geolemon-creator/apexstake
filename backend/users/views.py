from datetime import datetime
from django.utils.timezone import make_aware

from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken


from .models import CustomUser
from .serializers import CustomUserSerializer
from .permissions import IsAdminOrSelf
from .services import validate_telegram_init_data


class UserModelViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrSelf]

class LeadersAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user

        leaders = CustomUser.objects.order_by('-tokens')[:100]
        leaders_data = CustomUserSerializer(leaders, many=True).data

        user_rank = CustomUser.objects.filter(tokens__gt=user.tokens).count() + 1

        return Response({
                "leaders": leaders_data,
                "user_rank": user_rank
        })
    

class AuthAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        init_data = request.data.get("initData")

        if not init_data:
            return Response({"error": "initData is required"}, status=400)

        user_data = validate_telegram_init_data(init_data)
        if not user_data:
            return Response({"error": "Invalid initData"}, status=403)

        telegram_id = user_data["id"]
        username = user_data.get("username", f"user_{telegram_id}")
        avatar_url = user_data.get("photo_url", None)

        user, created = CustomUser.objects.get_or_create(
            telegram_id=telegram_id,
            defaults={
                "id": str(telegram_id),
                "username": username,
                "avatar": avatar_url or "users/avatar/default-avatar.png",
                "created_at": make_aware(datetime.now()),
            },
        )

        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "access_token": str(refresh.access_token),
                "refresh_token": str(refresh),
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "avatar": user.avatar.url if user.avatar else None,
                },
            }
        )