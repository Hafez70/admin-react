/**
 * Auth Context
 * Global authentication state management
 */

import { createContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { authService } from 'api/services';
import { setAccessToken, setRefreshToken, setUser, getUser, getAccessToken, clearAuth, isTokenExpired } from 'utils/token';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /**
   * Check authentication status
   */
  const checkAuth = useCallback(() => {
    const savedUser = getUser();
    const token = getAccessToken();

    // Check if token exists and is not expired
    if (savedUser && token && !isTokenExpired(token)) {
      setUserState(savedUser);
      setIsAuthenticated(true);
      return true;
    } else {
      // Token is invalid or expired, clear auth
      clearAuth();
      setUserState(null);
      setIsAuthenticated(false);
      return false;
    }
  }, []);

  // Initialize auth state from localStorage and validate token
  useEffect(() => {
    const initAuth = () => {
      checkAuth();
      setIsLoading(false);
    };

    initAuth();
  }, [checkAuth]);

  // Periodically check token validity (every 5 minutes)
  useEffect(() => {
    const interval = setInterval(() => {
      const token = getAccessToken();
      if (token && isTokenExpired(token)) {
        // Token expired, logout user
        clearAuth();
        setUserState(null);
        setIsAuthenticated(false);
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  /**
   * Login user
   * @param {object} credentials - Login credentials
   * @returns {Promise}
   */
  const login = useCallback(async (credentials) => {
    try {
      const response = await authService.login(credentials);

      if (response.success && response.data) {
        const { user: userData, accessToken, refreshToken } = response.data;

        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setUser(userData);

        setUserState(userData);
        setIsAuthenticated(true);

        return { success: true, user: userData };
      }

      throw new Error('Login failed');
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Login failed'
      };
    }
  }, []);

  /**
   * Register user
   * @param {object} userData - Registration data
   * @returns {Promise}
   */
  const register = useCallback(async (userData) => {
    try {
      const response = await authService.register(userData);

      if (response.success && response.data) {
        const { user: newUser, accessToken, refreshToken } = response.data;

        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setUser(newUser);

        setUserState(newUser);
        setIsAuthenticated(true);

        return { success: true, user: newUser };
      }

      throw new Error('Registration failed');
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Registration failed'
      };
    }
  }, []);

  /**
   * Logout user
   * @returns {Promise}
   */
  const logout = useCallback(async () => {
    try {
      if (user?.id) {
        await authService.logout(user.id);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuth();
      setUserState(null);
      setIsAuthenticated(false);
    }
  }, [user]);

  /**
   * Update user data
   * @param {object} updates - User data updates
   */
  const updateUser = useCallback((updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    setUserState(updatedUser);
  }, [user]);

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    checkAuth
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthContext;
