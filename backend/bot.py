import logging
import requests
import asyncio
from aiogram import Bot, Dispatcher, types
from aiogram.types import WebAppInfo, InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.filters import Command

API_TOKEN = "7787369340:AAFJUOZYNKvI8k5sIxwNV411Yd4IB97Qe3k"
WEB_APP_URL = "https://adminbottle.ru" #"https://work.lnx-usr.xyz/"
BACKEND_URL = "https://api.adminbottle.ru/api"
API_URL = "https://api.adminbottle.ru/api/register/"

logging.basicConfig(level=logging.INFO)

bot = Bot(token=API_TOKEN)
dp = Dispatcher()

@dp.message(Command("start"))
async def start(message: types.Message):
    user_id = message.from_user.id
    username = message.from_user.username

    # Разбираем аргумент реферального кода (если есть)
    args = message.text.split(" ")
    referral_code = args[1] if len(args) > 1 else None

    # Получаем аватарку пользователя
    profile_pictures = await bot.get_user_profile_photos(user_id)
    photo_id = profile_pictures.photos[0][0].file_id if profile_pictures.photos else None

    photo_url = f"https://api.telegram.org/file/bot{API_TOKEN}/{(await bot.get_file(photo_id)).file_path}" if photo_id else None

    data = {
        "referral_code": referral_code, 
        "telegram_id": user_id, 
        "username": username, 
        "avatar": photo_url
    }
    
    try:
        response = requests.post(API_URL, json=data)
        if response.status_code == 201:
            print("User successfully registered.")
        else:
            print(response.text)
            print("Error registering user.")
    except requests.exceptions.RequestException as e:
        print(f"Error during API request: {e}")

    inline_kb = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="Открыть сайт BottleGame",
                    web_app=WebAppInfo(url=WEB_APP_URL)  # Указываем URL Mini App
                )
            ]
        ]
    )
    await message.answer("Нажмите кнопку ниже, чтобы открыть сайт:", reply_markup=inline_kb)

async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
