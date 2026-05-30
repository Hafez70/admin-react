import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// material-ui
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// project imports
import useAuth from 'hooks/useAuth';
import { showSuccess } from 'utils/toast';

// assets
import EditOutlined from '@ant-design/icons/EditOutlined';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

export default function ProfileTab({ handleLogout }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { logout } = useAuth();

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  const handleViewProfile = () => {
    navigate('/profile/view');
  };

  const onLogout = async () => {
    if (handleLogout) {
      handleLogout();
    } else {
      await logout();
      showSuccess(t('toast.logoutSuccess'));
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 300);
    }
  };

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
      <ListItemButton onClick={handleViewProfile}>
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary={t('profile.viewProfile')} />
      </ListItemButton>
      <ListItemButton onClick={handleEditProfile}>
        <ListItemIcon>
          <EditOutlined />
        </ListItemIcon>
        <ListItemText primary={t('profile.editProfile')} />
      </ListItemButton>
      <ListItemButton onClick={onLogout}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary={t('common.logout')} />
      </ListItemButton>
    </List>
  );
}

ProfileTab.propTypes = { handleLogout: PropTypes.func };
