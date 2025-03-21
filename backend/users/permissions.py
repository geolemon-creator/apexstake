from rest_framework import permissions


class IsAdminOrSelf(permissions.BasePermission):
    """
    Разрешает изменение пользователю только своего профиля, а админу — любые профили.
    """
    
    def has_object_permission(self, request, view, obj):
        # Разрешаем только аутентифицированным пользователям
        if not request.user.is_authenticated:
            return False
        
        # Администраторы могут менять любые аккаунты
        if request.user.is_staff or request.user.is_superuser:
            return True
        
        # Обычные пользователи могут редактировать только себя
        return obj == request.user