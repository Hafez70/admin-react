/**
 * Products Service
 * Handles all product-related API calls
 */

import apiClient from '../client/axios';
import { API_CONFIG, API_ENDPOINTS } from '../config';
import { mockProductsAPI } from '../client/mock';

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  category: number;
}

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
}

const list = async (): Promise<ApiResponse<Product[]>> => {
  if (API_CONFIG.USE_MOCK) {
    return mockProductsAPI.list();
  }
  return await apiClient.get<ApiResponse<Product[]>>(API_ENDPOINTS.PRODUCTS.LIST);
};

const getById = async (id: number | string): Promise<ApiResponse<Product>> => {
  if (API_CONFIG.USE_MOCK) {
    return mockProductsAPI.getById(id);
  }
  return await apiClient.get<ApiResponse<Product>>(API_ENDPOINTS.PRODUCTS.DETAIL(Number(id)));
};

const getBySlug = async (slug: string): Promise<ApiResponse<Product>> => {
  if (API_CONFIG.USE_MOCK) {
    return mockProductsAPI.getBySlug(slug);
  }
  return await apiClient.get<ApiResponse<Product>>(API_ENDPOINTS.PRODUCTS.BY_SLUG(slug));
};

const create = async (productData: Partial<Product>): Promise<ApiResponse<Product>> => {
  if (API_CONFIG.USE_MOCK) {
    return mockProductsAPI.create(productData);
  }
  return await apiClient.post<ApiResponse<Product>>(API_ENDPOINTS.PRODUCTS.CREATE, productData);
};

const update = async (id: number | string, productData: Partial<Product>): Promise<ApiResponse<Product>> => {
  if (API_CONFIG.USE_MOCK) {
    return mockProductsAPI.update(id, productData);
  }
  return await apiClient.put<ApiResponse<Product>>(API_ENDPOINTS.PRODUCTS.UPDATE(Number(id)), productData);
};

const remove = async (id: number | string): Promise<ApiResponse> => {
  if (API_CONFIG.USE_MOCK) {
    return mockProductsAPI.delete(id);
  }
  return await apiClient.delete<ApiResponse>(API_ENDPOINTS.PRODUCTS.DELETE(Number(id)));
};

const productsService = {
  list,
  getById,
  getBySlug,
  create,
  update,
  delete: remove
};

export default productsService;
