import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';

const Login = () => {
  const { t } = useTranslation();
  const [aadhaar, setAadhaar] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/auth/login', { aadhaar });
      localStorage.setItem('token', res.data.token);
      const { role } = res.data.user;
      navigate(role === 'Farmer' ? '/farmer' : '/middleman'); // Redirect to dashboard (stub for now)
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
          {t('app.title')} - {t('auth.login')}
        </Typography>
        {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {t('auth.submit')}
          </Button>
          <Link to="/register" variant="body2">
            {t('auth.register')}?
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;