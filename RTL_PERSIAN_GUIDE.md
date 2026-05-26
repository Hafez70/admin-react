# RTL & Persian Language Implementation Guide

## Quick Start Guide for Persian/RTL Support

---

## Step 1: Install Required Dependencies

```bash
# Internationalization
bun add i18next react-i18next i18next-browser-languagedetector

# RTL support for MUI
bun add stylis stylis-plugin-rtl

# Persian date handling (optional but recommended)
bun add date-fns-jalali moment-jalaali
```

---

## Step 2: Create i18n Configuration

Create `src/i18n/index.js`:

```javascript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import translationFA from './locales/fa.json';
import translationEN from './locales/en.json';

const resources = {
  fa: {
    translation: translationFA
  },
  en: {
    translation: translationEN
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fa',
    lng: 'fa', // Default language
    debug: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
```

---

## Step 3: Create Translation Files

Create `src/i18n/locales/fa.json`:

```json
{
  "common": {
    "dashboard": "داشبورد",
    "login": "ورود",
    "logout": "خروج",
    "save": "ذخیره",
    "cancel": "انصراف",
    "delete": "حذف",
    "edit": "ویرایش",
    "add": "افزودن",
    "search": "جستجو",
    "filter": "فیلتر",
    "export": "خروجی",
    "import": "ورودی",
    "close": "بستن",
    "loading": "در حال بارگذاری...",
    "noData": "داده‌ای یافت نشد",
    "error": "خطا",
    "success": "موفق",
    "warning": "هشدار",
    "info": "اطلاعات"
  },
  "auth": {
    "email": "ایمیل",
    "password": "رمز عبور",
    "rememberMe": "مرا به خاطر بسپار",
    "forgotPassword": "فراموشی رمز عبور؟",
    "loginButton": "ورود به سیستم",
    "noAccount": "حساب کاربری ندارید؟",
    "signUp": "ثبت‌نام",
    "emailRequired": "ایمیل الزامی است",
    "passwordRequired": "رمز عبور الزامی است",
    "invalidEmail": "ایمیل نامعتبر است",
    "loginSuccess": "ورود موفقیت‌آمیز",
    "loginError": "ورود ناموفق. لطفاً دوباره تلاش کنید"
  },
  "menu": {
    "dashboard": "داشبورد",
    "users": "کاربران",
    "tasks": "وظایف",
    "settings": "تنظیمات",
    "profile": "پروفایل",
    "reports": "گزارش‌ها",
    "help": "راهنما",
    "documentation": "مستندات"
  },
  "dashboard": {
    "title": "داشبورد",
    "welcome": "خوش آمدید",
    "totalUsers": "کل کاربران",
    "activeTasks": "وظایف فعال",
    "completedTasks": "وظایف تکمیل شده",
    "monthlyRevenue": "درآمد ماهانه",
    "recentActivities": "فعالیت‌های اخیر",
    "statistics": "آمار",
    "quickActions": "دسترسی سریع"
  },
  "users": {
    "title": "کاربران",
    "addUser": "افزودن کاربر",
    "editUser": "ویرایش کاربر",
    "deleteUser": "حذف کاربر",
    "name": "نام",
    "email": "ایمیل",
    "phone": "تلفن",
    "role": "نقش",
    "status": "وضعیت",
    "actions": "عملیات",
    "active": "فعال",
    "inactive": "غیرفعال",
    "admin": "مدیر",
    "user": "کاربر",
    "deleteConfirm": "آیا از حذف این کاربر اطمینان دارید؟"
  },
  "validation": {
    "required": "{{field}} الزامی است",
    "email": "ایمیل نامعتبر است",
    "minLength": "{{field}} باید حداقل {{min}} کاراکتر باشد",
    "maxLength": "{{field}} نباید بیشتر از {{max}} کاراکتر باشد",
    "phoneFormat": "شماره تلفن نامعتبر است"
  }
}
```

Create `src/i18n/locales/en.json`:

