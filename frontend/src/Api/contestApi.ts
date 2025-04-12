import apiClient from './axiosInstance'; // Импортируем apiClient

export const contestApi = {
  getContests: async () => {
    const response = await apiClient.get('/contests/');
    return response.data;
  },
  getContestDetails: async (contest_id: Number) => {
    const response = await apiClient.get(`/contest/${contest_id}/`);
    return response.data;
  },
  enterContest: async (contest_id: Number) => {
    const response = await apiClient.post(`/enter-contest/${contest_id}/`);
    return response.data;
  },
};
