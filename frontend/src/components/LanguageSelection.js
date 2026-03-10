import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LanguageSelectionPage = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const handleLanguageSelect = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    navigate('/login');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e5631 0%, #2d6a4f 50%, #40916c 100%)',
        padding: 2,
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Paper
          elevation={15}
          sx={{
            padding: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.99)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            width: '100%',
            maxWidth: 600,
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Logo/Title */}
          <motion.div variants={itemVariants}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                color: '#1b4332',
                mb: 2,
                fontSize: { xs: '2.5rem', sm: '3.5rem' },
              }}
            >
              🌾
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: '#1b4332',
                mb: 1,
                textAlign: 'center',
                fontSize: { xs: '1.8rem', sm: '2.5rem' },
              }}
            >
              QuantumHarvestChain
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              variant="h6"
              sx={{
                color: '#40916c',
                mb: 4,
                textAlign: 'center',
                fontWeight: 500,
                fontSize: { xs: '0.95rem', sm: '1.1rem' },
              }}
            >
              Transparent Agri-Trading Platform
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Box
              sx={{
                width: '100%',
                height: 3,
                background: 'linear-gradient(90deg, #2ecc71, #27ae60)',
                borderRadius: 2,
                mb: 5,
              }}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              variant="body1"
              sx={{
                color: '#2d6a4f',
                mb: 5,
                textAlign: 'center',
                fontWeight: 500,
                fontSize: { xs: '1rem', sm: '1.2rem' },
              }}
            >
              Select Your Language / உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்
            </Typography>
          </motion.div>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 3,
              width: '100%',
              mb: 3,
            }}
          >
            {/* English Button */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => handleLanguageSelect('en')}
                sx={{
                  py: 4,
                  px: 3,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #2ecc71, #27ae60)',
                  color: 'white',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 25px rgba(46, 204, 113, 0.3)',
                  border: '2px solid transparent',
                  '&:hover': {
                    transform: 'translateY(-5px) scale(1.02)',
                    boxShadow: '0 15px 40px rgba(46, 204, 113, 0.5)',
                  },
                  '&:active': {
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                  <span style={{ fontSize: '2.5rem' }}>🇬🇧</span>
                  <span>ENGLISH</span>
                </Box>
              </Button>
            </motion.div>

            {/* Tamil Button */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => handleLanguageSelect('ta')}
                sx={{
                  py: 4,
                  px: 3,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #ff6b6b, #c92a2a)',
                  color: 'white',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 25px rgba(255, 107, 107, 0.3)',
                  border: '2px solid transparent',
                  '&:hover': {
                    transform: 'translateY(-5px) scale(1.02)',
                    boxShadow: '0 15px 40px rgba(255, 107, 107, 0.5)',
                  },
                  '&:active': {
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                  <span style={{ fontSize: '2.5rem' }}>🇮🇳</span>
                  <span>தமிழ்</span>
                </Box>
              </Button>
            </motion.div>
          </Box>

          {/* Footer */}
          <motion.div variants={itemVariants}>
            <Box
              sx={{
                width: '100%',
                pt: 4,
                borderTop: '1px solid rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
              }}
            >
              <Typography variant="caption" sx={{ color: '#999' }}>
                © 2026 QuantumHarvestChain. All rights reserved.
              </Typography>
            </Box>
          </motion.div>
        </Paper>
      </motion.div>

      {/* Decorative elements */}
      <Box
        sx={{
          position: 'fixed',
          top: 20,
          left: 20,
          fontSize: '3rem',
          opacity: 0.1,
          zIndex: -1,
        }}
      >
        🌾
      </Box>
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          fontSize: '3rem',
          opacity: 0.1,
          zIndex: -1,
        }}
      >
        🚜
      </Box>
    </Box>
  );
};

export default LanguageSelectionPage;