```json
{
  "common": {
    "dashboard": "Dashboard",
    "login": "Login",
    "logout": "Logout",
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit",
    "add": "Add",
    "search": "Search",
    "filter": "Filter",
    "export": "Export",
    "import": "Import",
    "close": "Close",
    "loading": "Loading...",
    "noData": "No data found",
    "error": "Error",
    "success": "Success",
    "warning": "Warning",
    "info": "Info"
  },
  "auth": {
    "email": "Email",
    "password": "Password",
    "rememberMe": "Remember me",
    "forgotPassword": "Forgot password?",
    "loginButton": "Sign In",
    "noAccount": "Don't have an account?",
    "signUp": "Sign Up",
    "emailRequired": "Email is required",
    "passwordRequired": "Password is required",
    "invalidEmail": "Invalid email",
    "loginSuccess": "Login successful",
    "loginError": "Login failed. Please try again"
  }
}
```

---

## Step 4: Setup RTL Theme

Update `src/themes/index.jsx`:

```javascript
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

// material-ui
import CssBaseline from '@mui/material/CssBaseline';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// RTL support
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// project imports
import useConfig from 'hooks/useConfig';
import buildPalette from './palette';
import buildTypography from './typography';
import componentsOverride from './overrides';
import customShadows from './custom-shadows';

// Create RTL cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

// Create LTR cache
const cacheLtr = createCache({
  key: 'muiltr',
});

// ==============================|| DEFAULT THEME - MAIN ||============================== //

export default function ThemeCustomization({ children }) {
  const { i18n } = useTranslation();
  const { state } = useConfig();
  const isRTL = i18n.language === 'fa';

  const theme = useMemo(() => {
    const palette = buildPalette(state.presetColor);
    const typography = buildTypography(state.fontFamily);

    return createTheme({
      breakpoints: {
        values: {
          xs: 0,
          sm: 768,
          md: 1024,
          lg: 1266,
          xl: 1440
        }
      },
      direction: isRTL ? 'rtl' : 'ltr',
      cssVariables: true,
      cssVarPrefix: '',
      defaultMode: 'light',
      palette,
      typography,
      customShadows: customShadows(palette)
    });
  }, [state.fontFamily, state.presetColor, isRTL]);

  const themeWithOverrides = useMemo(() => {
    const customizedTheme = { ...theme };
    customizedTheme.components = componentsOverride(customizedTheme);
    return customizedTheme;
  }, [theme]);

  return (
    <StyledEngineProvider injectFirst>
      <CacheProvider value={isRTL ? cacheRtl : cacheLtr}>
        <ThemeProvider theme={themeWithOverrides}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </CacheProvider>
    </StyledEngineProvider>
  );
}

ThemeCustomization.propTypes = {
  children: PropTypes.node
};
```

---

## Step 5: Initialize i18n in App

Update `src/index.jsx`:

```javascript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// project imports
import App from './App';
import { ConfigProvider } from 'contexts/ConfigContext';

// Import i18n
import './i18n';

// style
import 'simplebar-react/dist/simplebar.min.css';
import 'assets/third-party/apex-chart.css';
import 'assets/third-party/react-table.css';

// ==============================|| MAIN - REACT DOM RENDER ||============================== //

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <StrictMode>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </StrictMode>
);
```

---

## Step 6: Create Language Switcher Component

Create `src/components/LanguageSwitcher.jsx`:

```javascript
import { useTranslation } from 'react-i18next';

// material-ui
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

// assets
import GlobalOutlined from '@ant-design/icons/GlobalOutlined';
import { useState } from 'react';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // Update document direction
    document.dir = lng === 'fa' ? 'rtl' : 'ltr';
    handleClose();
  };

  return (
    <Box>
      <IconButton
        onClick={handleClick}
        color="secondary"
        sx={{ color: 'text.primary', bgcolor: 'grey.100' }}
      >
        <GlobalOutlined />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => changeLanguage('fa')}>
          فارسی
        </MenuItem>
        <MenuItem onClick={() => changeLanguage('en')}>
          English
        </MenuItem>
      </Menu>
    </Box>
  );
}
```

---

## Step 7: Add Persian Font

1. Download Vazir or IRANSans font
2. Place font files in `public/fonts/`
3. Update `src/assets/style.css`:

```css
@font-face {
  font-family: 'Vazir';
  src: url('/fonts/Vazir-Regular.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Vazir';
  src: url('/fonts/Vazir-Bold.woff2') format('woff2');
  font-weight: bold;
  font-style: normal;
  font-display: swap;
}

body[dir='rtl'] {
  font-family: 'Vazir', 'Segoe UI', Tahoma, sans-serif;
}
```

