import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import MainCard from 'components/MainCard';
import useAuth from 'hooks/useAuth';
import Avatar from 'components/@extended/Avatar';
import AnimateButton from 'components/@extended/AnimateButton';
import { showSuccess, showError } from 'utils/toast';

// assets
import avatar1 from 'assets/images/users/avatar-1.png';

// ==============================|| PROFILE - EDIT ||============================== //

export default function ProfileEdit() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  const handleCancel = () => {
    navigate('/profile/view');
  };

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <MainCard title={t('profile.editProfile')}>
          <Formik
            initialValues={{
              name: user?.name || '',
              email: user?.email || '',
              submit: null
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().max(255).required(t('validation.nameRequired')),
              email: Yup.string().email(t('auth.mustBeValidEmail')).max(255).required(t('auth.emailRequired'))
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
              try {
                // Update user data
                await updateUser({
                  ...user,
                  name: values.name,
                  email: values.email
                });
                setStatus({ success: true });
                showSuccess(t('toast.updateSuccess'));
                setSubmitting(false);
                // Navigate back to view profile
                setTimeout(() => {
                  navigate('/profile/view');
                }, 300);
              } catch (err) {
                console.error('Update error:', err);
                setStatus({ success: false });
                setErrors({ submit: err.message || t('toast.updateError') });
                showError(t('toast.updateError'));
                setSubmitting(false);
              }
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  {/* Avatar Section */}
                  <Grid size={12}>
                    <Stack spacing={2.5} alignItems="center">
                      <Avatar alt="profile user" src={avatar1} sx={{ width: 124, height: 124 }} />
                      {/* Avatar upload will be added later */}
                    </Stack>
                  </Grid>

                  <Grid size={12}>
                    <Divider />
                  </Grid>

                  {/* Name Field */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="profile-name">{t('profile.fullName')}*</InputLabel>
                      <OutlinedInput
                        id="profile-name"
                        type="text"
                        value={values.name}
                        name="name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder={t('profile.enterName')}
                        fullWidth
                        error={Boolean(touched.name && errors.name)}
                      />
                      {touched.name && errors.name && (
                        <FormHelperText error id="helper-text-profile-name">
                          {errors.name}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>

                  {/* Email Field */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="profile-email">{t('profile.email')}*</InputLabel>
                      <OutlinedInput
                        id="profile-email"
                        type="email"
                        value={values.email}
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder={t('auth.enterEmail')}
                        fullWidth
                        error={Boolean(touched.email && errors.email)}
                      />
                      {touched.email && errors.email && (
                        <FormHelperText error id="helper-text-profile-email">
                          {errors.email}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>

                  {errors.submit && (
                    <Grid size={12}>
                      <FormHelperText error>{errors.submit}</FormHelperText>
                    </Grid>
                  )}

                  <Grid size={12}>
                    <Divider />
                  </Grid>

                  {/* Action Buttons */}
                  <Grid size={12}>
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                      <Button color="secondary" onClick={handleCancel}>
                        {t('common.cancel')}
                      </Button>
                      <AnimateButton>
                        <Button
                          disableElevation
                          disabled={isSubmitting}
                          fullWidth={false}
                          size="large"
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          {isSubmitting ? t('common.loading') : t('common.save')}
                        </Button>
                      </AnimateButton>
                    </Stack>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </MainCard>
      </Grid>
    </Grid>
  );
}
