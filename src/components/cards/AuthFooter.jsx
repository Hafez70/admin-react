// third-party
import { useTranslation } from 'react-i18next';

// material-ui
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// project imports
import ContainerWrapper from 'components/ContainerWrapper';

// ==============================|| FOOTER - AUTHENTICATION ||============================== //

export default function AuthFooter() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <ContainerWrapper>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ gap: 2, justifyContent: { xs: 'center', sm: 'space-between' }, textAlign: { xs: 'center', sm: 'inherit' }, py: 2 }}
      >
        <Typography variant="subtitle2" color="secondary">
          {t('footer.copyright', { year: currentYear })} {t('footer.madeBy')}{' '}
          <Link href="https://github.com/Hafez70" target="_blank" underline="hover">
            Hafez70
          </Link>
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: { xs: 1, sm: 3 }, textAlign: { xs: 'center', sm: 'inherit' } }}>
          <Typography
            variant="subtitle2"
            color="secondary"
            component={Link}
            href="https://github.com/Hafez70"
            target="_blank"
            underline="hover"
          >
            {t('footer.github')}
          </Typography>
          <Typography
            variant="subtitle2"
            color="secondary"
            component={Link}
            href="mailto:hafez.gh.mohammadi@gmail.com"
            underline="hover"
          >
            {t('footer.contact')}
          </Typography>
        </Stack>
      </Stack>
    </ContainerWrapper>
  );
}
