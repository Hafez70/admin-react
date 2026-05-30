import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

/**
 * Menu state interface
 */
interface MenuState {
  isDashboardDrawerOpened: boolean;
}

/**
 * Menu master response interface
 */
interface MenuMasterResponse {
  menuMaster: MenuState | undefined;
  menuMasterLoading: boolean;
}

const initialState: MenuState = {
  isDashboardDrawerOpened: false
};

const endpoints = {
  key: 'api/menu',
  master: 'master',
  dashboard: '/dashboard' // server URL
};

export function useGetMenuMaster(): MenuMasterResponse {
  const { data, isLoading } = useSWR<MenuState>(
    endpoints.key + endpoints.master,
    () => initialState,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  const memoizedValue = useMemo<MenuMasterResponse>(
    () => ({
      menuMaster: data,
      menuMasterLoading: isLoading
    }),
    [data, isLoading]
  );

  return memoizedValue;
}

export function handlerDrawerOpen(isDashboardDrawerOpened: boolean): void {
  // to update local state based on key

  mutate<MenuState>(
    endpoints.key + endpoints.master,
    (currentMenuMaster) => {
      return { ...currentMenuMaster, isDashboardDrawerOpened };
    },
    false
  );
}
