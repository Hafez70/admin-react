/**
 * Mock API Responses
 * Simulated backend responses for development
 */

import { User } from 'models/user.model';

/**
 * Mock user with password interface
 */
interface MockUser extends User {
  password: string;
}

/**
 * Mock product interface
 */
interface MockProduct {
  id: number;
  name: string;
  slug: string;
  price: number;
  category: number;
}

/**
 * Mock category interface
 */
interface MockCategory {
  id: number;
  name: string;
  slug: string;
  parent: number | null;
}

/**
 * API response interface
 */
interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
}

/**
 * Simulate API delay
 */
const delay = (ms: number = 1000): Promise<void> => 
  new Promise((resolve) => setTimeout(resolve, ms));

// Mock users database
const mockUsers: MockUser[] = [
  {
    id: 1,
    email: 'admin@taski.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    isActive: true,
    permissions: ['all']
  },
  {
    id: 2,
    email: 'editor@taski.com',
    password: 'editor123',
    name: 'Editor User',
    role: 'editor',
    isActive: true,
    permissions: [
      'dashboard.view',
      'users.view',
      'products.view',
      'products.create',
      'products.edit',
      'categories.view',
      'categories.create',
      'categories.edit',
      'settings.view'
    ]
  },
  {
    id: 3,
    email: 'viewer@taski.com',
    password: 'viewer123',
    name: 'Viewer User',
    role: 'viewer',
    isActive: true,
    permissions: ['dashboard.view', 'users.view', 'products.view', 'categories.view']
  },
  {
    id: 4,
    email: 'user@taski.com',
    password: 'user123',
    name: 'Regular User',
    role: 'user',
    isActive: true,
    permissions: ['dashboard.view']
  }
];

// Mock products
const mockProducts: MockProduct[] = [
  { id: 1, name: 'Product 1', slug: 'product-1', price: 100, category: 1 },
  { id: 2, name: 'Product 2', slug: 'product-2', price: 200, category: 1 },
  { id: 3, name: 'Product 3', slug: 'product-3', price: 300, category: 2 }
];

// Mock categories
const mockCategories: MockCategory[] = [
  { id: 1, name: 'Category 1', slug: 'category-1', parent: null },
  { id: 2, name: 'Category 2', slug: 'category-2', parent: 1 }
];

/**
 * Mock Auth API
 */
