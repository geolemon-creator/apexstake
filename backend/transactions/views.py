from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.shortcuts import get_object_or_404
from .models import Transactions
from users.models import UserReferralReward
from decimal import Decimal


class CreateTransactionView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        operation_type = request.data.get('operation_type')
        amount = request.data.get('amount')
        user_id = request.data.get('user_id')

        if not all([operation_type, amount, user_id]):
            return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

        if operation_type not in dict(Transactions.OPERATION_TYPES):
            return Response({'error': 'Invalid operation type'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            amount = Decimal(amount)
        except:
            return Response({'error': 'Invalid amount'}, status=status.HTTP_400_BAD_REQUEST)

        # Устанавливаем статус "completed" только для deposit
        transaction_status = 'completed' if operation_type == 'deposit' else 'waiting'

        transaction = Transactions.objects.create(
            user=user,
            operation_type=operation_type,
            amount=amount,
            status=transaction_status
        )
        if operation_type == 'deposit':
            user.balance += amount
            user.save()

            # Проверяем, был ли у пользователя депозит раньше
            has_deposited_before = Transactions.objects.filter(user=user, operation_type='deposit').exclude(id=transaction.id).exists()
            # Если это ПЕРВЫЙ депозит и у юзера есть реферер
            if user.referred_by and not has_deposited_before:
                # Подсчитываем количество рефералов, которые пополнили баланс у referred_by
                referral_count = UserReferralReward.objects.filter(user=user.referred_by, first_deposite=True).count() + 1
                # Если это 10-й реферал, начисляем 350, иначе 150
                reward_amount = 350 if referral_count % 10 == 0 else 150

                referral_reward, created = UserReferralReward.objects.get_or_create(
                    user=user.referred_by,
                    referral=user
                )
                print(referral_reward, created, 'Объект награды')
                if created:  # Начисляем награду только один раз
                    referral_reward.reward = reward_amount
                    referral_reward.first_deposite = True
                    referral_reward.save()

                    # Начисляем бонус рефералу
                    user.referred_by.tokens += reward_amount
                    user.referred_by.save()

        if operation_type == 'withdraw':
            user.balance -= amount
            user.save()

        return Response({
            'message': 'Transaction created successfully',
            'transaction_id': transaction.id,
            'status': transaction.status,
            'timestamp': transaction.timestamp
        }, status=status.HTTP_201_CREATED)
    
class GetUserTransactionAPIView(APIView):
    pass