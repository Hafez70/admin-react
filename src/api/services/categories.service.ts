/**
 * Categories Service
 * Handles all category-related API calls
 */

import apiClient from '../client/axios';
import { API_CONFIG, API_ENDPOINTS } from '../config';
import { mockCategoriesAPI } from '../client/mock';

interface Category {
  id: number;
  name: string;
  slug: string;
  parent: number | null;
}

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
}

const list = async (): Promise<ApiResponse<Category[]>> => {
  if (API_CONFIG.USE_MOCK) {
    return mockCategoriesAPI.list();
  }
  const response = await apiClient.get<ApiResponse<Category[]>>(API_ENDPOINTS.CATEGORIES.LIST);
  return response as ApiResponse<Category[]>;
};

const tree = async (): Promise<ApiResponse<Category[]>> => {
  if (API_CONFIG.USE_MOCK) {
    return mockCategoriesAPI.tree();
  }
  const response = await apiClient.get<ApiResponse<Category[]>>(API_ENDPOINTS.CATEGORIES.TREE);
  return response as ApiResponse<Category[]>;
};

const getById = async (id: number | string): Promise<ApiResponse<Category>> => {
  if (API_CONFIG.USE_MOCK) {
    return mockCategoriesAPI.getById(id);
  }
  const response = await apiClient.get<ApiResponse<Category>>(API_ENDPOINTS.CATEGORIES.DETAIL(Number(id)));
  return response as ApiResponse<Category>;
};

const create = async (categoryData: Partial<Category>): Promise<ApiResponse<Category>> => {
  if (API_CONFIG.USE_MOCK) {
    return mockCategoriesAPI.create(categoryData);
  }
  const response = await apiClient.post<ApiResponse<Category>>(API_ENDPOINTS.CATEGORIES.CREATE, categoryData);
  return response as ApiResponse<Category>;
};

const update = async (id: number | string, categoryData: Partial<Category>): Promise<ApiResponse<Category>> => {
  if (API_CONFIG.USE_MOCK) {
    return mockCategoriesAPI.update(id, categoryData);
  }
  const response = await apiClient.put<ApiResponse<Category>>(API_ENDPOINTS.CATEGORIES.UPDATE(Number(id)), categoryData);
  return response as ApiResponse<Category>;
};

const remove = async (id: number | string): Promise<ApiResponse> => {
  if (API_CONFIG.USE_MOCK) {
    return mockCategoriesAPI.delete(id);
  }
  const response = await apiClient.delete<ApiResponse>(API_ENDPOINTS.CATEGORIES.DELETE(Number(id)));
  return response as ApiResponse;
};

const categoriesService = {
  list,
  tree,
  getById,
  create,
  update,
  delete: remove
};

export default categoriesService;
