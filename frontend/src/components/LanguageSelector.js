import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Box } from '@mui/material';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        alignItems: 'center',
        ml: 2,
      }}
    >
      <span style={{ color: '#fff', fontSize: '1.2rem' }}>🌐</span>
      <Button
        color="inherit"
        onClick={() => handleLanguageChange('en')}
        sx={{
          fontWeight: i18n.language === 'en' ? 700 : 400,
          borderBottom: i18n.language === 'en' ? '2px solid #fff' : 'none',
          borderRadius: 0,
          textTransform: 'none',
          fontSize: 14,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        EN
      </Button>
      <span style={{ color: '#fff' }}>|</span>
      <Button
        color="inherit"
        onClick={() => handleLanguageChange('ta')}
        sx={{
          fontWeight: i18n.language === 'ta' ? 700 : 400,
          borderBottom: i18n.language === 'ta' ? '2px solid #fff' : 'none',
          borderRadius: 0,
          textTransform: 'none',
          fontSize: 14,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        TA
      </Button>
    </Box>
  );
};

export default LanguageSelector;