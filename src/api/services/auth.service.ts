/**
 * Auth Service
 * Handles all authentication-related API calls
 */

import apiClient from '../client/axios';
import { API_CONFIG, API_ENDPOINTS } from '../config';
import { mockAuthAPI } from '../client/mock';
import { User } from 'models/user.model';

/**
 * Login credentials interface
 */
interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Registration data interface
 */
interface RegisterData {
  email: string;
  password: string;
  name: string;
}

/**
 * Auth response interface
 */
interface AuthResponse {
  success: boolean;
  data?: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
  message?: string;
}

/**
 * Refresh token response interface
 */
interface RefreshResponse {
  success: boolean;
  data?: {
    accessToken: string;
  };
  message?: string;
}

/**
 * Logout response interface
 */
interface LogoutResponse {
  success: boolean;
  message?: string;
}

/**
 * Login user
 */
const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  if (API_CONFIG.USE_MOCK) {
    return mockAuthAPI.login(credentials);
  }

  const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
  return response as AuthResponse;
};

/**
 * Register new user
 */
const register = async (userData: RegisterData): Promise<AuthResponse> => {
  if (API_CONFIG.USE_MOCK) {
    return mockAuthAPI.register(userData);
  }

  const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, userData);
  return response as AuthResponse;
};

/**
 * Refresh access token
 */
const refresh = async (refreshToken: string): Promise<RefreshResponse> => {
  if (API_CONFIG.USE_MOCK) {
    return mockAuthAPI.refresh(refreshToken);
  }

  const response = await apiClient.post<RefreshResponse>(API_ENDPOINTS.AUTH.REFRESH, { refreshToken });
  return response as RefreshResponse;
};

/**
 * Logout user
 */
const logout = async (userId: number): Promise<LogoutResponse> => {
  if (API_CONFIG.USE_MOCK) {
    return mockAuthAPI.logout();
  }

  const response = await apiClient.post<LogoutResponse>(API_ENDPOINTS.AUTH.LOGOUT(userId));
  return response as LogoutResponse;
};

const authService = {
  login,
  register,
  refresh,
  logout
};

export default authService;
