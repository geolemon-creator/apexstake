import apiClient from './axiosInstance'; // Импортируем apiClient
import {
  GetInvitedUsersResponse,
  LeadersListResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from '../Components/Type';

export const usersApi = {
  getInvitedUsers: async (): Promise<GetInvitedUsersResponse> => {
    const response = await apiClient.get<GetInvitedUsersResponse>(
      '/invited-users/'
    );
    return response.data;
  },
  getLeadersList: async (): Promise<LeadersListResponse> => {
    const response = await apiClient.get<LeadersListResponse>('/leaders/');
    return response.data;
  },
  updateUser: async (
    id: string,
    data: UpdateUserRequest
  ): Promise<UpdateUserResponse> => {
    const response = await apiClient.patch(`/users/${id}/`, data);
    return response.data;
  },
};
