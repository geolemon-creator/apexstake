from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import CustomUser
from .serializers import CustomUserSerializer
from .permissions import IsAdminOrSelf


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