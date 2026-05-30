/**
 * Users SWR Hooks
 * Custom hooks for fetching and mutating user data with SWR
 */

import useSWR, { KeyedMutator } from 'swr';
import { usersService } from 'api/services';
import { QUERY_KEYS } from 'api/config';
import { User } from 'models/user.model';

/**
 * Users response interface
 */
interface UseUsersResponse {
  users: User[] | undefined;
  isLoading: boolean;
  isError: Error | undefined;
  mutate: KeyedMutator<User[]>;
}

/**
 * User response interface
 */
interface UseUserResponse {
  user: User | undefined;
  isLoading: boolean;
  isError: Error | undefined;
  mutate: KeyedMutator<User>;
}

/**
 * Fetch all users
 */
export function useUsers(): UseUsersResponse {
  const { data, error, isLoading, mutate } = useSWR<User[]>(QUERY_KEYS.USERS.LIST, async () => {
    const response = await usersService.list();
    return response.data || [];
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
 */
export function useUser(id: number | null | undefined): UseUserResponse {
  const { data, error, isLoading, mutate } = useSWR<User>(
    id ? QUERY_KEYS.USERS.DETAIL(id) : null,
    async () => {
      const response = await usersService.getById(id!);
      return response.data!;
    }
  );

  return {
    user: data,
    isLoading,
    isError: error,
    mutate
  };
}
