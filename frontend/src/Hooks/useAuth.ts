import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import apiClient from '../Api/axiosInstance';

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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
        `${API_BASE_URL}/auth/`,
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
      localStorage.setItem(
        'access_token',
        JSON.stringify(authData.access_token)
      );
      localStorage.setItem(
        'refresh_token',
        JSON.stringify(authData.refresh_token)
      );
      localStorage.setItem('user', JSON.stringify(authData.user));

      // Устанавливаем isAuth в true
      setIsAuth(true);
    } catch (error) {
      console.error('Ошибка аутентификации:', error);
      // alert('Ошибка аутентификации');
      // alert(error);
      setIsAuth(false);
    }
  };

  const updateUser = (userId: number) => {
    apiClient
      .get(`users/${userId}`)
      .then((response) => {
        console.log(response.data, 'user info');
        localStorage.setItem('user', JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error('Ошибка обновления пользователя:', error);
      });
  };

  return { isAuth, signIn, updateUser };
};

export default useAuth;
