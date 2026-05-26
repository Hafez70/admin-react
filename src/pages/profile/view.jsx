import { useTranslation } from 'react-i18next';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'components/MainCard';
import useAuth from 'hooks/useAuth';
import Avatar from 'components/@extended/Avatar';

// assets
import avatar1 from 'assets/images/users/avatar-1.png';

// ==============================|| PROFILE - VIEW ||============================== //

export default function ProfileView() {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <MainCard title={t('profile.viewProfile')}>
          <Grid container spacing={3}>
            {/* Avatar and Basic Info */}
            <Grid size={12}>
              <Stack direction="row" spacing={2.5} alignItems="center">
                <Avatar alt="profile user" src={avatar1} sx={{ width: 72, height: 72 }} />
                <Stack spacing={0.5}>
                  <Typography variant="h5">{user?.name || 'User'}</Typography>
                  <Typography color="secondary">{user?.email || ''}</Typography>
                  <Chip 
                    label={user?.role && t(`roles.${user.role.replace('_', '')}`)} 
                    color="primary" 
                    size="small" 
                    sx={{ width: 'fit-content' }}
                  />
                </Stack>
              </Stack>
            </Grid>

            <Grid size={12}>
              <Divider />
            </Grid>

            {/* Profile Details */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={1}>
                <Typography variant="caption" color="secondary">
                  {t('profile.fullName')}
                </Typography>
                <Typography variant="body1">{user?.name || '-'}</Typography>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={1}>
                <Typography variant="caption" color="secondary">
                  {t('profile.email')}
                </Typography>
                <Typography variant="body1">{user?.email || '-'}</Typography>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={1}>
                <Typography variant="caption" color="secondary">
                  {t('profile.role')}
                </Typography>
                <Typography variant="body1">
                  {user?.role && t(`roles.${user.role.replace('_', '')}`)}
                </Typography>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={1}>
                <Typography variant="caption" color="secondary">
                  {t('profile.status')}
                </Typography>
                <Box>
                  <Chip 
                    label={user?.isActive ? t('status.active') : t('status.inactive')} 
                    color={user?.isActive ? 'success' : 'error'} 
                    size="small" 
                  />
                </Box>
              </Stack>
            </Grid>

            <Grid size={12}>
              <Divider />
            </Grid>

            {/* Permissions */}
            <Grid size={12}>
              <Stack spacing={1}>
                <Typography variant="caption" color="secondary">
                  {t('profile.permissions')}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                  {user?.permissions && user.permissions.length > 0 ? (
                    user.permissions.slice(0, 5).map((permission, index) => (
                      <Chip 
                        key={index} 
                        label={permission} 
                        variant="outlined" 
                        size="small" 
                      />
                    ))
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      {t('profile.noPermissions')}
                    </Typography>
                  )}
                  {user?.permissions && user.permissions.length > 5 && (
                    <Chip 
                      label={`+${user.permissions.length - 5} ${t('common.more')}`} 
                      variant="outlined" 
                      size="small" 
                      color="primary"
                    />
                  )}
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
}
