/**
 * Menu Utilities
 * Helper functions for menu items and navigation
 */

import { hasPermission } from './permissions';
import { User } from 'models/user.model';
import { Permission } from 'constants/permissions';

/**
 * Menu item interface
 */
export interface MenuItem {
  id: string;
  title: string;
  type: 'group' | 'collapse' | 'item';
  url?: string;
  icon?: unknown;
  breadcrumbs?: boolean;
  permission?: Permission;
  role?: string;
  children?: MenuItem[];
  parent?: MenuItem | null;
  disabled?: boolean;
  external?: boolean;
  target?: boolean;
  chip?: {
    color: string;
    variant: string;
    size: string;
    label: string;
    avatar?: unknown;
  };
}

/**
 * Filter menu items based on user permissions
 */
export const filterMenuByPermissions = (menuItems: MenuItem[], user: User | null | undefined): MenuItem[] => {
  if (!menuItems || !Array.isArray(menuItems)) return [];

  return menuItems
    .map((item) => {
      // If item has permission requirement, check it
      if (item.permission && !hasPermission(user, item.permission)) {
        return null;
      }

      // If item has role requirement, check it
      if (item.role && user?.role !== item.role) {
        return null;
      }

      // If item has children, filter them recursively
      if (item.children && Array.isArray(item.children)) {
        const filteredChildren = filterMenuByPermissions(item.children, user);

        // If group has no visible children, hide the group
        if (item.type === 'group' && filteredChildren.length === 0) {
          return null;
        }

        return {
          ...item,
          children: filteredChildren
        };
      }

      return item;
    })
    .filter((item): item is MenuItem => item !== null); // Type guard to remove null
};

/**
 * Get active menu item based on current path
 */
export const getActiveMenuItem = (menuItems: MenuItem[], pathname: string): MenuItem | null => {
  for (const item of menuItems) {
    if (item.url === pathname) {
      return item;
    }

    if (item.children) {
      const activeChild = getActiveMenuItem(item.children, pathname);
      if (activeChild) return activeChild;
    }
  }

  return null;
};

/**
 * Flatten menu items for breadcrumbs
 */
export const flattenMenuItems = (menuItems: MenuItem[]): MenuItem[] => {
  const flattened: MenuItem[] = [];

  const flatten = (items: MenuItem[], parent: MenuItem | null = null): void => {
    items.forEach((item) => {
      flattened.push({ ...item, parent });

      if (item.children) {
        flatten(item.children, item);
      }
    });
  };

  flatten(menuItems);
  return flattened;
};
