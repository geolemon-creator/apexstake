from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import FarmingTask, UserFarmingTask
from .serializers import FarmingTaskSerializer


class TasksAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Исключает выполненые задачи и отдает актуальный список  
        """
        user = request.user
        
        # Получаем все выполненные задачи для пользователя
        completed_task_ids = UserFarmingTask.objects.filter(user=user).values_list('farming_task_id', flat=True)
        
        # Фильтруем задачи, исключая те, которые уже выполнены
        tasks = FarmingTask.objects.exclude(id__in=completed_task_ids)
        
        serializer = FarmingTaskSerializer(tasks, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)


class CompleteTaskAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, task_id):
        """
        Принимает task_id, создает объект UserFarmingTask и начисляет пользователю награду
        """
        user = request.user
        
        # Проверка, не выполнил ли пользователь задачу
        if UserFarmingTask.objects.filter(user=user, farming_task_id=task_id).exists():
            return Response({"detail": "Task already completed."}, status=status.HTTP_400_BAD_REQUEST)

        # Получаем задачу
        try:
            farming_task = FarmingTask.objects.get(id=task_id)
        except FarmingTask.DoesNotExist:
            return Response({"detail": "Task not found."}, status=status.HTTP_404_NOT_FOUND)

        # Создаем запись о выполнении задачи
        UserFarmingTask.objects.create(user=user, farming_task=farming_task)
        reward_amount = farming_task.reward_amount
        user.increase_tokens(reward_amount)

        return Response({"detail": f"Task completed successfully! {reward_amount} tokens added!"}, status=status.HTTP_200_OK)