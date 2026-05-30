/**
 * Protected Route Component
 * Protects routes that require authentication
 */

import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import useAuth from 'hooks/useAuth';

// project imports
import Loader from 'components/Loader';

/**
 * Protected Route Props
 */
interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Protected Route Wrapper
 * Redirects to login if user is not authenticated
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show loader while checking authentication
  if (isLoading) {
    return <Loader />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    // Save the attempted location for redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is authenticated, render the protected content
  return children;
}
