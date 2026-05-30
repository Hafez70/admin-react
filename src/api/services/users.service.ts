/**
 * Users Service
 * Handles all user-related API calls
 */

import apiClient from '../client/axios';
import { API_CONFIG, API_ENDPOINTS } from '../config';
import { mockUsersAPI } from '../client/mock';
import { User, CreateUserDTO } from 'models/user.model';

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
}

const list = async (): Promise<ApiResponse<User[]>> => {
  if (API_CONFIG.USE_MOCK) {
    return mockUsersAPI.list();
  }
  const response = await apiClient.get<ApiResponse<User[]>>(API_ENDPOINTS.USERS.LIST);
  return response as ApiResponse<User[]>;
};

const getById = async (id: number | string): Promise<ApiResponse<User>> => {
  if (API_CONFIG.USE_MOCK) {
    return mockUsersAPI.getById(id);
  }
  const response = await apiClient.get<ApiResponse<User>>(API_ENDPOINTS.USERS.DETAIL(Number(id)));
  return response as ApiResponse<User>;
};

const create = async (userData: Partial<CreateUserDTO>): Promise<ApiResponse<User>> => {
  if (API_CONFIG.USE_MOCK) {
    return mockUsersAPI.create(userData);
  }
  const response = await apiClient.post<ApiResponse<User>>(API_ENDPOINTS.USERS.CREATE, userData);
  return response as ApiResponse<User>;
};

const activate = async (id: number | string): Promise<ApiResponse> => {
  if (API_CONFIG.USE_MOCK) {
    return mockUsersAPI.activate(id);
  }
  const response = await apiClient.post<ApiResponse>(API_ENDPOINTS.USERS.ACTIVATE(Number(id)));
  return response as ApiResponse;
};

const deactivate = async (id: number | string): Promise<ApiResponse> => {
  if (API_CONFIG.USE_MOCK) {
    return mockUsersAPI.deactivate(id);
  }
  const response = await apiClient.post<ApiResponse>(API_ENDPOINTS.USERS.DEACTIVATE(Number(id)));
  return response as ApiResponse;
};

const changePassword = async (id: number | string, passwords: { newPassword: string }): Promise<ApiResponse> => {
  if (API_CONFIG.USE_MOCK) {
    return mockUsersAPI.changePassword(id, passwords);
  }
  const response = await apiClient.post<ApiResponse>(API_ENDPOINTS.USERS.CHANGE_PASSWORD(Number(id)), passwords);
  return response as ApiResponse;
};

const usersService = {
  list,
  getById,
  create,
  activate,
  deactivate,
  changePassword
};

export default usersService;
