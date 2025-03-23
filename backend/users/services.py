import json
import hmac
import hashlib
import urllib.parse
from django.conf import settings


def validate_telegram_init_data(init_data: str) -> dict:
    """
    Проверяет подпись initData и возвращает данные пользователя.
    """
    try:
        data_parts = dict(urllib.parse.parse_qsl(init_data))
        hash_received = data_parts.pop("hash", "")

        # Сортируем параметры по алфавиту и собираем строку данных
        data_check_string = "\n".join(f"{k}={v}" for k, v in sorted(data_parts.items()))

        secret_key = hashlib.sha256(settings.TELEGRAM_BOT_TOKEN.encode()).digest()
        expected_hash = hmac.new(secret_key, data_check_string.encode(), hashlib.sha256).hexdigest()

        if expected_hash != hash_received:
            return None  # Неверная подпись

        return json.loads(data_parts["user"]) if "user" in data_parts else None

    except Exception as e:
        print(f"Ошибка верификации initData: {e}")
        return None

