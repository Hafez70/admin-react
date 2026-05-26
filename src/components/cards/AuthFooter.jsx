// material-ui
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// project imports
import ContainerWrapper from 'components/ContainerWrapper';

// ==============================|| FOOTER - AUTHENTICATION ||============================== //

export default function AuthFooter() {
  return (
    <ContainerWrapper>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ gap: 2, justifyContent: { xs: 'center', sm: 'space-between' }, textAlign: { xs: 'center', sm: 'inherit' }, py: 2 }}
      >
        <Typography variant="subtitle2" color="secondary">
          © {new Date().getFullYear()} Taski Admin. Made by{' '}
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
            GitHub
          </Typography>
          <Typography
            variant="subtitle2"
            color="secondary"
            component={Link}
            href="mailto:hafez.gh.mohammadi@gmail.com"
            underline="hover"
          >
            Contact
          </Typography>
        </Stack>
      </Stack>
    </ContainerWrapper>
  );
}
