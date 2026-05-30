/**
 * Toast Utility
 * Wrapper around react-hot-toast with i18n support
 */

import toast, { ToastOptions } from 'react-hot-toast';
import { ReactNode } from 'react';

/**
 * Promise messages interface
 */
export interface PromiseMessages {
  loading?: string;
  success?: string;
  error?: string;
}

/**
 * Default toast options
 */
const defaultOptions: ToastOptions = {
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
 */
export const showSuccess = (message: string, options: ToastOptions = {}): string => {
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
 */
export const showError = (message: string, options: ToastOptions = {}): string => {
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
 */
export const showWarning = (message: string, options: ToastOptions = {}): string => {
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
 */
export const showInfo = (message: string, options: ToastOptions = {}): string => {
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
 */
export const showPromise = <T,>(
  promise: Promise<T>,
  messages: PromiseMessages,
  options: ToastOptions = {}
): Promise<T> => {
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
 */
export const showCustom = (content: ReactNode, options: ToastOptions = {}): string => {
  return toast.custom((t) => <div>{content}</div>, {
    ...defaultOptions,
    ...options
  });
};

/**
 * Dismiss all toasts
 */
export const dismissAll = (): void => {
  toast.dismiss();
};

/**
 * Dismiss specific toast
 */
export const dismiss = (toastId?: string): void => {
  toast.dismiss(toastId);
};

/**
 * Remove all toasts (including animations)
 */
export const removeAll = (): void => {
  toast.remove();
};

// Export the base toast for custom usage
export default toast;
