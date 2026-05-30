/**
 * Permission Utility Functions
 * Helper functions to check user permissions and roles
 */

import { ROLES, PERMISSIONS, Role, Permission } from 'constants/permissions';
import { User } from 'models/user.model';

/**
 * Check if user has a specific permission
 */
export const hasPermission = (user: User | null | undefined, permission: Permission): boolean => {
  if (!user) return false;

  // Super admin has all permissions
  if (user.role === ROLES.SUPER_ADMIN) return true;

  // Check if user has 'all' permission
  if (user.permissions?.includes(PERMISSIONS.ALL)) return true;

  // Check specific permission
  return user.permissions?.includes(permission) || false;
};

/**
 * Check if user has ANY of the specified permissions
 */
export const hasAnyPermission = (user: User | null | undefined, permissions: Permission[]): boolean => {
  if (!user || !permissions || permissions.length === 0) return false;
  return permissions.some((permission) => hasPermission(user, permission));
};

/**
 * Check if user has ALL of the specified permissions
 */
export const hasAllPermissions = (user: User | null | undefined, permissions: Permission[]): boolean => {
  if (!user || !permissions || permissions.length === 0) return false;
  return permissions.every((permission) => hasPermission(user, permission));
};

/**
 * Check if user has a specific role
 */
export const hasRole = (user: User | null | undefined, role: Role): boolean => {
  if (!user) return false;
  return user.role === role;
};

/**
 * Check if user has ANY of the specified roles
 */
export const hasAnyRole = (user: User | null | undefined, roles: Role[]): boolean => {
  if (!user || !roles || roles.length === 0) return false;
  return roles.includes(user.role as Role);
};

/**
 * Check if user is admin (super_admin or admin)
 */
export const isAdmin = (user: User | null | undefined): boolean => {
  return hasAnyRole(user, [ROLES.SUPER_ADMIN, ROLES.ADMIN]);
};

/**
 * Check if user is super admin
 */
export const isSuperAdmin = (user: User | null | undefined): boolean => {
  return hasRole(user, ROLES.SUPER_ADMIN);
};

/**
 * Get user role display name (translation key)
 */
export const getRoleDisplayName = (role: string): string => {
  const roleMap: Record<string, string> = {
    [ROLES.SUPER_ADMIN]: 'roles.superAdmin',
    [ROLES.ADMIN]: 'roles.admin',
    [ROLES.EDITOR]: 'roles.editor',
    [ROLES.VIEWER]: 'roles.viewer',
    [ROLES.USER]: 'roles.user'
  };

  return roleMap[role] || 'roles.unknown';
};
