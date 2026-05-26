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

/**
 * Hook to check user permissions and roles
 * @returns {object} Permission checking functions
 */
export default function usePermission() {
  const { user, isAuthenticated } = useAuth();

  const permissions = useMemo(
    () => ({
      /**
       * Check if user has a specific permission
       * @param {string} permission - Permission to check
       * @returns {boolean}
       */
      can: (permission) => hasPermission(user, permission),

      /**
       * Check if user has ANY of the permissions
       * @param {string[]} permissions - Array of permissions
       * @returns {boolean}
       */
      canAny: (permissions) => hasAnyPermission(user, permissions),

      /**
       * Check if user has ALL of the permissions
       * @param {string[]} permissions - Array of permissions
       * @returns {boolean}
       */
      canAll: (permissions) => hasAllPermissions(user, permissions),

      /**
       * Check if user has a specific role
       * @param {string} role - Role to check
       * @returns {boolean}
       */
      is: (role) => hasRole(user, role),

      /**
       * Check if user has ANY of the roles
       * @param {string[]} roles - Array of roles
       * @returns {boolean}
       */
      isAny: (roles) => hasAnyRole(user, roles),

      /**
       * Check if user is admin (super_admin or admin)
       * @returns {boolean}
       */
      isAdmin: () => isAdmin(user),

      /**
       * Check if user is super admin
       * @returns {boolean}
       */
      isSuperAdmin: () => isSuperAdmin(user),

      /**
       * Get role display name (translation key)
       * @returns {string}
       */
      getRoleName: () => getRoleDisplayName(user?.role),

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
