import random
from django.shortcuts import render
from django.db import transaction
from django.utils import timezone

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView

from .models import StakingLevel, UserStaking, Wallets, Competition, Banner, Commission
from .serializers import StakingLevelSerializer, OpenStakingSerializer, UserStakingSerializer, StakingStage, StakingLevelDetailsSerializer, ChangeStakingSerializer, CompetitionSerializer, BannerSerializer
from .services import change_staking_level


class StakingLevelsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Отдает уровни стейкинга по stage пользователя
        """
        user = request.user

        if not user.staking_stage or user.staking_stage.stage < 1:
            user.staking_stage, _ = StakingStage.objects.get_or_create(
                stage=1, 
                defaults={"staking_time": 110}
            )
            user.save()
        
        levels = StakingLevel.objects.filter(stage=user.staking_stage)
        if not levels.exists():
            return Response(
                {"error": "Уровни стейкинга не найдены на текущей стадии"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = StakingLevelSerializer(levels, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class OpenStakingAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user

        # Проверяем, есть ли у пользователя уже открытый стейкинг
        if UserStaking.objects.filter(user=user, status='in_progress').exists():
            return Response({'error': 'Вы уже имеете открытый стейкинг'}, 
                            status=status.HTTP_400_BAD_REQUEST)

        # Валидируем данные через сериализатор
        serializer = OpenStakingSerializer(data=request.data, context={'user': user})
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        amount = serializer.validated_data['amount']
        staking = serializer.validated_data['staking_level']

        # Проверяем что сумма не больше и не меньше указаного депозита
        staking_level = StakingLevel.objects.get(stage=user.staking_stage, level=staking.level)
        if staking_level.min_deposite > amount or staking_level.max_deposite < amount:
            return Response({'error': f'Сумма должна быть между {staking_level.min_deposite} и {staking_level.max_deposite}.'}, 
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            with transaction.atomic():
                user.open_staking(amount)
                user_staking = UserStaking.objects.create(
                    user=user,
                    amount=amount,
                    staking_level=staking,
                )

                return Response(
                    {'message': f'Стейкинг успешно открыт. Дата окончания: {user_staking.end_date}'}, 
                    status=status.HTTP_200_OK
                )

        except ValueError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ChangeStakingAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ChangeStakingSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        try:
            result = change_staking_level(user=request.user, **serializer.validated_data)
            return Response({'data': result}, status=status.HTTP_200_OK)
        except ValueError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserStakingAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Получение стейкинга пользователя"""
        user_staking = UserStaking.objects.filter(user=request.user, status="in_progress", end_date__gt=timezone.now()).first()
        if user_staking:
            serializer = UserStakingSerializer(user_staking)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "У пользователя нет открытых стейкингов"}, status=status.HTTP_404_NOT_FOUND)

class LevelDetailsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, staking_level):
        """Информация о уровне стейкинга"""
        try:
            staking_info = StakingLevel.objects.get(stage=request.user.staking_stage, level=staking_level)
        except StakingLevel.DoesNotExist:
            return Response({'error': 'Уровень не найден'}, status=status.HTTP_404_NOT_FOUND)

        serializer = StakingLevelDetailsSerializer(staking_info)

        return Response(serializer.data, status=status.HTTP_200_OK)

class CompetitionListAPIView(ListAPIView):
    queryset = Competition.objects.all()
    serializer_class = CompetitionSerializer

class RandomWalletAPIView(APIView):
    def get(self, request):
        wallets = Wallets.objects.all()
        if not wallets.exists():
            return Response({'error': 'Кошельки не найдены'}, status=status.HTTP_404_NOT_FOUND)

        wallet = random.choice(wallets)
        return Response({
            'title': wallet.title,
            'wallet': wallet.wallet
        }, status=status.HTTP_200_OK)

class BannerListView(ListAPIView):
    queryset = Banner.objects.all()
    serializer_class = BannerSerializer

class CommissionAPIView(APIView):
    def get(self, request):
        commission, _ = Commission.objects.get_or_create(defaults={"percent": 10})
        return Response({"percent": commission.percent}, status=status.HTTP_200_OK)