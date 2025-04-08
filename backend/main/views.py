import random
from django.shortcuts import render

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, GenericAPIView

from .models import Contest, Wallets, Banner, Commission
from .serializers import ContestSerializer, BannerSerializer


class ContestListAPIView(ListAPIView):
    """Возвращает список конкусов, настраиваемых через админ-панель"""
    queryset = Contest.objects.all()
    serializer_class = ContestSerializer


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