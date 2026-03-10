import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Register = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    aadhaar: '',
    role: 'Farmer',
    phone: '',
    location: { lat: 0, lng: 0 }
  });
  const [error, setError] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.aadhaar.length !== 12 || !/^\d+$/.test(formData.aadhaar)) {
      setError(t('auth.invalidAadhaar'));
      return;
    }
    try {
      const res = await axios.post('/api/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      const { role } = res.data.user;
      navigate(role === 'Farmer' ? '/farmer' : '/middleman'); // Redirect to dashboard (stub)
    } catch (err) {
      setError(err.response?.data?.msg || t('auth.error'));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          {t('app.title')} - {t('auth.register')}
        </Typography>
        {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>{t('auth.role')}</InputLabel>
            <Select name="role" value={formData.role} onChange={handleChange} label={t('auth.role')}>
              <MenuItem value="Farmer">{t('auth.farmer')}</MenuItem>
              <MenuItem value="Middleman">{t('auth.middleman')}</MenuItem>
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
          />
          <TextField
            margin="normal"
            fullWidth
            name="location.lat"
            label="Latitude"
            type="number"
            value={formData.location.lat}
            onChange={handleChange}
            inputProps={{ step: "0.000001" }}
          />
          <TextField
            margin="normal"
            fullWidth
            name="location.lng"
            label="Longitude"
            type="number"
            value={formData.location.lng}
            onChange={handleChange}
            inputProps={{ step: "0.000001" }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {t('auth.submit')}
          </Button>
          <Link to="/" variant="body2">
            {t('auth.login')}?
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;