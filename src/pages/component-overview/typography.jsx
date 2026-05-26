// third-party
import { useTranslation } from 'react-i18next';

// material-ui
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'components/MainCard';

// ==============================|| COMPONENTS - TYPOGRAPHY ||============================== //

export default function ComponentTypography() {
  const { t } = useTranslation();

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, lg: 6 }}>
        <Stack sx={{ gap: 3 }}>
          <MainCard title={t('typography.basic')}>
            <Stack sx={{ gap: 0.75, mt: -1.5 }}>
              <Typography variant="h1">Inter</Typography>
              <Typography variant="h5">{t('typography.fontFamily')}</Typography>
              <Breadcrumbs aria-label="breadcrumb">
                <Typography variant="h6">{t('typography.regular')}</Typography>
                <Typography variant="h6">{t('typography.medium')}</Typography>
                <Typography variant="h6">{t('typography.bold')}</Typography>
              </Breadcrumbs>
            </Stack>
          </MainCard>
          <MainCard title={t('typography.heading')}>
            <Stack sx={{ gap: 2 }}>
              <Typography variant="h1">{t('typography.h1Heading')}</Typography>
              <Breadcrumbs aria-label="breadcrumb">
                <Typography variant="h6">{t('typography.size')}: 38px</Typography>
                <Typography variant="h6">{t('typography.weight')}: {t('typography.bold')}</Typography>
                <Typography variant="h6">{t('typography.lineHeight')}: 46px</Typography>
              </Breadcrumbs>
              <Divider />

              <Typography variant="h2">{t('typography.h2Heading')}</Typography>
              <Breadcrumbs aria-label="breadcrumb">
                <Typography variant="h6">{t('typography.size')}: 30px</Typography>
                <Typography variant="h6">{t('typography.weight')}: {t('typography.bold')}</Typography>
                <Typography variant="h6">{t('typography.lineHeight')}: 38px</Typography>
              </Breadcrumbs>
              <Divider />

              <Typography variant="h3">{t('typography.h3Heading')}</Typography>
              <Breadcrumbs aria-label="breadcrumb">
                <Typography variant="h6">{t('typography.size')}: 24px</Typography>
                <Typography variant="h6">{t('typography.weight')}: {t('typography.regular')} & {t('typography.bold')}</Typography>
                <Typography variant="h6">{t('typography.lineHeight')}: 32px</Typography>
              </Breadcrumbs>
              <Divider />

              <Typography variant="h4">{t('typography.h4Heading')}</Typography>
              <Breadcrumbs aria-label="breadcrumb">
                <Typography variant="h6">{t('typography.size')}: 20px</Typography>
                <Typography variant="h6">{t('typography.weight')}: {t('typography.bold')}</Typography>
                <Typography variant="h6">{t('typography.lineHeight')}: 28px</Typography>
              </Breadcrumbs>
              <Divider />

              <Typography variant="h5">{t('typography.h5Heading')}</Typography>
              <Breadcrumbs aria-label="breadcrumb">
                <Typography variant="h6">{t('typography.size')}: 16px</Typography>
                <Typography variant="h6">{t('typography.weight')}: {t('typography.regular')} & {t('typography.medium')} & {t('typography.bold')}</Typography>
                <Typography variant="h6">{t('typography.lineHeight')}: 24px</Typography>
              </Breadcrumbs>
              <Divider />

              <Typography variant="h6">{t('typography.h6Heading')}</Typography>
              <Breadcrumbs aria-label="breadcrumb">
                <Typography variant="h6">{t('typography.size')}: 14px</Typography>
                <Typography variant="h6">{t('typography.weight')}: {t('typography.regular')}</Typography>
                <Typography variant="h6">{t('typography.lineHeight')}: 22px</Typography>
              </Breadcrumbs>
            </Stack>
          </MainCard>
          <MainCard title={t('typography.body1')}>
            <Typography variant="body1" gutterBottom>
              {t('typography.sampleText')}
            </Typography>
            <Breadcrumbs aria-label="breadcrumb">
              <Typography variant="h6">{t('typography.size')}: 14px</Typography>
              <Typography variant="h6">{t('typography.weight')}: {t('typography.regular')}</Typography>
              <Typography variant="h6">{t('typography.lineHeight')}: 22px</Typography>
            </Breadcrumbs>
          </MainCard>
          <MainCard title={t('typography.body2')}>
            <Typography variant="body2" gutterBottom>
              {t('typography.sampleText')}
            </Typography>
            <Breadcrumbs aria-label="breadcrumb">
              <Typography variant="h6">{t('typography.size')}: 12px</Typography>
              <Typography variant="h6">{t('typography.weight')}: {t('typography.regular')}</Typography>
              <Typography variant="h6">{t('typography.lineHeight')}: 20px</Typography>
            </Breadcrumbs>
          </MainCard>
          <MainCard title={t('typography.subtitle1')}>
            <Typography variant="subtitle1" gutterBottom>
              {t('typography.sampleText')}
            </Typography>
            <Breadcrumbs aria-label="breadcrumb">
              <Typography variant="h6">{t('typography.size')}: 14px</Typography>
              <Typography variant="h6">{t('typography.weight')}: {t('typography.medium')}</Typography>
              <Typography variant="h6">{t('typography.lineHeight')}: 22px</Typography>
            </Breadcrumbs>
          </MainCard>
          <MainCard title={t('typography.subtitle2')}>
            <Typography variant="subtitle2" gutterBottom>
              {t('typography.sampleText')}
            </Typography>
            <Breadcrumbs aria-label="breadcrumb">
              <Typography variant="h6">{t('typography.size')}: 12px</Typography>
              <Typography variant="h6">{t('typography.weight')}: {t('typography.medium')}</Typography>
              <Typography variant="h6">{t('typography.lineHeight')}: 20px</Typography>
            </Breadcrumbs>
          </MainCard>
          <MainCard title={t('typography.caption')}>
            <Stack sx={{ gap: 1 }}>
              <Typography variant="caption">
                {t('typography.sampleText')}
              </Typography>
              <Breadcrumbs aria-label="breadcrumb">
                <Typography variant="h6">{t('typography.size')}: 12px</Typography>
                <Typography variant="h6">{t('typography.weight')}: {t('typography.regular')}</Typography>
                <Typography variant="h6">{t('typography.lineHeight')}: 20px</Typography>
              </Breadcrumbs>
            </Stack>
          </MainCard>
        </Stack>
      </Grid>
      <Grid size={{ xs: 12, lg: 6 }}>
        <Stack sx={{ gap: 3 }}>
          <MainCard title={t('typography.alignment')}>
            <Typography variant="body2" gutterBottom>
              {t('typography.sampleText')}
            </Typography>
            <Typography variant="body2" textAlign="center" gutterBottom>
              {t('typography.sampleText')}
            </Typography>
            <Typography variant="body2" textAlign="right">
              {t('typography.sampleText')}
            </Typography>
          </MainCard>
          <MainCard title={t('typography.gutterBottom')}>
            <Typography variant="body1" gutterBottom>
              {t('typography.sampleText')}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {t('typography.sampleText')}
            </Typography>
            <Breadcrumbs aria-label="breadcrumb">
              <Typography variant="h6">{t('typography.size')}: 12px</Typography>
              <Typography variant="h6">{t('typography.weight')}: {t('typography.regular')}</Typography>
              <Typography variant="h6">{t('typography.lineHeight')}: 20px</Typography>
            </Breadcrumbs>
          </MainCard>
          <MainCard title={t('typography.overline')}>
            <Stack sx={{ gap: 1.5 }}>
              <Typography variant="overline">
                {t('typography.sampleText')}
              </Typography>
              <Breadcrumbs aria-label="breadcrumb">
                <Typography variant="h6">{t('typography.size')}: 12px</Typography>
                <Typography variant="h6">{t('typography.weight')}: {t('typography.regular')}</Typography>
                <Typography variant="h6">{t('typography.lineHeight')}: 20px</Typography>
              </Breadcrumbs>
            </Stack>
          </MainCard>
          <MainCard title={t('typography.link')}>
            <Stack sx={{ gap: 1.5 }}>
              <Link href="https://github.com/Hafez70">github.com/Hafez70</Link>
              <Breadcrumbs aria-label="breadcrumb">
                <Typography variant="h6">{t('typography.size')}: 12px</Typography>
                <Typography variant="h6">{t('typography.weight')}: {t('typography.regular')}</Typography>
                <Typography variant="h6">{t('typography.lineHeight')}: 20px</Typography>
              </Breadcrumbs>
            </Stack>
          </MainCard>
          <MainCard title={t('typography.colors')}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              {t('typography.textPrimary')}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {t('typography.textSecondary')}
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              {t('typography.primaryColor')}
            </Typography>
            <Typography variant="h6" color="secondary" gutterBottom>
              {t('typography.secondaryColor')}
            </Typography>
            <Typography variant="h6" color="success" gutterBottom>
              {t('typography.successColor')}
            </Typography>
            <Typography variant="h6" sx={{ color: 'warning.main' }} gutterBottom>
              {t('typography.warningColor')}
            </Typography>
            <Typography variant="h6" color="error" gutterBottom>
              {t('typography.errorColor')}
            </Typography>
          </MainCard>
          <MainCard title={t('typography.paragraph')}>
            <Typography variant="body1" gutterBottom>
              {t('typography.sampleText')} {t('typography.sampleText')}
            </Typography>
            <Breadcrumbs aria-label="breadcrumb">
              <Typography variant="h6">{t('typography.size')}: 14px</Typography>
              <Typography variant="h6">{t('typography.weight')}: {t('typography.regular')}</Typography>
              <Typography variant="h6">{t('typography.lineHeight')}: 22px</Typography>
            </Breadcrumbs>
          </MainCard>
          <MainCard title={t('typography.fontStyle')}>
            <Typography variant="body1" gutterBottom sx={{ fontStyle: 'italic' }}>
              {t('typography.italicText')}
            </Typography>
            <Typography variant="subtitle1" gutterBottom sx={{ fontStyle: 'italic' }}>
              {t('typography.italicText')}
            </Typography>
            <Breadcrumbs aria-label="breadcrumb">
              <Typography variant="h6">{t('typography.size')}: 14px</Typography>
              <Typography variant="h6">{t('typography.weight')}: Italic {t('typography.regular')} & Italic {t('typography.bold')}</Typography>
              <Typography variant="h6">{t('typography.lineHeight')}: 22px</Typography>
            </Breadcrumbs>
          </MainCard>
        </Stack>
      </Grid>
    </Grid>
  );
}
