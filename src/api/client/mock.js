/**
 * Mock API Responses
 * Simulated backend responses for development
 */

/**
 * Simulate API delay
 * @param {number} ms - Delay in milliseconds
 * @returns {Promise}
 */
const delay = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock users database
const mockUsers = [
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
const mockProducts = [
  { id: 1, name: 'Product 1', slug: 'product-1', price: 100, category: 1 },
  { id: 2, name: 'Product 2', slug: 'product-2', price: 200, category: 1 },
  { id: 3, name: 'Product 3', slug: 'product-3', price: 300, category: 2 }
];

// Mock categories
const mockCategories = [
  { id: 1, name: 'Category 1', slug: 'category-1', parent: null },
  { id: 2, name: 'Category 2', slug: 'category-2', parent: 1 }
];

/**
 * Mock Auth API
 */
export const mockAuthAPI = {
  login: async (credentials) => {
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

  register: async (userData) => {
    await delay(800);

    const existingUser = mockUsers.find((u) => u.email === userData.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const newUser = {
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

  refresh: async (refreshToken) => {
    await delay(500);

    return {
      success: true,
      data: {
        accessToken: `mock-access-token-refreshed-${Date.now()}`
      }
    };
  },

  logout: async () => {
    await delay(300);
    return { success: true, message: 'Logged out successfully' };
  }
};

/**
 * Mock Users API
 */
export const mockUsersAPI = {
  list: async () => {
    await delay(600);
    return {
      success: true,
      data: mockUsers.map(({ password, ...user }) => user)
    };
  },

  getById: async (id) => {
    await delay(400);
    const user = mockUsers.find((u) => u.id === Number(id));
    if (!user) throw new Error('User not found');

    const { password, ...userWithoutPassword } = user;
    return { success: true, data: userWithoutPassword };
  },

  create: async (userData) => {
    await delay(600);
    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      isActive: true
    };
    mockUsers.push(newUser);
    const { password, ...userWithoutPassword } = newUser;
    return { success: true, data: userWithoutPassword };
  },

  activate: async (id) => {
    await delay(400);
    const user = mockUsers.find((u) => u.id === Number(id));
    if (!user) throw new Error('User not found');
    user.isActive = true;
    return { success: true, message: 'User activated' };
  },

  deactivate: async (id) => {
    await delay(400);
    const user = mockUsers.find((u) => u.id === Number(id));
    if (!user) throw new Error('User not found');
    user.isActive = false;
    return { success: true, message: 'User deactivated' };
  },

  changePassword: async (id, passwords) => {
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
  list: async () => {
    await delay(600);
    return { success: true, data: mockProducts };
  },

  getById: async (id) => {
    await delay(400);
    const product = mockProducts.find((p) => p.id === Number(id));
    if (!product) throw new Error('Product not found');
    return { success: true, data: product };
  },

  getBySlug: async (slug) => {
    await delay(400);
    const product = mockProducts.find((p) => p.slug === slug);
    if (!product) throw new Error('Product not found');
    return { success: true, data: product };
  },

  create: async (productData) => {
    await delay(600);
    const newProduct = {
      id: mockProducts.length + 1,
      ...productData
    };
    mockProducts.push(newProduct);
    return { success: true, data: newProduct };
  },

  update: async (id, productData) => {
    await delay(600);
    const index = mockProducts.findIndex((p) => p.id === Number(id));
    if (index === -1) throw new Error('Product not found');
    mockProducts[index] = { ...mockProducts[index], ...productData };
    return { success: true, data: mockProducts[index] };
  },

  delete: async (id) => {
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
  list: async () => {
    await delay(500);
    return { success: true, data: mockCategories };
  },

  tree: async () => {
    await delay(500);
    return { success: true, data: mockCategories };
  },

  getById: async (id) => {
    await delay(400);
    const category = mockCategories.find((c) => c.id === Number(id));
    if (!category) throw new Error('Category not found');
    return { success: true, data: category };
  },

  create: async (categoryData) => {
    await delay(600);
    const newCategory = {
      id: mockCategories.length + 1,
      ...categoryData
    };
    mockCategories.push(newCategory);
    return { success: true, data: newCategory };
  },

  update: async (id, categoryData) => {
    await delay(600);
    const index = mockCategories.findIndex((c) => c.id === Number(id));
    if (index === -1) throw new Error('Category not found');
    mockCategories[index] = { ...mockCategories[index], ...categoryData };
    return { success: true, data: mockCategories[index] };
  },

  delete: async (id) => {
    await delay(500);
    const index = mockCategories.findIndex((c) => c.id === Number(id));
    if (index === -1) throw new Error('Category not found');
    mockCategories.splice(index, 1);
    return { success: true, message: 'Category deleted' };
  }
};
