import { createContext, useMemo, ReactNode } from 'react';

// project imports
import config, { Config } from 'config';
import { useLocalStorage, UseLocalStorageReturn } from 'hooks/useLocalStorage';

// ==============================|| CONFIG CONTEXT ||============================== //

export type ConfigContextValue = UseLocalStorageReturn<Config>;

export const ConfigContext = createContext<ConfigContextValue | undefined>(undefined);

// ==============================|| CONFIG PROVIDER ||============================== //

export interface ConfigProviderProps {
  children: ReactNode;
}

export function ConfigProvider({ children }: ConfigProviderProps) {
  const { state, setState, setField, resetState } = useLocalStorage<Config>('taski-admin-config', config);

  const memoizedValue = useMemo<ConfigContextValue>(
    () => ({ state, setState, setField, resetState }),
    [state, setField, setState, resetState]
  );

  return <ConfigContext.Provider value={memoizedValue}>{children}</ConfigContext.Provider>;
}
