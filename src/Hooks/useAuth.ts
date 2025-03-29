import { useState } from 'react';
import axios from 'axios';

// Тип для данных, которые мы получаем от сервера в ответ на запрос
interface AuthResponse {
  data: boolean;
}

const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const signIn = async (initData: string): Promise<void> => {
    alert(initData);
    try {
      const response = await axios.post<AuthResponse>(
        `https://185.125.103.74/api/auth/`,
        { initData: 'query_id=AAEv2R53AgAAAC_ZHncrYrpL' }
      );
      alert(response.data);
      setIsAuth(response.data.data);
    } catch (error) {
      alert(error);
      console.error('Ошибка аутентификации:', error);
      setIsAuth(false);
    }
  };

  return { isAuth, signIn };
};

export default useAuth;
