from django.shortcuts import render
from django.db import transaction
from django.utils import timezone

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from .models import StakingLevel, UserStaking
from .serializers import StakingLevelSerializer, OpenStakingSerializer, UserStakingSerializer, StakingStage, StakingLevelDetailsSerializer


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
                {"error": "No staking levels found for the user's current stage."},
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
            return Response({'error': 'You already have an active staking.'}, 
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
            return Response({'error': f'Amount should be between {staking_level.min_deposite} and {staking_level.max_deposite}.'}, 
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
                    {'message': f'Staking successfully opened. End date: {user_staking.end_date}'}, 
                    status=status.HTTP_200_OK
                )

        except ValueError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UserStakingAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Получение стейкинга пользователя"""
        user_staking = UserStaking.objects.filter(user=request.user, status="in_progress", end_date__gt=timezone.now()).first()
        if user_staking:
            serializer = UserStakingSerializer(user_staking)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "No active staking found for this user."}, status=status.HTTP_404_NOT_FOUND)

class LevelDetailsAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, staking_level):
        """Информация о уровне стейкинга"""
        try:
            staking_info = StakingLevel.objects.get(stage=request.user.staking_stage, level=staking_level)
        except StakingLevel.DoesNotExist:
            return Response({'error': 'Level not found'}, status=status.HTTP_404_NOT_FOUND)
    
        serializer = StakingLevelDetailsSerializer(staking_info)

        return Response(serializer.data, status=status.HTTP_200_OK)