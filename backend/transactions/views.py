from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

from .services import create_transaction


class CreateTransactionView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        operation_type = request.data.get('operation_type')
        amount = request.data.get('amount')

        if not all([operation_type, amount]):
            return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            txn = create_transaction(user, operation_type, amount)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            'message': 'Transaction created successfully',
            'transaction_id': txn.id,
            'status': txn.status,
            'timestamp': txn.timestamp
        }, status=status.HTTP_201_CREATED)
    
class GetUserTransactionAPIView(APIView):
    pass