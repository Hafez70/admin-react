/**
 * Products SWR Hooks
 * Custom hooks for fetching and mutating product data with SWR
 */

import useSWR, { KeyedMutator } from 'swr';
import { productsService } from 'api/services';
import { QUERY_KEYS } from 'api/config';

/**
 * Product interface
 */
interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  category: number;
}

/**
 * Products response interface
 */
interface UseProductsResponse {
  products: Product[] | undefined;
  isLoading: boolean;
  isError: Error | undefined;
  mutate: KeyedMutator<Product[]>;
}

/**
 * Product response interface
 */
interface UseProductResponse {
  product: Product | undefined;
  isLoading: boolean;
  isError: Error | undefined;
  mutate: KeyedMutator<Product>;
}

/**
 * Fetch all products
 */
export function useProducts(): UseProductsResponse {
  const { data, error, isLoading, mutate } = useSWR<Product[]>(QUERY_KEYS.PRODUCTS.LIST, async () => {
    const response = await productsService.list();
    return response.data || [];
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
 */
export function useProduct(id: number | null | undefined): UseProductResponse {
  const { data, error, isLoading, mutate } = useSWR<Product>(
    id ? QUERY_KEYS.PRODUCTS.DETAIL(id) : null,
    async () => {
      const response = await productsService.getById(id!);
      return response.data!;
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
 */
export function useProductBySlug(slug: string | null | undefined): UseProductResponse {
  const { data, error, isLoading, mutate } = useSWR<Product>(
    slug ? QUERY_KEYS.PRODUCTS.BY_SLUG(slug) : null,
    async () => {
      const response = await productsService.getBySlug(slug!);
      return response.data!;
    }
  );

  return {
    product: data,
    isLoading,
    isError: error,
    mutate
  };
}
