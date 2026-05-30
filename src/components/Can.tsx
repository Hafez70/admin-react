import { ReactNode } from 'react';
import usePermission from 'hooks/usePermission';
import { Permission, Role } from 'constants/permissions';

/**
 * Can Component Props
 */
interface CanProps {
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
  /** Content to render if permission denied */
  fallback?: ReactNode;
}

/**
 * Can Component
 * Conditionally renders children based on user permissions
 *
 * @example
 * // Show button only if user can delete users
 * <Can permission="users.delete">
 *   <Button onClick={handleDelete}>Delete</Button>
 * </Can>
 *
 * @example
 * // Show content if user has any of the permissions
 * <Can permissions={['users.edit', 'users.delete']} requireAll={false}>
 *   <EditActions />
 * </Can>
 *
 * @example
 * // Show fallback if user doesn't have permission
 * <Can permission="admin.settings" fallback={<div>Access Denied</div>}>
 *   <AdminSettings />
 * </Can>
 */
export default function Can({
  permission,
  permissions,
  requireAll = false,
  role,
  roles,
  children,
  fallback = null
}: CanProps) {
  const { can, canAny, canAll, is, isAny } = usePermission();

  // Check single permission
  if (permission && !can(permission)) {
    return fallback;
  }

  // Check multiple permissions
  if (permissions) {
    const hasPermissions = requireAll ? canAll(permissions) : canAny(permissions);
    if (!hasPermissions) {
      return fallback;
    }
  }

  // Check single role
  if (role && !is(role)) {
    return fallback;
  }

  // Check multiple roles
  if (roles && !isAny(roles)) {
    return fallback;
  }

  return children;
}
