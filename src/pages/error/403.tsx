import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import { APP_DEFAULT_PATH } from 'config';

// assets
import error403 from 'assets/images/maintenance/img-error-purple.svg';

// ==============================|| ERROR 403 - FORBIDDEN ||============================== //

export default function Error403() {
  const { t } = useTranslation();

  return (
    <Grid
      container
      spacing={10}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', pt: 2, pb: 2 }}
    >
      <Grid item xs={12}>
        <Box sx={{ width: { xs: 300, sm: 480 } }}>
          <img src={error403} alt="error 403" style={{ width: '100%', height: 'auto' }} />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Typography variant="h1">{t('errors.forbidden')}</Typography>
          <Typography color="text.secondary" align="center" sx={{ width: { xs: '73%', sm: '70%' } }}>
            {t('errors.forbiddenMessage')}
          </Typography>
          <Button component={Link} to={APP_DEFAULT_PATH} variant="contained">
            {t('errors.backToHome')}
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
