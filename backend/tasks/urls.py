from django.urls import path
from .views import TasksAPIView, CompleteTaskAPIView

urlpatterns = [
    path('tasks/list/', TasksAPIView.as_view(), name='tasks_list'),
    path('tasks/complete/<int:task_id>/', CompleteTaskAPIView.as_view(), name='task_complete')
]