export const mockAuthAPI = {
  login: async (credentials: { email: string; password: string }): Promise<ApiResponse<{
    user: User;
    accessToken: string;
    refreshToken: string;
  }>> => {
    await delay(800);

    const user = mockUsers.find(
      (u) => u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const { password, ...userWithoutPassword } = user;

    return {
      success: true,
      data: {
        user: userWithoutPassword,
        accessToken: `mock-access-token-${user.id}-${Date.now()}`,
        refreshToken: `mock-refresh-token-${user.id}-${Date.now()}`
      }
    };
  },

  register: async (userData: { email: string; password: string; name: string }): Promise<ApiResponse<{
    user: User;
    accessToken: string;
    refreshToken: string;
  }>> => {
    await delay(800);

    const existingUser = mockUsers.find((u) => u.email === userData.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const newUser: MockUser = {
      id: mockUsers.length + 1,
      ...userData,
      role: 'user',
      isActive: true,
      permissions: ['read']
    };

    mockUsers.push(newUser);

    const { password, ...userWithoutPassword } = newUser;

    return {
      success: true,
      data: {
        user: userWithoutPassword,
        accessToken: `mock-access-token-${newUser.id}-${Date.now()}`,
        refreshToken: `mock-refresh-token-${newUser.id}-${Date.now()}`
      }
    };
  },

  refresh: async (_refreshToken: string): Promise<ApiResponse<{ accessToken: string }>> => {
    await delay(500);

    return {
      success: true,
      data: {
        accessToken: `mock-access-token-refreshed-${Date.now()}`
      }
    };
  },

  logout: async (): Promise<ApiResponse> => {
    await delay(300);
    return { success: true, message: 'Logged out successfully' };
  }
};

/**
 * Mock Users API
 */
export const mockUsersAPI = {
  list: async (): Promise<ApiResponse<User[]>> => {
    await delay(600);
    return {
      success: true,
      data: mockUsers.map(({ password, ...user }) => user)
    };
  },

  getById: async (id: number | string): Promise<ApiResponse<User>> => {
    await delay(400);
    const user = mockUsers.find((u) => u.id === Number(id));
    if (!user) throw new Error('User not found');

    const { password, ...userWithoutPassword } = user;
    return { success: true, data: userWithoutPassword };
  },

  create: async (userData: Partial<MockUser>): Promise<ApiResponse<User>> => {
    await delay(600);
    const newUser: MockUser = {
      id: mockUsers.length + 1,
      email: userData.email || '',
      password: userData.password || '',
      name: userData.name || '',
      role: userData.role || 'user',
      isActive: true,
      permissions: userData.permissions || []
    };
    mockUsers.push(newUser);
    const { password, ...userWithoutPassword } = newUser;
    return { success: true, data: userWithoutPassword };
  },

  activate: async (id: number | string): Promise<ApiResponse> => {
    await delay(400);
    const user = mockUsers.find((u) => u.id === Number(id));
    if (!user) throw new Error('User not found');
    user.isActive = true;
    return { success: true, message: 'User activated' };
  },

  deactivate: async (id: number | string): Promise<ApiResponse> => {
    await delay(400);
    const user = mockUsers.find((u) => u.id === Number(id));
    if (!user) throw new Error('User not found');
    user.isActive = false;
    return { success: true, message: 'User deactivated' };
  },

  changePassword: async (id: number | string, passwords: { newPassword: string }): Promise<ApiResponse> => {
    await delay(500);
    const user = mockUsers.find((u) => u.id === Number(id));
    if (!user) throw new Error('User not found');
    user.password = passwords.newPassword;
    return { success: true, message: 'Password changed successfully' };
  }
};

/**
 * Mock Products API
 */
export const mockProductsAPI = {
  list: async (): Promise<ApiResponse<MockProduct[]>> => {
    await delay(600);
    return { success: true, data: mockProducts };
  },

  getById: async (id: number | string): Promise<ApiResponse<MockProduct>> => {
    await delay(400);
    const product = mockProducts.find((p) => p.id === Number(id));
    if (!product) throw new Error('Product not found');
    return { success: true, data: product };
  },

  getBySlug: async (slug: string): Promise<ApiResponse<MockProduct>> => {
    await delay(400);
    const product = mockProducts.find((p) => p.slug === slug);
    if (!product) throw new Error('Product not found');
    return { success: true, data: product };
  },

  create: async (productData: Partial<MockProduct>): Promise<ApiResponse<MockProduct>> => {
    await delay(600);
    const newProduct: MockProduct = {
      id: mockProducts.length + 1,
      name: productData.name || '',
      slug: productData.slug || '',
      price: productData.price || 0,
      category: productData.category || 1
    };
    mockProducts.push(newProduct);
    return { success: true, data: newProduct };
  },

  update: async (id: number | string, productData: Partial<MockProduct>): Promise<ApiResponse<MockProduct>> => {
    await delay(600);
    const index = mockProducts.findIndex((p) => p.id === Number(id));
    if (index === -1) throw new Error('Product not found');
    mockProducts[index] = { ...mockProducts[index], ...productData };
    return { success: true, data: mockProducts[index] };
  },

  delete: async (id: number | string): Promise<ApiResponse> => {
    await delay(500);
    const index = mockProducts.findIndex((p) => p.id === Number(id));
    if (index === -1) throw new Error('Product not found');
    mockProducts.splice(index, 1);
    return { success: true, message: 'Product deleted' };
  }
};

/**
 * Mock Categories API
 */
export const mockCategoriesAPI = {
  list: async (): Promise<ApiResponse<MockCategory[]>> => {
    await delay(500);
    return { success: true, data: mockCategories };
  },

  tree: async (): Promise<ApiResponse<MockCategory[]>> => {
    await delay(500);
    return { success: true, data: mockCategories };
  },

  getById: async (id: number | string): Promise<ApiResponse<MockCategory>> => {
    await delay(400);
    const category = mockCategories.find((c) => c.id === Number(id));
    if (!category) throw new Error('Category not found');
    return { success: true, data: category };
  },

  create: async (categoryData: Partial<MockCategory>): Promise<ApiResponse<MockCategory>> => {
    await delay(600);
    const newCategory: MockCategory = {
      id: mockCategories.length + 1,
      name: categoryData.name || '',
      slug: categoryData.slug || '',
      parent: categoryData.parent || null
    };
    mockCategories.push(newCategory);
    return { success: true, data: newCategory };
  },

  update: async (id: number | string, categoryData: Partial<MockCategory>): Promise<ApiResponse<MockCategory>> => {
    await delay(600);
    const index = mockCategories.findIndex((c) => c.id === Number(id));
    if (index === -1) throw new Error('Category not found');
    mockCategories[index] = { ...mockCategories[index], ...categoryData };
    return { success: true, data: mockCategories[index] };
  },

  delete: async (id: number | string): Promise<ApiResponse> => {
    await delay(500);
    const index = mockCategories.findIndex((c) => c.id === Number(id));
    if (index === -1) throw new Error('Category not found');
    mockCategories.splice(index, 1);
    return { success: true, message: 'Category deleted' };
  }
};
