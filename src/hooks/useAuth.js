/**
 * useAuth Hook
 * Hook to access authentication context
 */

import { useContext } from 'react';
import AuthContext from 'contexts/AuthContext';

/**
 * Hook to use authentication context
 * @returns {object} Auth context value
 * @throws {Error} If used outside AuthProvider
 */
export default function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
