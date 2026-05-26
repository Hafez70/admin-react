/**
 * Permission Utility Functions
 * Helper functions to check user permissions and roles
 */

import { ROLES, PERMISSIONS } from 'constants/permissions';

/**
 * Check if user has a specific permission
 * @param {object} user - User object with role and permissions
 * @param {string} permission - Permission to check
 * @returns {boolean}
 */
export const hasPermission = (user, permission) => {
  if (!user) return false;

  // Super admin has all permissions
  if (user.role === ROLES.SUPER_ADMIN) return true;

  // Check if user has 'all' permission
  if (user.permissions?.includes(PERMISSIONS.ALL)) return true;

  // Check specific permission
  return user.permissions?.includes(permission);
};

/**
 * Check if user has ANY of the specified permissions
 * @param {object} user - User object
 * @param {string[]} permissions - Array of permissions to check
 * @returns {boolean}
 */
export const hasAnyPermission = (user, permissions) => {
  if (!user || !permissions || permissions.length === 0) return false;
  return permissions.some((permission) => hasPermission(user, permission));
};

/**
 * Check if user has ALL of the specified permissions
 * @param {object} user - User object
 * @param {string[]} permissions - Array of permissions to check
 * @returns {boolean}
 */
export const hasAllPermissions = (user, permissions) => {
  if (!user || !permissions || permissions.length === 0) return false;
  return permissions.every((permission) => hasPermission(user, permission));
};

/**
 * Check if user has a specific role
 * @param {object} user - User object
 * @param {string} role - Role to check
 * @returns {boolean}
 */
export const hasRole = (user, role) => {
  if (!user) return false;
  return user.role === role;
};

/**
 * Check if user has ANY of the specified roles
 * @param {object} user - User object
 * @param {string[]} roles - Array of roles to check
 * @returns {boolean}
 */
export const hasAnyRole = (user, roles) => {
  if (!user || !roles || roles.length === 0) return false;
  return roles.includes(user.role);
};

/**
 * Check if user is admin (super_admin or admin)
 * @param {object} user - User object
 * @returns {boolean}
 */
export const isAdmin = (user) => {
  return hasAnyRole(user, [ROLES.SUPER_ADMIN, ROLES.ADMIN]);
};

/**
 * Check if user is super admin
 * @param {object} user - User object
 * @returns {boolean}
 */
export const isSuperAdmin = (user) => {
  return hasRole(user, ROLES.SUPER_ADMIN);
};

/**
 * Get user role display name
 * @param {string} role - Role identifier
 * @returns {string} - Translation key for role name
 */
export const getRoleDisplayName = (role) => {
  const roleMap = {
    [ROLES.SUPER_ADMIN]: 'roles.superAdmin',
    [ROLES.ADMIN]: 'roles.admin',
    [ROLES.EDITOR]: 'roles.editor',
    [ROLES.VIEWER]: 'roles.viewer',
    [ROLES.USER]: 'roles.user'
  };

  return roleMap[role] || 'roles.unknown';
};
