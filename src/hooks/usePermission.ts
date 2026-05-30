/**
 * usePermission Hook
 * Custom hook for checking permissions and roles
 */

import { useMemo } from 'react';
import useAuth from './useAuth';
import {
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  hasRole,
  hasAnyRole,
  isAdmin,
  isSuperAdmin,
  getRoleDisplayName
} from 'utils/permissions';
import { User } from 'models/user.model';
import { Permission, Role } from 'constants/permissions';

/**
 * Permission utilities return interface
 */
export interface PermissionUtils {
  can: (permission: Permission) => boolean;
  canAny: (permissions: Permission[]) => boolean;
  canAll: (permissions: Permission[]) => boolean;
  is: (role: Role) => boolean;
  isAny: (roles: Role[]) => boolean;
  isAdmin: () => boolean;
  isSuperAdmin: () => boolean;
  getRoleName: () => string;
  user: User | null;
  isAuthenticated: boolean;
}

/**
 * Hook to check user permissions and roles
 */
export default function usePermission(): PermissionUtils {
  const { user, isAuthenticated } = useAuth();

  const permissions = useMemo<PermissionUtils>(
    () => ({
      /**
       * Check if user has a specific permission
       */
      can: (permission: Permission): boolean => hasPermission(user, permission),

      /**
       * Check if user has ANY of the permissions
       */
      canAny: (permissions: Permission[]): boolean => hasAnyPermission(user, permissions),

      /**
       * Check if user has ALL of the permissions
       */
      canAll: (permissions: Permission[]): boolean => hasAllPermissions(user, permissions),

      /**
       * Check if user has a specific role
       */
      is: (role: Role): boolean => hasRole(user, role),

      /**
       * Check if user has ANY of the roles
       */
      isAny: (roles: Role[]): boolean => hasAnyRole(user, roles),

      /**
       * Check if user is admin (super_admin or admin)
       */
      isAdmin: (): boolean => isAdmin(user),

      /**
       * Check if user is super admin
       */
      isSuperAdmin: (): boolean => isSuperAdmin(user),

      /**
       * Get role display name (translation key)
       */
      getRoleName: (): string => getRoleDisplayName(user?.role || ''),

      /**
       * Get current user
       */
      user,

      /**
       * Check if user is authenticated
       */
      isAuthenticated
    }),
    [user, isAuthenticated]
  );

  return permissions;
}