4. Update `src/config.js`:

```javascript
export const APP_DEFAULT_PATH = '/dashboard/default';
export const DRAWER_WIDTH = 260;
export const MINI_DRAWER_WIDTH = 60;

const config = {
  fontFamily: "'Vazir', 'Public Sans', sans-serif"
};

export default config;
```

---

## Step 8: Use Translations in Components

Example: Update Login page

```javascript
import { useTranslation } from 'react-i18next';

export default function AuthLogin() {
  const { t } = useTranslation();

  return (
    <form>
      <InputLabel htmlFor="email-login">
        {t('auth.email')}
      </InputLabel>
      <OutlinedInput
        id="email-login"
        type="email"
        placeholder={t('auth.email')}
      />
      
      <Button variant="contained">
        {t('auth.loginButton')}
      </Button>
    </form>
  );
}
```

---

## Step 9: Update Menu Items for i18n

Update `src/menu-items/dashboard.jsx`:

```javascript
import { useTranslation } from 'react-i18next';
import DashboardOutlined from '@ant-design/icons/DashboardOutlined';

const icons = {
  DashboardOutlined
};

// Use function to get translations
export const useDashboardMenu = () => {
  const { t } = useTranslation();
  
  return {
    id: 'group-dashboard',
    title: t('menu.dashboard'),
    type: 'group',
    children: [
      {
        id: 'dashboard',
        title: t('menu.dashboard'),
        type: 'item',
        url: '/dashboard/default',
        icon: icons.DashboardOutlined,
        breadcrumbs: false
      }
    ]
  };
};
```

---

## Step 10: Handle Persian Numbers

Create `src/utils/persianUtils.js`:

```javascript
export function toPersianDigits(number) {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(number).replace(/\d/g, (digit) => persianDigits[digit]);
}

export function toEnglishDigits(persianNumber) {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(persianNumber).replace(/[۰-۹]/g, (digit) => 
    persianDigits.indexOf(digit)
  );
}

export function formatPersianNumber(number) {
  return new Intl.NumberFormat('fa-IR').format(number);
}
```

---

## Step 11: Persian Date Handling

Create `src/utils/dateUtils.js`:

```javascript
import moment from 'moment-jalaali';

export function formatPersianDate(date, format = 'jYYYY/jMM/jDD') {
  return moment(date).format(format);
}

export function getPersianMonthName(monthNumber) {
  const months = [
    'فروردین', 'اردیبهشت', 'خرداد',
    'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر',
    'دی', 'بهمن', 'اسفند'
  ];
  return months[monthNumber - 1];
}
```

---

## Testing RTL

### Checklist:
- [ ] Text flows right to left
- [ ] Icons align to the right
- [ ] Drawer opens from the right
- [ ] Forms align correctly
- [ ] Tables align correctly
- [ ] Tooltips position correctly
- [ ] Persian font displays properly
- [ ] Numbers show in Persian
- [ ] Dates show in Persian calendar

---

## Common RTL Issues & Solutions

### Issue 1: Icons on wrong side
**Solution:** Use MUI's `sx` prop with `direction` awareness

```javascript
<Box sx={{ 
  display: 'flex', 
  flexDirection: 'row',
  // Will automatically reverse in RTL
}}>
```

### Issue 2: Padding/Margin incorrect
**Solution:** Use logical properties

```javascript
// Instead of paddingLeft, use
paddingInlineStart: '16px'

// Instead of marginRight, use
marginInlineEnd: '16px'
```

### Issue 3: Fixed positioning issues
**Solution:** Use `start` and `end` instead of `left` and `right`

```javascript
sx={{ 
  position: 'absolute',
  insetInlineStart: 0, // instead of left: 0
  insetInlineEnd: 0,   // instead of right: 0
}}
```

---

## Resources

- [Material-UI RTL Guide](https://mui.com/material-ui/guides/right-to-left/)
- [i18next Documentation](https://www.i18next.com/)
- [Vazir Font](https://github.com/rastikerdar/vazir-font)
- [Persian Date Utils](https://github.com/fingerpich/jalali-moment)

---

**Now you're ready to build a fully Persian/RTL admin panel! 🎉**
