import time
import random
import string


def generate_referral_code():
    """
    Генерирует реферальный код из 8 случайных больших английских букв.
    """
    return ''.join(random.choices(string.ascii_uppercase, k=8))


def generate_custom_id():
    """
    Создает случайный UID длинной 13 символов
    """
    return str(int(time.time() * 1000))