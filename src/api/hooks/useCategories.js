/**
 * Categories SWR Hooks
 * Custom hooks for fetching and mutating category data with SWR
 */

import useSWR from 'swr';
import { categoriesService } from 'api/services';
import { QUERY_KEYS } from 'api/config';

/**
 * Fetch all categories
 * @returns {object} SWR response with categories data
 */
export function useCategories() {
  const { data, error, isLoading, mutate } = useSWR(QUERY_KEYS.CATEGORIES.LIST, async () => {
    const response = await categoriesService.list();
    return response.data;
  });

  return {
    categories: data,
    isLoading,
    isError: error,
    mutate
  };
}

/**
 * Fetch categories tree
 * @returns {object} SWR response with categories tree data
 */
export function useCategoriesTree() {
  const { data, error, isLoading, mutate } = useSWR(QUERY_KEYS.CATEGORIES.TREE, async () => {
    const response = await categoriesService.tree();
    return response.data;
  });

  return {
    categoriesTree: data,
    isLoading,
    isError: error,
    mutate
  };
}

/**
 * Fetch single category by ID
 * @param {number} id - Category ID
 * @returns {object} SWR response with category data
 */
export function useCategory(id) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? QUERY_KEYS.CATEGORIES.DETAIL(id) : null,
    async () => {
      const response = await categoriesService.getById(id);
      return response.data;
    }
  );

  return {
    category: data,
    isLoading,
    isError: error,
    mutate
  };
}

/**
 * Create new category
 * @param {Function} mutate - SWR mutate function to update cache
 * @returns {Function} Create category function
 */
export function useCreateCategory(mutate) {
  return async (categoryData) => {
    try {
      const response = await categoriesService.create(categoryData);
      if (mutate) {
        mutate(); // Revalidate categories list
      }
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
}

/**
 * Update category
 * @param {Function} mutate - SWR mutate function to update cache
 * @returns {Function} Update category function
 */
export function useUpdateCategory(mutate) {
  return async (id, categoryData) => {
    try {
      const response = await categoriesService.update(id, categoryData);
      if (mutate) {
        mutate(); // Revalidate categories list
      }
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
}

/**
 * Delete category
 * @param {Function} mutate - SWR mutate function to update cache
 * @returns {Function} Delete category function
 */
export function useDeleteCategory(mutate) {
  return async (id) => {
    try {
      const response = await categoriesService.remove(id);
      if (mutate) {
        mutate(); // Revalidate categories list
      }
      return { success: true, message: response.message };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
}
