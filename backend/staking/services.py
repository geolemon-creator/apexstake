from django.db import transaction
from django.utils import timezone
from decimal import Decimal
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

    try:
        # Проверяем статус стейкинга
        if staking.status != 'in_progress':
            raise ValueError(f"Staking is not in progress, current status: {staking.status}")

        # Получаем данные пользователя и стейкинга
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

def calculate_staking_balance(user_staking):
    # PROD: days_staked = (timezone.now() - user_staking.start_date).days
    # TEST: 
    delta = timezone.now() - user_staking.start_date
    days_staked = delta.total_seconds() / 60

    daily_percentage = Decimal(user_staking.staking_level.percentage) / Decimal('100')

    if days_staked > user_staking.staking_level.stage.days_for_change:
        profit = user_staking.amount * daily_percentage * Decimal(days_staked)

        profit_after_deduction = profit * Decimal('0.75')
        
        new_amount = user_staking.amount + profit_after_deduction

        return Decimal(new_amount)

    return Decimal(user_staking.amount)

def change_staking_level(user, amount, level):
    from .models import StakingLevel, UserStaking

    current_staking = UserStaking.objects.select_for_update().filter(user=user, status='in_progress').first()

    if not current_staking:
        raise ValueError("У пользователя нет открытых стейкингов")

    if current_staking.staking_level.level >= level:
        raise ValueError("Уровень стейкинга должен быть выше текущео")

    try:
        new_level = StakingLevel.objects.get(level=level)
    except StakingLevel.DoesNotExist:
        raise ValueError("Уровень не найден")

    if not new_level.min_deposite <= amount <= new_level.max_deposite:
        raise ValueError(
            f"Сумма должна быть между {new_level.min_deposite} и {new_level.max_deposite}"
        )

    with transaction.atomic():
        staking_balance = calculate_staking_balance(current_staking)
        total_available = user.balance + staking_balance

        if total_available < amount:
            raise ValueError("Не достаточно средств на балансе")

        remainder = amount - staking_balance
        if remainder > 0:
            user.decrease_balance(remainder)

        current_staking.amount = amount
        current_staking.staking_level = new_level
        current_staking.start_date = timezone.now()
        current_staking.end_date = timezone.now() + timezone.timedelta(minutes=new_level.stage.staking_time)
        current_staking.save()

        user.blocked_balance = amount
        user.save()

        return "Уровень стейкинга успешно обновлен"