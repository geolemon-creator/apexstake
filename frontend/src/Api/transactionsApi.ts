import {
  CreateTransactionRequest,
  TransactionFitrersRequest,
} from '../Components/Type';
import apiClient from './axiosInstance';

export const transactionsApi = {
  createTransaction: async (data: CreateTransactionRequest) => {
    const response = await apiClient.post('/create-transaction/', data);
    return response.data;
  },
  getTransactions: async (filters: TransactionFitrersRequest) => {
    const response = await apiClient.get('/transactions/', {
      params: filters,
    });
    return response.data;
  },
};
