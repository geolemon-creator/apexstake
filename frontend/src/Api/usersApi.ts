import apiClient from './axiosInstance'; // Импортируем apiClient
import { GetInvitedUsersResponse } from '../Components/Type';

export const usersApi = {
  getInvitedUsers: async (): Promise<GetInvitedUsersResponse> => {
    const response = await apiClient.get<GetInvitedUsersResponse>(
      '/invited-users/'
    );
    return response.data;
  },
};
