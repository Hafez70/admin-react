/**
 * Products Service
 * Handles all product-related API calls
 */

import apiClient from '../client/axios';
import { API_CONFIG, API_ENDPOINTS } from '../config';
import { mockProductsAPI } from '../client/mock';

/**
 * Get all products
 * @returns {Promise<Array>} List of products
 */
const list = async () => {
  if (API_CONFIG.USE_MOCK) {
    return mockProductsAPI.list();
  }

  const response = await apiClient.get(API_ENDPOINTS.PRODUCTS.LIST);
  return response;
};

/**
 * Get product by ID
 * @param {number} id - Product ID
 * @returns {Promise<object>} Product data
 */
const getById = async (id) => {
  if (API_CONFIG.USE_MOCK) {
    return mockProductsAPI.getById(id);
  }

  const response = await apiClient.get(API_ENDPOINTS.PRODUCTS.DETAIL(id));
  return response;
};

/**
 * Get product by slug
 * @param {string} slug - Product slug
 * @returns {Promise<object>} Product data
 */
const getBySlug = async (slug) => {
  if (API_CONFIG.USE_MOCK) {
    return mockProductsAPI.getBySlug(slug);
  }

  const response = await apiClient.get(API_ENDPOINTS.PRODUCTS.BY_SLUG(slug));
  return response;
};

/**
 * Create new product
 * @param {object} productData - Product data
 * @returns {Promise<object>} Created product
 */
const create = async (productData) => {
  if (API_CONFIG.USE_MOCK) {
    return mockProductsAPI.create(productData);
  }

  const response = await apiClient.post(API_ENDPOINTS.PRODUCTS.CREATE, productData);
  return response;
};

/**
 * Update product
 * @param {number} id - Product ID
 * @param {object} productData - Updated product data
 * @returns {Promise<object>} Updated product
 */
const update = async (id, productData) => {
  if (API_CONFIG.USE_MOCK) {
    return mockProductsAPI.update(id, productData);
  }

  const response = await apiClient.put(API_ENDPOINTS.PRODUCTS.UPDATE(id), productData);
  return response;
};

/**
 * Delete product
 * @param {number} id - Product ID
 * @returns {Promise<object>} Success message
 */
const remove = async (id) => {
  if (API_CONFIG.USE_MOCK) {
    return mockProductsAPI.delete(id);
  }

  const response = await apiClient.delete(API_ENDPOINTS.PRODUCTS.DELETE(id));
  return response;
};

const productsService = {
  list,
  getById,
  getBySlug,
  create,
  update,
  remove
};

export default productsService;
