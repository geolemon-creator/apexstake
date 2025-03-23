import logging
import asyncio
from aiogram import Bot, Dispatcher, types
from aiogram.types import WebAppInfo, InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.filters import Command

API_TOKEN = "7491473745:AAFnW9YSI8fufwI0IJHvwY0wgYcnaWPzSDA"
WEB_APP_URL = "https://38926d8c5511b6.lhr.life"

logging.basicConfig(level=logging.INFO)

bot = Bot(token=API_TOKEN)
dp = Dispatcher()

@dp.message(Command("start"))
async def start(message: types.Message):
    inline_kb = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="Открыть сайт",
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
