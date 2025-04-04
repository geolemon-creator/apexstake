import {
  CreateTransactionRequest,
  CreateTransactionResponse,
} from '../Components/Type';
import apiClient from './axiosInstance';

export const transactionsApi = {
  createTransaction: async (
    data: CreateTransactionRequest
  ): Promise<CreateTransactionResponse> => {
    const response = await apiClient.post('/create-transaction/', data);
    return response.data;
  },
};
