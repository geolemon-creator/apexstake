import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

// Тип для данных, которые мы получаем от сервера в ответ на запрос
interface User {
  id: string;
  username: string;
  avatar: string;
}

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    const authData = localStorage.getItem('auth');
    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      // Проверяем, есть ли токен (например, access_token), чтобы установить состояние
      if (parsedAuthData?.access_token) {
        setIsAuth(true);
      }
    }
  }, []);

  const signIn = async (initData: string): Promise<void> => {
    try {
      const response = await axios.post<AuthResponse>(
        `https://work.lnx-usr.xyz/api/auth/`,
        { initData },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { access_token, refresh_token, user } = response.data;

      // Сохраняем данные в localStorage
      const authData = {
        access_token,
        refresh_token,
        user,
      };
      localStorage.setItem('auth', JSON.stringify(authData));

      // Устанавливаем isAuth в true
      setIsAuth(true);
    } catch (error) {
      console.error('Ошибка аутентификации:', error);
      alert('Ошибка аутентификации');
      setIsAuth(false);
    }
  };

  return { isAuth, signIn };
};

export default useAuth;
