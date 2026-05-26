/**
 * API Configuration
 * Central configuration for API client
 */

export const API_CONFIG = {
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
    LOGOUT: (id) => `/api/users/${id}/logout`
  },

  // Users
  USERS: {
    LIST: '/api/users',
    DETAIL: (id) => `/api/users/${id}`,
    CREATE: '/api/users/create',
    ACTIVATE: (id) => `/api/users/${id}/activate`,
    DEACTIVATE: (id) => `/api/users/${id}/deactivate`,
    CHANGE_PASSWORD: (id) => `/api/users/${id}/change-password`
  },

  // Products
  PRODUCTS: {
    LIST: '/api/products',
    DETAIL: (id) => `/api/products/${id}`,
    BY_SLUG: (slug) => `/api/products/by-slug/${slug}`,
    CREATE: '/api/products',
    UPDATE: (id) => `/api/products/${id}`,
    DELETE: (id) => `/api/products/${id}`
  },

  // Categories
  CATEGORIES: {
    LIST: '/api/categories',
    TREE: '/api/categories/tree',
    DETAIL: (id) => `/api/categories/${id}`,
    CREATE: '/api/categories',
    UPDATE: (id) => `/api/categories/${id}`,
    DELETE: (id) => `/api/categories/${id}`
  },

  // Attributes
  ATTRIBUTES: {
    LIST: '/api/attributes',
    DETAIL: (id) => `/api/attributes/${id}`,
    BY_CATEGORY: (categoryId) => `/api/attributes/by-category/${categoryId}`,
    CREATE: '/api/attributes',
    UPDATE: (id) => `/api/attributes/${id}`,
    DELETE: (id) => `/api/attributes/${id}`
  },

  // Roles
  ROLES: {
    LIST: '/api/roles',
    DETAIL: (id) => `/api/roles/${id}`,
    CREATE: '/api/roles',
    UPDATE: (id) => `/api/roles/${id}`,
    DELETE: (id) => `/api/roles/${id}`,
    PERMISSIONS: (id) => `/api/roles/${id}/permissions`
  },

  // Permissions
  PERMISSIONS: {
    LIST: '/api/permissions',
    DETAIL: (id) => `/api/permissions/${id}`
  }
};

export const QUERY_KEYS = {
  AUTH: {
    USER: 'auth-user',
    SESSION: 'auth-session'
  },
  USERS: {
    LIST: 'users-list',
    DETAIL: (id) => ['users-detail', id]
  },
  PRODUCTS: {
    LIST: 'products-list',
    DETAIL: (id) => ['products-detail', id],
    BY_SLUG: (slug) => ['products-by-slug', slug]
  },
  CATEGORIES: {
    LIST: 'categories-list',
    TREE: 'categories-tree',
    DETAIL: (id) => ['categories-detail', id]
  },
  ATTRIBUTES: {
    LIST: 'attributes-list',
    DETAIL: (id) => ['attributes-detail', id],
    BY_CATEGORY: (categoryId) => ['attributes-by-category', categoryId]
  },
  ROLES: {
    LIST: 'roles-list',
    DETAIL: (id) => ['roles-detail', id],
    PERMISSIONS: (id) => ['roles-permissions', id]
  },
  PERMISSIONS: {
    LIST: 'permissions-list',
    DETAIL: (id) => ['permissions-detail', id]
  }
};
