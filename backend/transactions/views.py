from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Transactions
from users.models import CustomUser  # путь к модели пользователя, поправь если нужно
from decimal import Decimal


class CreateTransactionView(APIView):
    def post(self, request):
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

        user = get_object_or_404(CustomUser, id=user_id)

        # Устанавливаем статус "completed" только для deposit
        transaction_status = 'completed' if operation_type == 'deposit' else 'waiting'

        transaction = Transactions.objects.create(
            user=user,
            operation_type=operation_type,
            amount=amount,
            status=transaction_status
        )

        return Response({
            'message': 'Transaction created successfully',
            'transaction_id': transaction.id,
            'status': transaction.status,
            'timestamp': transaction.timestamp
        }, status=status.HTTP_201_CREATED)