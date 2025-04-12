import random
from django.shortcuts import render

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, GenericAPIView
from rest_framework.permissions import IsAuthenticated

from .models import Contest, Wallets, Banner, Commission, UserContest, ContestInfo
from staking.models import UserStaking
from .serializers import ContestSerializer, BannerSerializer, ContestInfoSerializer


class ContestListAPIView(ListAPIView):
    """Возвращает список конкусов, настраиваемых через админ-панель"""
    queryset = Contest.objects.all()
    serializer_class = ContestSerializer

class ContestDetailsAPIView(APIView):
    def get(self, request, contest_id):
        try:
            contest = Contest.objects.get(id=contest_id)
            contest_info = ContestInfo.objects.filter(contest=contest)

            contest_data = ContestSerializer(contest).data
            contest_info_data = ContestInfoSerializer(contest_info, many=True).data

            return Response({'data': {'contest': contest_data, 'contest_info': contest_info_data}}, status=status.HTTP_200_OK)

        except Contest.DoesNotExist:
            return Response({'detail': 'Contest not found'}, status=status.HTTP_404_NOT_FOUND)

    
class EnterContestAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, contest_id):
        try:
            contest = Contest.objects.get(id=contest_id)
        except Contest.DoesNotExist:
            return Response({'detail': 'Конкурс не найден'}, status=status.HTTP_404_NOT_FOUND)

        if UserContest.objects.filter(user=request.user, contest=contest).exists():
            return Response({'detail': 'Вы уже участвуете в этом конкурсе'}, status=status.HTTP_400_BAD_REQUEST)

        if contest.condition == 'referral_bonuses':
            pass

        elif contest.condition == 'dubai_party':
            has_staking = UserStaking.objects.filter(user=request.user, amount__gte=5000).exists()
            if not has_staking:
                return Response({'detail': 'Вы должны открыть стекинг на 5000 TON'}, status=status.HTTP_400_BAD_REQUEST)

        UserContest.objects.create(user=request.user, contest=contest)
        return Response({'detail': 'Вы успешно зарегистрировались на конкурс'}, status=status.HTTP_201_CREATED)

class RandomWalletAPIView(GenericAPIView):
    """Возвращает случайный кошелек на который будут приходить средства от пополнений"""
    def get(self, request):
        wallet = Wallets.objects.order_by('?').first()
        if not wallet:
            return Response({'error': 'Кошельки не найдены'}, status=status.HTTP_404_NOT_FOUND)

        return Response({
            'title': wallet.title,
            'wallet': wallet.wallet
        }, status=status.HTTP_200_OK)


class BannerListView(ListAPIView):
    """Возвращает список баннеров, настраиваемых через админ-панель"""
    queryset = Banner.objects.all()
    serializer_class = BannerSerializer


class CommissionAPIView(APIView):
    """Возвращает процент комиссии, взимаемой при выводе средств."""
    def get(self, request):
        commission, _ = Commission.objects.get_or_create(defaults={"percent": 10})
        return Response({"percent": commission.percent}, status=status.HTTP_200_OK)