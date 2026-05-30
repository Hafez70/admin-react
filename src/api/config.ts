/**
 * API Configuration
 * Central configuration for API client
 */

/**
 * API configuration interface
 */
export interface ApiConfig {
  BASE_URL: string;
  TIMEOUT: number;
  USE_MOCK: boolean;
}

export const API_CONFIG: ApiConfig = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001',
  TIMEOUT: 30000,
  USE_MOCK: import.meta.env.VITE_USE_MOCK_API === 'true' || true // Default to mock for development
};

export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/api/users/login',
    REFRESH: '/api/users/refresh',
    REGISTER: '/api/users/register',
    LOGOUT: (id: number) => `/api/users/${id}/logout`
  },

  // Users
  USERS: {
    LIST: '/api/users',
    DETAIL: (id: number) => `/api/users/${id}`,
    CREATE: '/api/users/create',
    ACTIVATE: (id: number) => `/api/users/${id}/activate`,
    DEACTIVATE: (id: number) => `/api/users/${id}/deactivate`,
    CHANGE_PASSWORD: (id: number) => `/api/users/${id}/change-password`
  },

  // Products
  PRODUCTS: {
    LIST: '/api/products',
    DETAIL: (id: number) => `/api/products/${id}`,
    BY_SLUG: (slug: string) => `/api/products/by-slug/${slug}`,
    CREATE: '/api/products',
    UPDATE: (id: number) => `/api/products/${id}`,
    DELETE: (id: number) => `/api/products/${id}`
  },

  // Categories
  CATEGORIES: {
    LIST: '/api/categories',
    TREE: '/api/categories/tree',
    DETAIL: (id: number) => `/api/categories/${id}`,
    CREATE: '/api/categories',
    UPDATE: (id: number) => `/api/categories/${id}`,
    DELETE: (id: number) => `/api/categories/${id}`
  },

  // Attributes
  ATTRIBUTES: {
    LIST: '/api/attributes',
    DETAIL: (id: number) => `/api/attributes/${id}`,
    BY_CATEGORY: (categoryId: number) => `/api/attributes/by-category/${categoryId}`,
    CREATE: '/api/attributes',
    UPDATE: (id: number) => `/api/attributes/${id}`,
    DELETE: (id: number) => `/api/attributes/${id}`
  },

  // Roles
  ROLES: {
    LIST: '/api/roles',
    DETAIL: (id: number) => `/api/roles/${id}`,
    CREATE: '/api/roles',
    UPDATE: (id: number) => `/api/roles/${id}`,
    DELETE: (id: number) => `/api/roles/${id}`,
    PERMISSIONS: (id: number) => `/api/roles/${id}/permissions`
  },

  // Permissions
  PERMISSIONS: {
    LIST: '/api/permissions',
    DETAIL: (id: number) => `/api/permissions/${id}`
  }
} as const;

export const QUERY_KEYS = {
  AUTH: {
    USER: 'auth-user',
    SESSION: 'auth-session'
  },
  USERS: {
    LIST: 'users-list',
    DETAIL: (id: number) => ['users-detail', id] as const
  },
  PRODUCTS: {
    LIST: 'products-list',
    DETAIL: (id: number) => ['products-detail', id] as const,
    BY_SLUG: (slug: string) => ['products-by-slug', slug] as const
  },
  CATEGORIES: {
    LIST: 'categories-list',
    TREE: 'categories-tree',
    DETAIL: (id: number) => ['categories-detail', id] as const
  },
  ATTRIBUTES: {
    LIST: 'attributes-list',
    DETAIL: (id: number) => ['attributes-detail', id] as const,
    BY_CATEGORY: (categoryId: number) => ['attributes-by-category', categoryId] as const
  },
  ROLES: {
    LIST: 'roles-list',
    DETAIL: (id: number) => ['roles-detail', id] as const,
    PERMISSIONS: (id: number) => ['roles-permissions', id] as const
  },
  PERMISSIONS: {
    LIST: 'permissions-list',
    DETAIL: (id: number) => ['permissions-detail', id] as const
  }
} as const;
