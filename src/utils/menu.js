/**
 * Menu Utilities
 * Helper functions for menu items and navigation
 */

import { hasPermission } from './permissions';

/**
 * Filter menu items based on user permissions
 * @param {Array} menuItems - Array of menu items
 * @param {object} user - User object with permissions
 * @returns {Array} - Filtered menu items
 */
export const filterMenuByPermissions = (menuItems, user) => {
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
    .filter(Boolean); // Remove null items
};

/**
 * Get active menu item based on current path
 * @param {Array} menuItems - Array of menu items
 * @param {string} pathname - Current pathname
 * @returns {object|null} - Active menu item or null
 */
export const getActiveMenuItem = (menuItems, pathname) => {
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
 * @param {Array} menuItems - Array of menu items
 * @returns {Array} - Flattened menu items
 */
export const flattenMenuItems = (menuItems) => {
  const flattened = [];

  const flatten = (items, parent = null) => {
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
