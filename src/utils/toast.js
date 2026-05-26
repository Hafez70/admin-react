/**
 * Toast Utility
 * Wrapper around react-hot-toast with i18n support
 */

import toast from 'react-hot-toast';

/**
 * Default toast options
 */
const defaultOptions = {
  duration: 4000,
  position: 'top-center',
  style: {
    borderRadius: '8px',
    padding: '12px 20px',
    fontSize: '14px',
    maxWidth: '500px'
  }
};

/**
 * Success toast
 * @param {string} message - Message to display
 * @param {object} options - Toast options
 */
export const showSuccess = (message, options = {}) => {
  return toast.success(message, {
    ...defaultOptions,
    style: {
      ...defaultOptions.style,
      background: '#10b981',
      color: '#fff'
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#10b981'
    },
    ...options
  });
};

/**
 * Error toast
 * @param {string} message - Message to display
 * @param {object} options - Toast options
 */
export const showError = (message, options = {}) => {
  return toast.error(message, {
    ...defaultOptions,
    duration: 5000, // Errors stay longer
    style: {
      ...defaultOptions.style,
      background: '#ef4444',
      color: '#fff'
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#ef4444'
    },
    ...options
  });
};

/**
 * Warning toast
 * @param {string} message - Message to display
 * @param {object} options - Toast options
 */
export const showWarning = (message, options = {}) => {
  return toast(message, {
    ...defaultOptions,
    icon: '⚠️',
    style: {
      ...defaultOptions.style,
      background: '#f59e0b',
      color: '#fff'
    },
    ...options
  });
};

/**
 * Info toast
 * @param {string} message - Message to display
 * @param {object} options - Toast options
 */
export const showInfo = (message, options = {}) => {
  return toast(message, {
    ...defaultOptions,
    icon: 'ℹ️',
    style: {
      ...defaultOptions.style,
      background: '#3b82f6',
      color: '#fff'
    },
    ...options
  });
};

/**
 * Loading toast (with promise)
 * @param {Promise} promise - Promise to track
 * @param {object} messages - Loading, success, and error messages
 * @param {object} options - Toast options
 * @returns {Promise} Original promise
 */
export const showPromise = (promise, messages, options = {}) => {
  return toast.promise(
    promise,
    {
      loading: messages.loading || 'Loading...',
      success: messages.success || 'Success!',
      error: messages.error || 'Error occurred'
    },
    {
      ...defaultOptions,
      ...options
    }
  );
};

/**
 * Custom toast with JSX content
 * @param {React.ReactNode} content - JSX content
 * @param {object} options - Toast options
 */
export const showCustom = (content, options = {}) => {
  return toast.custom(content, {
    ...defaultOptions,
    ...options
  });
};

/**
 * Dismiss all toasts
 */
export const dismissAll = () => {
  toast.dismiss();
};

/**
 * Dismiss specific toast
 * @param {string} toastId - Toast ID to dismiss
 */
export const dismiss = (toastId) => {
  toast.dismiss(toastId);
};

/**
 * Remove all toasts (including animations)
 */
export const removeAll = () => {
  toast.remove();
};

// Export the base toast for custom usage
export default toast;
