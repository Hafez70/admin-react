/**
 * Users Service
 * Handles all user-related API calls
 */

import apiClient from '../client/axios';
import { API_CONFIG, API_ENDPOINTS } from '../config';
import { mockUsersAPI } from '../client/mock';

/**
 * Get all users
 * @returns {Promise<Array>} List of users
 */
const list = async () => {
  if (API_CONFIG.USE_MOCK) {
    return mockUsersAPI.list();
  }

  const response = await apiClient.get(API_ENDPOINTS.USERS.LIST);
  return response;
};

/**
 * Get user by ID
 * @param {number} id - User ID
 * @returns {Promise<object>} User data
 */
const getById = async (id) => {
  if (API_CONFIG.USE_MOCK) {
    return mockUsersAPI.getById(id);
  }

  const response = await apiClient.get(API_ENDPOINTS.USERS.DETAIL(id));
  return response;
};

/**
 * Create new user
 * @param {object} userData - User data
 * @returns {Promise<object>} Created user
 */
const create = async (userData) => {
  if (API_CONFIG.USE_MOCK) {
    return mockUsersAPI.create(userData);
  }

  const response = await apiClient.post(API_ENDPOINTS.USERS.CREATE, userData);
  return response;
};

/**
 * Activate user
 * @param {number} id - User ID
 * @returns {Promise<object>} Success message
 */
const activate = async (id) => {
  if (API_CONFIG.USE_MOCK) {
    return mockUsersAPI.activate(id);
  }

  const response = await apiClient.put(API_ENDPOINTS.USERS.ACTIVATE(id));
  return response;
};

/**
 * Deactivate user
 * @param {number} id - User ID
 * @returns {Promise<object>} Success message
 */
const deactivate = async (id) => {
  if (API_CONFIG.USE_MOCK) {
    return mockUsersAPI.deactivate(id);
  }

  const response = await apiClient.put(API_ENDPOINTS.USERS.DEACTIVATE(id));
  return response;
};

/**
 * Change user password
 * @param {number} id - User ID
 * @param {object} passwords - Password data
 * @param {string} passwords.oldPassword - Current password
 * @param {string} passwords.newPassword - New password
 * @returns {Promise<object>} Success message
 */
const changePassword = async (id, passwords) => {
  if (API_CONFIG.USE_MOCK) {
    return mockUsersAPI.changePassword(id, passwords);
  }

  const response = await apiClient.put(API_ENDPOINTS.USERS.CHANGE_PASSWORD(id), passwords);
  return response;
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
