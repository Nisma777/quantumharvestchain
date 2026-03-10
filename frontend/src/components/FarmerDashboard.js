import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { TextField, Button, Typography, Box, Paper, Grid } from '@mui/material';

const FarmerDashboard = () => {
  const { t } = useTranslation();
  const [crop, setCrop] = useState({ name: '', quantity: 0, expectedPrice: 0, location: { lat: 0, lng: 0 } });
  const [locationLoading, setLocationLoading] = useState(false);

  const getCurrentLocation = () => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCrop(prev => ({
            ...prev,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          }));
          setLocationLoading(false);
        },
        (error) => {
          alert('Unable to get location. Please allow location access.');
          setLocationLoading(false);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
      setLocationLoading(false);
    }
  };

  const handleAddCrop = async (e) => {
    e.preventDefault();
    if (crop.location.lat === 0 && crop.location.lng === 0) {
      alert('Please get your current location before adding crop.');
      return;
    }
    try {
      await axios.post('/api/crops', crop, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      alert('Crop added successfully');
      setCrop({ name: '', quantity: 0, expectedPrice: 0, location: { lat: 0, lng: 0 } });
    } catch (err) {
      alert(err.response?.data?.msg || 'Error adding crop');
    }
  };

  return (
    <Box sx={{ p: 3, background: 'linear-gradient(135deg, #1e5631 0%, #2d6a4f 50%, #40916c 100%)', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ color: 'white', mb: 3, textAlign: 'center' }}>
        🌾 {t('dashboard')} - Farmer
      </Typography>
      
      <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto', background: 'rgba(255, 255, 255, 0.95)' }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#1b4332' }}>
          Add New Crop
        </Typography>
        
        <Box component="form" onSubmit={handleAddCrop} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Crop Name"
            value={crop.name}
            onChange={(e) => setCrop({...crop, name: e.target.value})}
            required
            fullWidth
          />
          
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Quantity"
                type="number"
                value={crop.quantity}
                onChange={(e) => setCrop({...crop, quantity: parseFloat(e.target.value) || 0})}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Expected Price"
                type="number"
                value={crop.expectedPrice}
                onChange={(e) => setCrop({...crop, expectedPrice: parseFloat(e.target.value) || 0})}
                required
                fullWidth
              />
            </Grid>
          </Grid>
          
          <Typography variant="body2" sx={{ color: '#2d6a4f', fontWeight: 600 }}>
            📍 Crop Location
          </Typography>
          
          <Button
            onClick={getCurrentLocation}
            disabled={locationLoading}
            variant="outlined"
            sx={{
              borderColor: '#2ecc71',
              color: '#2ecc71',
              '&:hover': {
                borderColor: '#27ae60',
                backgroundColor: 'rgba(46, 204, 113, 0.1)',
              },
            }}
          >
            {locationLoading ? 'Getting Location...' : '📍 Get Current Location'}
          </Button>
          
          {(crop.location.lat !== 0 || crop.location.lng !== 0) && (
            <Typography variant="body2" sx={{ color: '#27ae60' }}>
              Location: {crop.location.lat.toFixed(6)}, {crop.location.lng.toFixed(6)}
            </Typography>
          )}
          
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              background: 'linear-gradient(45deg, #2ecc71 30%, #27ae60 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #27ae60 30%, #229954 90%)',
              },
            }}
          >
            {t('addCrop')}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default FarmerDashboard;