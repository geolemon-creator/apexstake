from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from staking.models import UserStaking
from .models import CustomUser
from .serializers import CustomUserSerializer, RegisterUserSerializer
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
        ''' Получение или создание пользователя при открытии WebApp '''
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
                "avatar": avatar_url,
            },
        )

        staking_stage = user.staking_stage.stage if user.staking_stage else None

        # Определяем текущий уровень пользователя по UserStaking (если есть активные ставки)
        user_staking = UserStaking.objects.filter(user=user, status="in_progress").order_by("-start_date").first()
        selected_level = user_staking.staking_level.level if user_staking else None

        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "access_token": str(refresh.access_token),
                "refresh_token": str(refresh),
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "balance": user.balance,
                    "blocked_balance": user.blocked_balance,
                    "tokens": user.tokens,
                    "wallet": user.wallet,
                    "avatar": user.avatar if user.avatar else None,
                    "staking_stage": staking_stage,
                    "selected_level": selected_level,
                    "referral_code": user.referral_code
                },
            }
        )
    
class RegisterUserAPIView(APIView):
    def post(self, request):
        print(request.data, 'data')
        serializer = RegisterUserSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {"message": "Пользователь зарегистрирован"},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class GetInvitedUsersAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        user = request.user
        
        if not user:
            return Response({"error": "User not found"}, status=404)
        
        invited_users = CustomUser.objects.filter(referred_by=user)

        serializer = CustomUserSerializer(invited_users, many=True)

        return Response({"invited_users": serializer.data})