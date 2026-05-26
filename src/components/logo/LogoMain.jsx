// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

// ==============================|| LOGO SVG ||============================== //

export default function LogoMain() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      {/* Circle Logo - Easy to replace */}
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${theme.vars.palette.primary.main} 0%, ${theme.vars.palette.primary.dark} 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 2px 8px ${theme.vars.palette.primary.light}40`
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: 'white',
            fontWeight: 700,
            fontSize: '1.25rem'
          }}
        >
          A
        </Typography>
      </Box>

      {/* App Title - Translatable */}
      <Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: theme.vars.palette.text.primary,
            lineHeight: 1,
            fontSize: '1rem'
          }}
        >
          Admin Panel
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: theme.vars.palette.text.secondary,
            fontSize: '0.625rem',
            lineHeight: 1
          }}
        >
          {t('common.dashboard')}
        </Typography>
      </Box>
    </Box>
  );
}

// HOW TO CUSTOMIZE:
// 1. Change the letter "A" to your app's initial
// 2. Change "Admin Panel" to your app name
// 3. Change gradient colors in the circle
// 4. Or replace the entire circle with your logo image:
//    <img src="/logo.png" alt="Logo" style={{ width: 36, height: 36 }} />

