// third-party
import { useTranslation } from 'react-i18next';

// material-ui
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'components/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

export default function SamplePage() {
  const { t } = useTranslation();

  return (
    <MainCard title={t('samplePage.title')}>
      <Typography variant="body2">
        {t('samplePage.content')}
      </Typography>
    </MainCard>
  );
}
