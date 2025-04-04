import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      // Если токен существует, добавляем его в заголовки Authorization
      config.headers.Authorization = `Bearer ${JSON.parse(accessToken)}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Запрос на обновление токена
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const parsedToken = JSON.parse(refreshToken);
          const refreshResponse = await axios.post(
            `${API_BASE_URL}/jwt/refresh/`,
            {
              refresh: parsedToken,
            }
          );
          const newToken = refreshResponse.data.access_token;
          localStorage.setItem('access_token', newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        console.error('Ошибка обновления токена', refreshError);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        // alert('Ошибка обновления токена');
        // alert(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
