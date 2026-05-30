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
  return await apiClient.get<ApiResponse<Category[]>>(API_ENDPOINTS.CATEGORIES.LIST);
};

const tree = async (): Promise<ApiResponse<Category[]>> => {
  if (API_CONFIG.USE_MOCK) {
    return mockCategoriesAPI.tree();
  }
  return await apiClient.get<ApiResponse<Category[]>>(API_ENDPOINTS.CATEGORIES.TREE);
};

const getById = async (id: number | string): Promise<ApiResponse<Category>> => {
  if (API_CONFIG.USE_MOCK) {
    return mockCategoriesAPI.getById(id);
  }
  return await apiClient.get<ApiResponse<Category>>(API_ENDPOINTS.CATEGORIES.DETAIL(Number(id)));
};

const create = async (categoryData: Partial<Category>): Promise<ApiResponse<Category>> => {
  if (API_CONFIG.USE_MOCK) {
    return mockCategoriesAPI.create(categoryData);
  }
  return await apiClient.post<ApiResponse<Category>>(API_ENDPOINTS.CATEGORIES.CREATE, categoryData);
};

const update = async (id: number | string, categoryData: Partial<Category>): Promise<ApiResponse<Category>> => {
  if (API_CONFIG.USE_MOCK) {
    return mockCategoriesAPI.update(id, categoryData);
  }
  return await apiClient.put<ApiResponse<Category>>(API_ENDPOINTS.CATEGORIES.UPDATE(Number(id)), categoryData);
};

const remove = async (id: number | string): Promise<ApiResponse> => {
  if (API_CONFIG.USE_MOCK) {
    return mockCategoriesAPI.delete(id);
  }
  return await apiClient.delete<ApiResponse>(API_ENDPOINTS.CATEGORIES.DELETE(Number(id)));
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
