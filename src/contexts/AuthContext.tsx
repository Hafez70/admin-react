/**
 * Auth Context
 * Global authentication state management
 */

import { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { authService } from 'api/services';
import { setAccessToken, setRefreshToken, setUser, getUser, getAccessToken, clearAuth, isTokenExpired } from 'utils/token';
import { User } from 'models/user.model';

/**
 * Auth context value interface
 */
export interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; user: User }>;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; user: User }>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  checkAuth: () => boolean;
}

/**
 * Auth provider props
 */
interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /**
   * Check authentication status
   */
  const checkAuth = useCallback((): boolean => {
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
    const initAuth = (): void => {
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
   */
  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; user: User }> => {
    try {
      const response = await authService.login({ email, password });

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
      // Re-throw to let component handle the error
      const errorMessage = (error as { response?: { data?: { message?: string } }; message?: string }).response?.data?.message 
        || (error as Error).message 
        || 'Login failed';
      throw new Error(errorMessage);
    }
  }, []);

  /**
   * Register user
   */
  const register = useCallback(async (email: string, password: string, name: string): Promise<{ success: boolean; user: User }> => {
    try {
      const response = await authService.register({ email, password, name });

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
      // Re-throw to let component handle the error
      const errorMessage = (error as { response?: { data?: { message?: string } }; message?: string }).response?.data?.message 
        || (error as Error).message 
        || 'Registration failed';
      throw new Error(errorMessage);
    }
  }, []);

  /**
   * Logout user
   */
  const logout = useCallback(async (): Promise<void> => {
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
   */
  const updateUser = useCallback((updates: Partial<User>): void => {
    const updatedUser = { ...user, ...updates } as User;
    setUser(updatedUser);
    setUserState(updatedUser);
  }, [user]);

  const value: AuthContextValue = {
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

export default AuthContext;
