/**
 * Categories SWR Hooks
 * Custom hooks for fetching and mutating category data with SWR
 */

import useSWR, { KeyedMutator } from 'swr';
import { categoriesService } from 'api/services';
import { QUERY_KEYS } from 'api/config';

/**
 * Category interface
 */
interface Category {
  id: number;
  name: string;
  slug: string;
  parent: number | null;
}

/**
 * Categories response interface
 */
interface UseCategoriesResponse {
  categories: Category[] | undefined;
  isLoading: boolean;
  isError: Error | undefined;
  mutate: KeyedMutator<Category[]>;
}

/**
 * Category response interface
 */
interface UseCategoryResponse {
  category: Category | undefined;
  isLoading: boolean;
  isError: Error | undefined;
  mutate: KeyedMutator<Category>;
}

/**
 * Categories tree response interface
 */
interface UseCategoriesTreeResponse {
  categoriesTree: Category[] | undefined;
  isLoading: boolean;
  isError: Error | undefined;
  mutate: KeyedMutator<Category[]>;
}

/**
 * Fetch all categories
 */
export function useCategories(): UseCategoriesResponse {
  const { data, error, isLoading, mutate } = useSWR<Category[]>(QUERY_KEYS.CATEGORIES.LIST, async () => {
    const response = await categoriesService.list();
    return response.data || [];
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
 */
export function useCategoriesTree(): UseCategoriesTreeResponse {
  const { data, error, isLoading, mutate } = useSWR<Category[]>(QUERY_KEYS.CATEGORIES.TREE, async () => {
    const response = await categoriesService.tree();
    return response.data || [];
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
 */
export function useCategory(id: number | null | undefined): UseCategoryResponse {
  const { data, error, isLoading, mutate } = useSWR<Category>(
    id ? QUERY_KEYS.CATEGORIES.DETAIL(id) : null,
    async () => {
      const response = await categoriesService.getById(id!);
      return response.data!;
    }
  );

  return {
    category: data,
    isLoading,
    isError: error,
    mutate
  };
}
