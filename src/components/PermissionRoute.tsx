import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import usePermission from 'hooks/usePermission';
import Loader from 'components/Loader';
import { Permission, Role } from 'constants/permissions';

/**
 * PermissionRoute Component Props
 */
interface PermissionRouteProps {
  /** Single permission to check */
  permission?: Permission;
  /** Multiple permissions to check */
  permissions?: Permission[];
  /** Require all permissions (default: false = any) */
  requireAll?: boolean;
  /** Single role to check */
  role?: Role;
  /** Multiple roles to check */
  roles?: Role[];
  /** Content to render if permission granted */
  children: ReactNode;
  /** Redirect path if permission denied (default: /403) */
  redirectTo?: string;
}

/**
 * PermissionRoute Component
 * Protects routes based on user permissions or roles
 * Redirects to 403 page if user doesn't have required permission
 *
 * @example
 * // Protect route with single permission
 * <PermissionRoute permission="users.view">
 *   <UsersPage />
 * </PermissionRoute>
 *
 * @example
 * // Protect route with multiple permissions (any)
 * <PermissionRoute permissions={['users.edit', 'users.delete']}>
 *   <UserEditPage />
 * </PermissionRoute>
 *
 * @example
 * // Protect route by role
 * <PermissionRoute role="admin">
 *   <AdminPanel />
 * </PermissionRoute>
 */
export default function PermissionRoute({
  permission,
  permissions,
  requireAll = false,
  role,
  roles,
  children,
  redirectTo = '/403'
}: PermissionRouteProps) {
  const { can, canAny, canAll, is, isAny, isAuthenticated } = usePermission();

  // Still loading auth state
  if (isAuthenticated === undefined) {
    return <Loader />;
  }

  // Not authenticated - shouldn't happen if ProtectedRoute is used
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check single permission
  if (permission && !can(permission)) {
    return <Navigate to={redirectTo} replace />;
  }

  // Check multiple permissions
  if (permissions) {
    const hasPermissions = requireAll ? canAll(permissions) : canAny(permissions);
    if (!hasPermissions) {
      return <Navigate to={redirectTo} replace />;
    }
  }

  // Check single role
  if (role && !is(role)) {
    return <Navigate to={redirectTo} replace />;
  }

  // Check multiple roles
  if (roles && !isAny(roles)) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}
