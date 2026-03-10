import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography, Box, Alert, FormControl, InputLabel, Select, MenuItem, Paper, Avatar } from '@mui/material';

const Register = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    aadhaar: '',
    role: 'Farmer',
    phone: '',
    location: { lat: 0, lng: 0 }
  });
  const [error, setError] = useState('');
  const [locationLoading, setLocationLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('location.')) {
      const [key] = name.split('.').slice(-1);
      setFormData(prev => ({ ...prev, location: { ...prev.location, [key]: parseFloat(value) || 0 } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const getCurrentLocation = () => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          }));
          setLocationLoading(false);
        },
        (error) => {
          setError('Unable to get location. Please allow location access.');
          setLocationLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      setLocationLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.aadhaar.length !== 12 || !/^\d+$/.test(formData.aadhaar)) {
      setError('Invalid Aadhaar. Must be 12 digits.');
      return;
    }
    if (formData.location.lat === 0 && formData.location.lng === 0) {
      setError('Please get your current location before registering.');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      const { role } = res.data.user;
      navigate(role === 'Farmer' ? '/farmer' : '/middleman');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed. Please try again.');
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
          maxWidth: 500,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Avatar
          sx={{
            m: 1,
            bgcolor: '#2ecc71',
            width: 56,
            height: 56,
            fontSize: '2rem',
          }}
        >
          👤
        </Avatar>
        <Typography component="h1" variant="h4" sx={{ fontWeight: 700, color: '#1b4332', mb: 1 }}>
          {t('app.title')}
        </Typography>
        <Typography component="p" variant="body2" sx={{ color: '#40916c', mb: 3 }}>
          {t('auth.register')} - Join the Smart Agricultural Platform
        </Typography>

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
            name="aadhaar"
            label={t('auth.aadhaar')}
            id="aadhaar"
            autoComplete="off"
            value={formData.aadhaar}
            onChange={handleChange}
            inputProps={{ maxLength: 12 }}
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
          
          <FormControl fullWidth margin="normal" required sx={{ borderRadius: 2 }}>
            <InputLabel sx={{ color: '#2d6a4f' }}>{t('auth.role')}</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              label={t('auth.role')}
              sx={{
                borderRadius: 2,
                '&:hover fieldset': {
                  borderColor: '#2ecc71',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#2ecc71',
                },
              }}
            >
              <MenuItem value="Farmer">🌾 {t('auth.farmer')}</MenuItem>
              <MenuItem value="Middleman">🚚 {t('auth.middleman')}</MenuItem>
            </Select>
          </FormControl>

          <TextField
            margin="normal"
            required
            fullWidth
            name="phone"
            label={t('auth.phone')}
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="10-digit phone number"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover fieldset': {
                  borderColor: '#2ecc71',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#2ecc71',
                },
              },
            }}
          />

          <Typography variant="body2" sx={{ color: '#2d6a4f', fontWeight: 600, mt: 2, mb: 1 }}>
            📍 Location
          </Typography>

          <Button
            onClick={getCurrentLocation}
            disabled={locationLoading}
            variant="outlined"
            sx={{
              mb: 2,
              borderColor: '#2ecc71',
              color: '#2ecc71',
              '&:hover': {
                borderColor: '#27ae60',
                backgroundColor: 'rgba(46, 204, 113, 0.1)',
              },
              '&:disabled': {
                borderColor: '#bdc3c7',
                color: '#bdc3c7',
              },
            }}
          >
            {locationLoading ? 'Getting Location...' : '📍 Get Current Location'}
          </Button>

          {(formData.location.lat !== 0 || formData.location.lng !== 0) && (
            <Typography variant="body2" sx={{ color: '#27ae60', mb: 2 }}>
              Location: {formData.location.lat.toFixed(6)}, {formData.location.lng.toFixed(6)}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 4,
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
            {loading ? 'Creating Account...' : t('auth.submit')}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
              Already have an account?
            </Typography>
            <Link
              to="/"
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
              Sign in here
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;