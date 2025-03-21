from django.db import transaction
import logging

logger = logging.getLogger(__name__)


def close_user_staking(staking):
    """
    Завершает процесс стейкинга для пользователя.

    Функция выполняет следующие шаги:
    1. Проверяет, находится ли стейкинг в статусе "in_progress". Если нет, выбрасывает ошибку.
    2. Рассчитывает итоговую сумму начисления с учетом процентов.
    3. Начинает транзакцию для атомарных изменений:
       - Уменьшает заблокированный баланс пользователя.
       - Увеличивает баланс пользователя на рассчитанную сумму.
       - Начисляет токены.
       - Повышает уровень пользователя в стейкинге (если возможно).
       - Обновляет статус стейкинга на "completed".
       - Создает запись о награде за стейкинг.
    """
    from .models import UserStakingReward

    print('start logic')
    try:
        # Проверяем статус стейкинга
        if staking.status != 'in_progress':
            print('in progres no')
            raise ValueError(f"Staking is not in progress, current status: {staking.status}")

        # Получаем данные пользователя и стейкинга
        print(staking, 'staking')
        user = staking.user
        amount = staking.amount
        percentage = staking.staking_level.percentage
        result_amount = amount * (1 + percentage / 100)
        
        # Начинаем транзакцию для атомарных операций
        with transaction.atomic():
            user.decrease_blocked_balance(amount)
            user.increase_balance(result_amount)
            user.increase_tokens(amount / 2)

            increase_user_stage(user)

            staking.status = 'completed'
            staking.save()
            user.save()

            UserStakingReward.objects.create(
                amount=result_amount,
                tokens=(amount / 2),
                user_staking=staking
            )
        print(f"Стейкинг успешно завершен для пользователя {user.id}, ID Стейкинга: {staking.id}, Сумма: {amount}, Результат: {result_amount}")
        logger.info(f"Стейкинг успешно завершен для пользователя {user.id}, ID Стейкинга: {staking.id}, Сумма: {amount}, Результат: {result_amount}")
    
    except ValueError as e:
        print(f"Ошибка при завершении стейкинга (ValueError): {str(e)}")
        logger.error(f"Ошибка при завершении стейкинга (ValueError): {str(e)}")
        raise

    except Exception as e:
        print(f"Ошибка при завершении стейкинга (Exception): {str(e)}")
        logger.error(f"Ошибка при завершении стейкинга (Exception): {str(e)}")
        raise

def increase_user_stage(user):
    """
    Повышает уровень стейкинга пользователя, если он еще не достиг максимального.
    """
    from .models import StakingStage

    max_stage = max(dict(StakingStage.STAGE_CHOICES).keys())
    if not user.staking_stage:  
        user.staking_stage = StakingStage.objects.filter(stage=1).first()
    elif user.staking_stage.stage < max_stage:
        next_stage = StakingStage.objects.filter(stage=user.staking_stage.stage + 1).first()
        if next_stage:
            user.staking_stage = next_stage