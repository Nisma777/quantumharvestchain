const express = require('express');
const auth = require('../middleware/auth');
const Crop = require('../models/Crop');
const router = express.Router();

// Add crop (Farmer)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'Farmer') return res.status(403).json({ msg: 'Access denied' });
  const crop = new Crop({ ...req.body, farmerId: req.user._id });
  await crop.save();
  res.json(crop);
});

// Get nearby crops (Middleman) - Haversine for distance
const getDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

router.get('/nearby', auth, async (req, res) => {
  if (req.user.role !== 'Middleman') return res.status(403).json({ msg: 'Access denied' });
  const { lat, lng, radius = 50 } = req.query; // km
  const crops = await Crop.find().populate('farmerId', 'name phone location');
  const nearby = crops.filter(crop => {
    const dist = getDistance(lat, lng, crop.location.lat, crop.location.lng);
    return dist <= radius;
  });
  res.json(nearby);
});

module.exports = router;