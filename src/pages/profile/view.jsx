import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'components/MainCard';
import useAuth from 'hooks/useAuth';
import Avatar from 'components/@extended/Avatar';

// assets
import avatar1 from 'assets/images/users/avatar-1.png';
import EditOutlined from '@ant-design/icons/EditOutlined';

// ==============================|| PROFILE - VIEW ||============================== //

export default function ProfileView() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleEdit = () => {
    navigate('/profile/edit');
  };

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <MainCard
          title={t('profile.viewProfile')}
          secondary={
            <Button
              variant="contained"
              startIcon={<EditOutlined />}
              onClick={handleEdit}
              size="small"
            >
              {t('common.edit')}
            </Button>
          }
        >
          <Grid container spacing={3}>
            {/* Avatar and Basic Info */}
            <Grid size={12}>
              <Stack direction="row" spacing={2.5} alignItems="center">
                <Avatar alt="profile user" src={avatar1} sx={{ width: 72, height: 72 }} />
                <Stack spacing={0.5}>
                  <Typography variant="h5">{user?.name || 'User'}</Typography>
                  <Chip
                    label={user?.role && t(`roles.${user.role.replace('_', '')}`)}
                    color="primary"
                    size="small"
                    sx={{ width: 'fit-content' }}
                  />
                </Stack>
              </Stack>
            </Grid>

            {/* Profile Details - Simple Label: Value Format */}
            <Grid size={12}>
              <Stack spacing={2.5} sx={{ mt: 2 }}>
                {/* Full Name */}
                <Stack direction="row" spacing={2}>
                  <Typography variant="subtitle1" sx={{ minWidth: 140, color: 'text.secondary' }}>
                    {t('profile.fullName')}:
                  </Typography>
                  <Typography variant="body1">{user?.name || '-'}</Typography>
                </Stack>

                {/* Email */}
                <Stack direction="row" spacing={2}>
                  <Typography variant="subtitle1" sx={{ minWidth: 140, color: 'text.secondary' }}>
                    {t('profile.email')}:
                  </Typography>
                  <Typography variant="body1">{user?.email || '-'}</Typography>
                </Stack>

                {/* Role */}
                <Stack direction="row" spacing={2}>
                  <Typography variant="subtitle1" sx={{ minWidth: 140, color: 'text.secondary' }}>
                    {t('profile.role')}:
                  </Typography>
                  <Typography variant="body1">
                    {user?.role && t(`roles.${user.role.replace('_', '')}`)}
                  </Typography>
                </Stack>

                {/* Permissions */}
                <Stack direction="row" spacing={2}>
                  <Typography variant="subtitle1" sx={{ minWidth: 140, color: 'text.secondary' }}>
                    {t('profile.permissions')}:
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                    {user?.permissions && user.permissions.length > 0 ? (
                      <>
                        {user.permissions.slice(0, 5).map((permission, index) => (
                          <Chip key={index} label={permission} variant="outlined" size="small" />
                        ))}
                        {user.permissions.length > 5 && (
                          <Chip
                            label={`+${user.permissions.length - 5} ${t('common.more')}`}
                            variant="outlined"
                            size="small"
                            color="primary"
                          />
                        )}
                      </>
                    ) : (
                      <Typography variant="body1" color="textSecondary">
                        {t('profile.noPermissions')}
                      </Typography>
                    )}
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
}
