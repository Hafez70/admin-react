/**
 * Public Route Component
 * For login/register pages - redirects to dashboard if already logged in
 */

import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from 'hooks/useAuth';

// project imports
import Loader from 'components/Loader';
import { APP_DEFAULT_PATH } from 'config';

/**
 * Public Route Wrapper
 * Redirects to dashboard if user is already authenticated
 */
export default function PublicRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loader while checking authentication
  if (isLoading) {
    return <Loader />;
  }

  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to={APP_DEFAULT_PATH} replace />;
  }

  // User is not authenticated, show public page
  return children;
}

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired
};
