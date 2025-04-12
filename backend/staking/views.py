from decimal import Decimal
from django.db import transaction
from django.utils import timezone

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError

from transactions.models import Transactions

from .models import StakingLevel, UserStaking
from .serializers import StakingLevelSerializer, OpenStakingSerializer, UserStakingSerializer, StakingStage, StakingLevelDetailsSerializer, ChangeStakingSerializer
from .services import change_staking_level, calculate_withdrawal_commission


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
                Transactions.objects.create(
                    user=user,
                    amount=amount,
                    wallet=user.wallet,
                    operation_type='withdraw',
                    status='completed'
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
        """Смена уровня пользователя"""
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

class LevelDetailsListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Список всех уровней стейкинга пользователя"""
        staking_levels = StakingLevel.objects.filter(stage=request.user.staking_stage).order_by('level')
        serializer = StakingLevelDetailsSerializer(staking_levels, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserStakingProfitView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_staking = UserStaking.objects.filter(user=request.user, status='in_progress').first()
        return Response({'profit': user_staking.get_profit() if user_staking else 0.0})
    
class WithdrawStakingProfit(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        
        # 1. Проверка наличия активного стейкинга
        user_staking = UserStaking.objects.filter(user=user, status='in_progress').first()
        if not user_staking:
            raise ValidationError('У вас нет активного стейкинга для вывода прибыли.')

        # 2. Получение текущей прибыли и комиссии
        profit = user_staking.get_profit()
        if profit <= 0:
            raise ValidationError('Нет прибыли для вывода.')

        # Преобразуем float в Decimal
        profit_decimal = Decimal(str(profit))
        commission = calculate_withdrawal_commission(user_staking.start_date, user_staking.end_date)
        commission_profit = profit_decimal * commission

        # 3. Обновление данных о выводе
        try:
            user_staking.withdrawn_amount += profit_decimal
            user.balance += commission_profit
            user_staking.save()
            user.save()
        except Exception as e:
            raise ValidationError(f'Ошибка при обновлении данных: {str(e)}')

        # 4. Создание транзакции
        try:
            Transactions.objects.create(
                user=user,
                wallet=user.wallet,
                amount=commission_profit,
                operation_type='deposit',
                status='completed'
            )
        except Exception as e:
            raise ValidationError(f'Ошибка при создании транзакции: {str(e)}')

        # 5. Ответ с успехом
        return Response({'data': f'Вывод прошел успешно! На баланс зачислено {commission_profit}'})