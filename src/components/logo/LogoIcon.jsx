// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// ==============================|| LOGO ICON SVG ||============================== //

export default function LogoIcon() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: 32,
        height: 32,
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${theme.vars.palette.primary.main} 0%, ${theme.vars.palette.primary.dark} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 2px 6px ${theme.vars.palette.primary.light}40`
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: 'white',
          fontWeight: 700,
          fontSize: '1.125rem'
        }}
      >
        A
      </Typography>
    </Box>
  );
}

// HOW TO CUSTOMIZE:
// Change the letter "A" to your app's initial
// Or replace with an icon/image

