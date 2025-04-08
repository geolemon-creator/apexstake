import apiClient from './axiosInstance'; // Импортируем apiClient

export const competitionsApi = {
  getCompetitions: async () => {
    const response = await apiClient.get('/competitions/');
    return response.data;
  },
};
