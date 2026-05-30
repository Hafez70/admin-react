import { Toaster as HotToaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

/**
 * Toaster Component
 * Wraps react-hot-toast Toaster with i18n and RTL support
 */
export default function Toaster() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';

  return (
    <HotToaster
      position={isRTL ? 'top-center' : 'top-center'}
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Default options for all toasts
        duration: 4000,
        style: {
          borderRadius: '8px',
          padding: '12px 20px',
          fontSize: '14px',
          fontFamily: isRTL ? 'Vazirmatn, sans-serif' : "'Public Sans', sans-serif",
          direction: isRTL ? 'rtl' : 'ltr',
          textAlign: isRTL ? 'right' : 'left',
          maxWidth: '500px'
        },

        // Success toast styling
        success: {
          duration: 4000,
          style: {
            background: '#10b981',
            color: '#fff'
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#10b981'
          }
        },

        // Error toast styling
        error: {
          duration: 5000,
          style: {
            background: '#ef4444',
            color: '#fff'
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#ef4444'
          }
        },

        // Loading toast styling
        loading: {
          style: {
            background: '#3b82f6',
            color: '#fff'
          }
        }
      }}
    />
  );
}
