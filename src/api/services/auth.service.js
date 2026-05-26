/**
 * Auth Service
 * Handles all authentication-related API calls
 */

import apiClient from '../client/axios';
import { API_CONFIG, API_ENDPOINTS } from '../config';
import { mockAuthAPI } from '../client/mock';

/**
 * Login user
 * @param {object} credentials - Login credentials
 * @param {string} credentials.email - User email
 * @param {string} credentials.password - User password
 * @returns {Promise<object>} User data and tokens
 */
const login = async (credentials) => {
  if (API_CONFIG.USE_MOCK) {
    return mockAuthAPI.login(credentials);
  }

  const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  return response;
};

/**
 * Register new user
 * @param {object} userData - Registration data
 * @param {string} userData.email - User email
 * @param {string} userData.password - User password
 * @param {string} userData.name - User name
 * @returns {Promise<object>} User data and tokens
 */
const register = async (userData) => {
  if (API_CONFIG.USE_MOCK) {
    return mockAuthAPI.register(userData);
  }

  const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
  return response;
};

/**
 * Refresh access token
 * @param {string} refreshToken - Refresh token
 * @returns {Promise<object>} New access token
 */
const refresh = async (refreshToken) => {
  if (API_CONFIG.USE_MOCK) {
    return mockAuthAPI.refresh(refreshToken);
  }

  const response = await apiClient.post(API_ENDPOINTS.AUTH.REFRESH, { refreshToken });
  return response;
};

/**
 * Logout user
 * @param {number} userId - User ID
 * @returns {Promise<object>} Logout confirmation
 */
const logout = async (userId) => {
  if (API_CONFIG.USE_MOCK) {
    return mockAuthAPI.logout();
  }

  const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT(userId));
  return response;
};

const authService = {
  login,
  register,
  refresh,
  logout
};

export default authService;
