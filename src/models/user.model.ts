/**
 * User Data Transfer Objects (DTOs)
 * Type definitions and interfaces for user-related data
 */

/**
 * User interface - Full user object
 */
export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
  permissions: string[];
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Create User DTO - For creating new users
 */
export interface CreateUserDTO {
  email: string;
  password: string;
  name: string;
  role: string;
  isActive?: boolean;
  permissions?: string[];
}

/**
 * Update User DTO - For updating existing users
 */
export interface UpdateUserDTO {
  name?: string;
  role?: string;
  isActive?: boolean;
  permissions?: string[];
}

/**
 * User List Item - For table/list displays
 */
export interface UserListItem {
  id: number;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
  createdAt?: string;
}

/**
 * API Response - Single user response
 */
export interface UserResponse {
  success: boolean;
  data?: User;
  message?: string;
  error?: Record<string, unknown>;
}

/**
 * API Response - Users list response
 */
export interface UsersListResponse {
  success: boolean;
  data?: UserListItem[];
  total?: number;
  page?: number;
  pageSize?: number;
  message?: string;
  error?: Record<string, unknown>;
}

/**
 * User role enumeration
 */
export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  EDITOR = 'editor',
  VIEWER = 'viewer',
  USER = 'user'
}

/**
 * User status enumeration
 */
export const UserStatus = {
  ACTIVE: true,
  INACTIVE: false
} as const;

/**
 * Default permissions by role
 */
export const DefaultPermissionsByRole: Record<UserRole, string[]> = {
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
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate user role
 */
export const isValidRole = (role: string): role is UserRole => {
  return Object.values(UserRole).includes(role as UserRole);
};

/**
 * Get default permissions for a role
 */
export const getDefaultPermissions = (role: string): string[] => {
  if (isValidRole(role)) {
    return DefaultPermissionsByRole[role] || [];
  }
  return [];
};

/**
 * Create user DTO with defaults
 */
export const createUserDTO = (data: CreateUserDTO): CreateUserDTO => {
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
 */
export const sanitizeUser = (user: User & { password?: string }): User => {
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
