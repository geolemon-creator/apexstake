import apiClient from './axiosInstance'; // Импортируем apiClient
import { Task } from '../Components/Type';

export const tasksApi = {
  getTasksList: async (): Promise<Task[]> => {
    const response = await apiClient.get<Task[]>('/tasks/list/');
    return response.data;
  },
  completeTask: async (id: number) => {
    const response = await apiClient.post(`/tasks/complete/${id}/`);
    return response.data;
  },
};
