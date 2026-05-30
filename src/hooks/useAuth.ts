/**
 * useAuth Hook
 * Hook to access authentication context
 */

import { useContext } from 'react';
import AuthContext, { AuthContextValue } from 'contexts/AuthContext';

/**
 * Hook to use authentication context
 * @throws {Error} If used outside AuthProvider
 */
export default function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
