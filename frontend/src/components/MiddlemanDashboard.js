import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { TextField, Button, Typography, Box, Paper, List, ListItem, ListItemText, Grid, Card, CardContent } from '@mui/material';

const MiddlemanDashboard = () => {
  const { t } = useTranslation();
  const [crops, setCrops] = useState([]);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);

  useEffect(() => {
    if (location.lat !== 0 || location.lng !== 0) {
      fetchCrops();
    }
  }, [location]);

  const getCurrentLocation = () => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
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

  const fetchCrops = async () => {
    try {
      const res = await axios.get(`/api/crops/nearby?lat=${location.lat}&lng=${location.lng}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      setCrops(res.data);
    } catch (err) {
      alert(err.response?.data?.msg || 'Error fetching crops');
    }
  };

  const selectCrop = async (cropId) => {
    setSelectedCrop(cropId);
    try {
      const res = await axios.get(`/api/orders/crop/${cropId}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      alert(`Farmer: ${res.data.name}, Phone: ${res.data.phone}`);
    } catch (err) {
      alert('Error fetching farmer details');
    }
  };

  const purchase = async (cropId, quantity) => {
    try {
      await axios.post('/api/orders', { cropId, quantity }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      alert('Order placed with advance!');
      fetchCrops(); // Refresh crops
    } catch (err) {
      alert(err.response?.data?.msg || 'Error placing order');
    }
  };

  return (
    <Box sx={{ p: 3, background: 'linear-gradient(135deg, #1e5631 0%, #2d6a4f 50%, #40916c 100%)', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ color: 'white', mb: 3, textAlign: 'center' }}>
        🚚 {t('dashboard')} - Middleman
      </Typography>
      
      <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto', background: 'rgba(255, 255, 255, 0.95)', mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#1b4332' }}>
          Find Nearby Crops
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Button
            onClick={getCurrentLocation}
            disabled={locationLoading}
            variant="outlined"
            sx={{
              mr: 2,
              borderColor: '#2ecc71',
              color: '#2ecc71',
              '&:hover': {
                borderColor: '#27ae60',
                backgroundColor: 'rgba(46, 204, 113, 0.1)',
              },
            }}
          >
            {locationLoading ? 'Getting Location...' : '📍 Get My Location'}
          </Button>
          
          {(location.lat !== 0 || location.lng !== 0) && (
            <Typography variant="body2" sx={{ color: '#27ae60', mt: 1 }}>
              Your Location: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
            </Typography>
          )}
        </Box>
        
        <Button
          onClick={fetchCrops}
          variant="contained"
          disabled={location.lat === 0 && location.lng === 0}
          sx={{
            background: 'linear-gradient(45deg, #2ecc71 30%, #27ae60 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #27ae60 30%, #229954 90%)',
            },
          }}
        >
          {t('viewCrops')}
        </Button>
      </Paper>
      
      <Grid container spacing={2}>
        {crops.map(c => (
          <Grid item xs={12} sm={6} md={4} key={c._id}>
            <Card sx={{ background: 'rgba(255, 255, 255, 0.95)' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#1b4332' }}>
                  {c.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ₹{c.expectedPrice}/unit
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Quantity: {c.quantity}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => selectCrop(c._id)}
                    sx={{ borderColor: '#2ecc71', color: '#2ecc71' }}
                  >
                    View Farmer
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => purchase(c._id, 10)}
                    sx={{
                      background: 'linear-gradient(45deg, #2ecc71 30%, #27ae60 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #27ae60 30%, #229954 90%)',
                      },
                    }}
                  >
                    Buy 10 units
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Button
          variant="outlined"
          onClick={() => alert('Report submitted')}
          sx={{
            borderColor: '#e74c3c',
            color: '#e74c3c',
            '&:hover': {
              borderColor: '#c0392b',
              backgroundColor: 'rgba(231, 76, 60, 0.1)',
            },
          }}
        >
          {t('reportFraud')}
        </Button>
      </Box>
    </Box>
  );
};

export default MiddlemanDashboard;