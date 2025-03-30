import apiClient from './axiosInstance'; // Импортируем apiClient
import { LevelData } from '../Components/Type';

export const levelsApi = {
  getLevelsList: async (): Promise<LevelData[]> => {
    const response = await apiClient.get<LevelData[]>('/staking/levels/');
    return response.data;
  },
  getLevelDetails: async (levelId: number): Promise<LevelData> => {
    const response = await apiClient.get<LevelData>(
      `/staking/details/${levelId}`
    );
    return response.data;
  },
};

export const stakingApi = {
  openStaking: async (amount: number, staking_level: number) => {
    const response = await apiClient.post('/staking/open/', {
      amount: amount,
      staking_level: staking_level,
    });
    return response.data;
  },
  getStakingMe: async () => {
    const response = await apiClient.get(`/staking/me/`);
    return response.data;
  },
};
