import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const FarmerDashboard = () => {
  const { t } = useTranslation();
  const [crop, setCrop] = useState({ name: '', quantity: 0, expectedPrice: 0, location: { lat: 0, lng: 0 } });

  const handleAddCrop = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/crops', crop, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      alert('Crop added');
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div>
      <h2>{t('dashboard')} - Farmer</h2>
      <form onSubmit={handleAddCrop}>
        <input placeholder="Crop Name" onChange={(e) => setCrop({...crop, name: e.target.value})} />
        <input type="number" placeholder="Quantity" onChange={(e) => setCrop({...crop, quantity: e.target.value})} />
        <input type="number" placeholder="Expected Price" onChange={(e) => setCrop({...crop, expectedPrice: e.target.value})} />
        <input type="number" placeholder="Lat" onChange={(e) => setCrop({...crop, location: {...crop.location, lat: e.target.value}})} />
        <input type="number" placeholder="Lng" onChange={(e) => setCrop({...crop, location: {...crop.location, lng: e.target.value}})} />
        <button type="submit">{t('addCrop')}</button>
      </form>
    </div>
  );
};

export default FarmerDashboard;