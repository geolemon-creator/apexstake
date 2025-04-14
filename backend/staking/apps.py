from django.apps import AppConfig


class StakingConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'staking'
    verbose_name = "Стейкинг"
    
    def ready(self):
        import staking.signals