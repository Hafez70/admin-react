/**
 * Products SWR Hooks
 * Custom hooks for fetching and mutating product data with SWR
 */

import useSWR from 'swr';
import { productsService } from 'api/services';
import { QUERY_KEYS } from 'api/config';

/**
 * Fetch all products
 * @returns {object} SWR response with products data
 */
export function useProducts() {
  const { data, error, isLoading, mutate } = useSWR(QUERY_KEYS.PRODUCTS.LIST, async () => {
    const response = await productsService.list();
    return response.data;
  });

  return {
    products: data,
    isLoading,
    isError: error,
    mutate
  };
}

/**
 * Fetch single product by ID
 * @param {number} id - Product ID
 * @returns {object} SWR response with product data
 */
export function useProduct(id) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? QUERY_KEYS.PRODUCTS.DETAIL(id) : null,
    async () => {
      const response = await productsService.getById(id);
      return response.data;
    }
  );

  return {
    product: data,
    isLoading,
    isError: error,
    mutate
  };
}

/**
 * Fetch product by slug
 * @param {string} slug - Product slug
 * @returns {object} SWR response with product data
 */
export function useProductBySlug(slug) {
  const { data, error, isLoading, mutate } = useSWR(
    slug ? QUERY_KEYS.PRODUCTS.BY_SLUG(slug) : null,
    async () => {
      const response = await productsService.getBySlug(slug);
      return response.data;
    }
  );

  return {
    product: data,
    isLoading,
    isError: error,
    mutate
  };
}

/**
 * Create new product
 * @param {Function} mutate - SWR mutate function to update cache
 * @returns {Function} Create product function
 */
export function useCreateProduct(mutate) {
  return async (productData) => {
    try {
      const response = await productsService.create(productData);
      if (mutate) {
        mutate(); // Revalidate products list
      }
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
}

/**
 * Update product
 * @param {Function} mutate - SWR mutate function to update cache
 * @returns {Function} Update product function
 */
export function useUpdateProduct(mutate) {
  return async (id, productData) => {
    try {
      const response = await productsService.update(id, productData);
      if (mutate) {
        mutate(); // Revalidate products list
      }
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
}

/**
 * Delete product
 * @param {Function} mutate - SWR mutate function to update cache
 * @returns {Function} Delete product function
 */
export function useDeleteProduct(mutate) {
  return async (id) => {
    try {
      const response = await productsService.remove(id);
      if (mutate) {
        mutate(); // Revalidate products list
      }
      return { success: true, message: response.message };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
}
