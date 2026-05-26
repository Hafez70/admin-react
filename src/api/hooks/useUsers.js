/**
 * Users SWR Hooks
 * Custom hooks for fetching and mutating user data with SWR
 */

import useSWR from 'swr';
import { usersService } from 'api/services';
import { QUERY_KEYS } from 'api/config';

/**
 * Fetch all users
 * @returns {object} SWR response with users data
 */
export function useUsers() {
  const { data, error, isLoading, mutate } = useSWR(QUERY_KEYS.USERS.LIST, async () => {
    const response = await usersService.list();
    return response.data;
  });

  return {
    users: data,
    isLoading,
    isError: error,
    mutate
  };
}

/**
 * Fetch single user by ID
 * @param {number} id - User ID
 * @returns {object} SWR response with user data
 */
export function useUser(id) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? QUERY_KEYS.USERS.DETAIL(id) : null,
    async () => {
      const response = await usersService.getById(id);
      return response.data;
    }
  );

  return {
    user: data,
    isLoading,
    isError: error,
    mutate
  };
}

/**
 * Create new user
 * @param {Function} mutate - SWR mutate function to update cache
 * @returns {Function} Create user function
 */
export function useCreateUser(mutate) {
  return async (userData) => {
    try {
      const response = await usersService.create(userData);
      if (mutate) {
        mutate(); // Revalidate users list
      }
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
}

/**
 * Activate user
 * @param {Function} mutate - SWR mutate function to update cache
 * @returns {Function} Activate user function
 */
export function useActivateUser(mutate) {
  return async (id) => {
    try {
      const response = await usersService.activate(id);
      if (mutate) {
        mutate(); // Revalidate users list
      }
      return { success: true, message: response.message };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
}

/**
 * Deactivate user
 * @param {Function} mutate - SWR mutate function to update cache
 * @returns {Function} Deactivate user function
 */
export function useDeactivateUser(mutate) {
  return async (id) => {
    try {
      const response = await usersService.deactivate(id);
      if (mutate) {
        mutate(); // Revalidate users list
      }
      return { success: true, message: response.message };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
}

/**
 * Change user password
 * @returns {Function} Change password function
 */
export function useChangePassword() {
  return async (id, passwords) => {
    try {
      const response = await usersService.changePassword(id, passwords);
      return { success: true, message: response.message };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
}
