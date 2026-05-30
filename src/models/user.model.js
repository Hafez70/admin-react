/**
 * User Data Transfer Objects (DTOs)
 * Type definitions and schemas for user-related data
 */

/**
 * @typedef {Object} User
 * @property {number} id - Unique user identifier
 * @property {string} email - User email address (unique)
 * @property {string} name - Full name of the user
 * @property {string} role - User role (admin, editor, viewer, user)
 * @property {boolean} isActive - Account status (active/inactive)
 * @property {string[]} permissions - Array of permission strings
 * @property {string} [createdAt] - ISO date string when user was created
 * @property {string} [updatedAt] - ISO date string when user was last updated
 */

/**
 * @typedef {Object} CreateUserDTO
 * @property {string} email - User email address
 * @property {string} password - User password
 * @property {string} name - Full name
 * @property {string} role - User role
 * @property {boolean} [isActive] - Account status (defaults to true)
 * @property {string[]} [permissions] - Array of permission strings (defaults by role)
 */

/**
 * @typedef {Object} UpdateUserDTO
 * @property {string} [name] - Full name
 * @property {string} [role] - User role
 * @property {boolean} [isActive] - Account status
 * @property {string[]} [permissions] - Array of permission strings
 */

/**
 * @typedef {Object} UserListItem
 * @property {number} id - User ID
 * @property {string} email - User email
 * @property {string} name - Full name
 * @property {string} role - User role
 * @property {boolean} isActive - Account status
 * @property {string} [createdAt] - Created date
 */

/**
 * @typedef {Object} UserResponse
 * @property {boolean} success - Request success status
 * @property {User} [data] - User data
 * @property {string} [message] - Response message
 * @property {Object} [error] - Error details
 */

/**
 * @typedef {Object} UsersListResponse
 * @property {boolean} success - Request success status
 * @property {UserListItem[]} [data] - Array of users
 * @property {number} [total] - Total count of users
 * @property {number} [page] - Current page number
 * @property {number} [pageSize] - Items per page
 * @property {string} [message] - Response message
 * @property {Object} [error] - Error details
 */

/**
 * User role enumeration
 * @enum {string}
 */
export const UserRole = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  EDITOR: 'editor',
  VIEWER: 'viewer',
  USER: 'user'
};

/**
 * User status enumeration
 * @enum {boolean}
 */
export const UserStatus = {
  ACTIVE: true,
  INACTIVE: false
};

/**
 * Default permissions by role
 * @type {Object.<string, string[]>}
 */
export const DefaultPermissionsByRole = {
  [UserRole.SUPER_ADMIN]: ['all'],
  [UserRole.ADMIN]: [
    'dashboard.view',
    'dashboard.stats',
    'users.view',
    'users.create',
    'users.edit',
    'users.delete',
    'users.activate',
    'products.view',
    'products.create',
    'products.edit',
    'products.delete',
    'categories.view',
    'categories.create',
    'categories.edit',
    'categories.delete',
    'settings.view',
    'settings.edit'
  ],
  [UserRole.EDITOR]: [
    'dashboard.view',
    'users.view',
    'products.view',
    'products.create',
    'products.edit',
    'categories.view',
    'categories.create',
    'categories.edit',
    'settings.view'
  ],
  [UserRole.VIEWER]: ['dashboard.view', 'users.view', 'products.view', 'categories.view'],
  [UserRole.USER]: ['dashboard.view']
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate user role
 * @param {string} role - Role to validate
 * @returns {boolean} - True if valid
 */
export const isValidRole = (role) => {
  return Object.values(UserRole).includes(role);
};

/**
 * Get default permissions for a role
 * @param {string} role - User role
 * @returns {string[]} - Array of permission strings
 */
export const getDefaultPermissions = (role) => {
  return DefaultPermissionsByRole[role] || [];
};

/**
 * Create user DTO with defaults
 * @param {CreateUserDTO} data - User data
 * @returns {CreateUserDTO} - User DTO with defaults
 */
export const createUserDTO = (data) => {
  return {
    email: data.email,
    password: data.password,
    name: data.name,
    role: data.role || UserRole.USER,
    isActive: data.isActive !== undefined ? data.isActive : true,
    permissions: data.permissions || getDefaultPermissions(data.role || UserRole.USER)
  };
};

/**
 * Sanitize user object (remove password)
 * @param {User} user - User object
 * @returns {User} - Sanitized user object
 */
export const sanitizeUser = (user) => {
  const { password, ...sanitized } = user;
  return sanitized;
};

export default {
  UserRole,
  UserStatus,
  DefaultPermissionsByRole,
  isValidEmail,
  isValidRole,
  getDefaultPermissions,
  createUserDTO,
  sanitizeUser
};
