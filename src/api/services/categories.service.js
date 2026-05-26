/**
 * Categories Service
 * Handles all category-related API calls
 */

import apiClient from '../client/axios';
import { API_CONFIG, API_ENDPOINTS } from '../config';
import { mockCategoriesAPI } from '../client/mock';

/**
 * Get all categories
 * @returns {Promise<Array>} List of categories
 */
const list = async () => {
  if (API_CONFIG.USE_MOCK) {
    return mockCategoriesAPI.list();
  }

  const response = await apiClient.get(API_ENDPOINTS.CATEGORIES.LIST);
  return response;
};

/**
 * Get categories tree
 * @returns {Promise<Array>} Tree structure of categories
 */
const tree = async () => {
  if (API_CONFIG.USE_MOCK) {
    return mockCategoriesAPI.tree();
  }

  const response = await apiClient.get(API_ENDPOINTS.CATEGORIES.TREE);
  return response;
};

/**
 * Get category by ID
 * @param {number} id - Category ID
 * @returns {Promise<object>} Category data
 */
const getById = async (id) => {
  if (API_CONFIG.USE_MOCK) {
    return mockCategoriesAPI.getById(id);
  }

  const response = await apiClient.get(API_ENDPOINTS.CATEGORIES.DETAIL(id));
  return response;
};

/**
 * Create new category
 * @param {object} categoryData - Category data
 * @returns {Promise<object>} Created category
 */
const create = async (categoryData) => {
  if (API_CONFIG.USE_MOCK) {
    return mockCategoriesAPI.create(categoryData);
  }

  const response = await apiClient.post(API_ENDPOINTS.CATEGORIES.CREATE, categoryData);
  return response;
};

/**
 * Update category
 * @param {number} id - Category ID
 * @param {object} categoryData - Updated category data
 * @returns {Promise<object>} Updated category
 */
const update = async (id, categoryData) => {
  if (API_CONFIG.USE_MOCK) {
    return mockCategoriesAPI.update(id, categoryData);
  }

  const response = await apiClient.put(API_ENDPOINTS.CATEGORIES.UPDATE(id), categoryData);
  return response;
};

/**
 * Delete category
 * @param {number} id - Category ID
 * @returns {Promise<object>} Success message
 */
const remove = async (id) => {
  if (API_CONFIG.USE_MOCK) {
    return mockCategoriesAPI.delete(id);
  }

  const response = await apiClient.delete(API_ENDPOINTS.CATEGORIES.DELETE(id));
  return response;
};

const categoriesService = {
  list,
  tree,
  getById,
  create,
  update,
  remove
};

export default categoriesService;
