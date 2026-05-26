// material-ui
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// i18n
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      sx={{ gap: 1.5, alignItems: 'center', justifyContent: 'space-between', p: '24px 16px 0px', mt: 'auto' }}
    >
      <Typography variant="caption">
        {t('footer.copyright', { year: currentYear })} {t('footer.madeBy')}{' '}
        <Link href="https://github.com/Hafez70" target="_blank" underline="hover">
          Hafez70
        </Link>
      </Typography>
      <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="https://github.com/Hafez70" target="_blank" variant="caption" color="text.primary">
          {t('footer.github')}
        </Link>
        <Link href="mailto:hafez.gh.mohammadi@gmail.com" variant="caption" color="text.primary">
          {t('footer.contact')}
        </Link>
      </Stack>
    </Stack>
  );
}
