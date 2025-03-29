import { useState } from 'react';
import axios from 'axios';
import { parseInitData } from '../Utils/parseInitData';

// Тип для данных, которые мы получаем от сервера в ответ на запрос
interface AuthResponse {
  data: boolean;
}

const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const signIn = async (initData: string): Promise<void> => {
    try {
      // Отправляем initData как есть
      const response = await axios.post<AuthResponse>(
        `http://127.0.0.1:8000/api/auth/`,
        { initData }, // передаем строку как есть
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setIsAuth(response.data.data); // предполагаем, что ответ содержит статус авторизации
    } catch (error) {
      console.error('Ошибка аутентификации:', error);
      alert(error);
      setIsAuth(false);
    }
  };

  return { isAuth, signIn };
};

export default useAuth;
