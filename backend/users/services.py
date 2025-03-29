import json
import hmac
import hashlib
import urllib.parse
from django.conf import settings
from urllib.parse import unquote 


def validate_telegram_init_data(init_data: str, bot_token: str = settings.TELEGRAM_BOT_TOKEN):
    """
    Проверяет подпись initData и возвращает данные пользователя, если всё верно.
    """
    try:
        # Разбираем строку в словарь
        vals = dict(urllib.parse.parse_qsl(init_data))

        # Извлекаем hash из данных
        received_hash = vals.pop("hash", "")

        # Сортируем оставшиеся параметры и собираем data_check_string
        data_check_string = "\n".join(f"{k}={v}" for k, v in sorted(vals.items()))

        # Создаём секретный ключ (Telegram требует ключ в формате HMAC-SHA256)
        secret_key = hmac.new(b"WebAppData", bot_token.encode(), hashlib.sha256).digest()

        # Вычисляем ожидаемый hash
        expected_hash = hmac.new(secret_key, data_check_string.encode(), hashlib.sha256).hexdigest()

        # Сравниваем hash'и
        if expected_hash != received_hash:
            print("Ошибка: Хэши не совпадают")
            return None  # Неверная подпись

        # Возвращаем данные пользователя (если есть)
        return json.loads(vals["user"]) if "user" in vals else None

    except Exception as e:
        print(f"Ошибка верификации initData: {e}")
        return None