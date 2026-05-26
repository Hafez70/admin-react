import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// material-ui
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';

// assets
import GlobalOutlined from '@ant-design/icons/GlobalOutlined';
import CheckOutlined from '@ant-design/icons/CheckOutlined';

// ==============================|| LANGUAGE SWITCHER ||============================== //

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.dir = lng === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
    handleClose();
  };

  const languages = [
    { code: 'fa', name: 'فارسی', flag: '🇮🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  return (
    <Box>
      <IconButton
        onClick={handleClick}
        color="secondary"
        sx={{ color: 'text.primary', bgcolor: 'grey.100' }}
        title="Change Language"
      >
        <GlobalOutlined />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            selected={i18n.language === lang.code}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              {i18n.language === lang.code && <CheckOutlined />}
            </ListItemIcon>
            <ListItemText>
              {lang.flag} {lang.name}
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
