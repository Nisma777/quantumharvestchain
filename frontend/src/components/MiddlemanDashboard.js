import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const MiddlemanDashboard = () => {
  const { t } = useTranslation();
  const [crops, setCrops] = useState([]);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [selectedCrop, setSelectedCrop] = useState(null);

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const res = await axios.get(`/api/crops/nearby?lat=${location.lat}&lng=${location.lng}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      setCrops(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const selectCrop = async (cropId) => {
    setSelectedCrop(cropId);
    // Fetch details
    const res = await axios.get(`/api/orders/crop/${cropId}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    alert(`Farmer: ${res.data.name}, Phone: ${res.data.phone}`);
  };

  const purchase = async (cropId, quantity) => {
    try {
      await axios.post('/api/orders', { cropId, quantity }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      alert('Order placed with advance!');
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div>
      <h2>{t('dashboard')} - Middleman</h2>
      <input type="number" placeholder="Your Lat" onChange={(e) => setLocation({...location, lat: e.target.value})} />
      <input type="number" placeholder="Your Lng" onChange={(e) => setLocation({...location, lng: e.target.value})} />
      <button onClick={fetchCrops}>{t('viewCrops')}</button>
      <ul>
        {crops.map(c => (
          <li key={c._id}>
            {c.name} - ₹{c.expectedPrice}/unit - Qty: {c.quantity}
            <button onClick={() => selectCrop(c._id)}>View Farmer</button>
            <button onClick={() => purchase(c._id, 10)}>Buy 10 units</button> {/* Example qty */}
          </li>
        ))}
      </ul>
      <button onClick={() => {/* Fraud report logic */ alert('Report submitted') }}>{t('reportFraud')}</button>
    </div>
  );
};

export default MiddlemanDashboard;