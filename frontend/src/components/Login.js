import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography, Box, Alert, Paper, Avatar } from '@mui/material';
import { motion } from 'framer-motion';

const Login = () => {
  const { t } = useTranslation();
  const [aadhaar, setAadhaar] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // send current URL as a plain string
    const locationString = window.location.href;

    try {
      const res = await axios.post('/api/auth/login', {
        aadhaar,
        location: locationString,
      });
      localStorage.setItem('token', res.data.token);
      const { role } = res.data.user;
      navigate(role === 'Farmer' ? '/farmer' : '/middleman');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 64px)',
        width: '100%',
        padding: 2,
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Paper
          elevation={10}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            width: '100%',
            maxWidth: 450,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
        <motion.div variants={itemVariants}>
          <Avatar
            sx={{
              m: 1,
              bgcolor: '#2ecc71',
              width: 56,
              height: 56,
              fontSize: '2rem',
            }}
          >
            🔐
          </Avatar>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Typography component="h1" variant="h4" sx={{ fontWeight: 700, color: '#1b4332', mb: 1 }}>
            {t('app.title')}
          </Typography>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Typography component="p" variant="body2" sx={{ color: '#40916c', mb: 3 }}>
            {t('auth.login')} - Smart Agricultural Platform
          </Typography>
        </motion.div>

        {error && (
          <Alert
            severity="error"
            sx={{
              mt: 2,
              width: '100%',
              borderRadius: 2,
              '& .MuiAlert-icon': {
                color: '#e74c3c',
              },
            }}
          >
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="aadhaar"
            label={t('auth.aadhaar')}
            name="aadhaar"
            autoComplete="off"
            value={aadhaar}
            onChange={(e) => setAadhaar(e.target.value)}
            inputProps={{ maxLength: 12, pattern: '\\d{12}' }}
            placeholder="Enter 12-digit Aadhaar"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover fieldset': {
                  borderColor: '#2ecc71',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#2ecc71',
                  boxShadow: '0 0 0 3px rgba(46, 204, 113, 0.1)',
                },
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              borderRadius: 2,
              fontSize: 16,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              background: 'linear-gradient(135deg, #2ecc71, #27ae60)',
              boxShadow: '0 4px 15px rgba(46, 204, 113, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(46, 204, 113, 0.4)',
              },
              '&:disabled': {
                background: '#ccc',
              },
            }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : t('auth.submit')}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
              Don't have an account?
            </Typography>
            <Link
              to="/register"
              style={{
                color: '#2ecc71',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: 14,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#27ae60')}
              onMouseLeave={(e) => (e.target.style.color = '#2ecc71')}
            >
              Create an account here
            </Link>
          </Box>
        </Box>
      </Paper>
      </motion.div>
    </Box>
  );
};

export default Login;