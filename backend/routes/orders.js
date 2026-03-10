const express = require('express');
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const Crop = require('../models/Crop');
const User = require('../models/User');
const router = express.Router();

// Create order (Middleman selects crop)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'Middleman') return res.status(403).json({ msg: 'Access denied' });
  const { cropId, quantity } = req.body;
  const crop = await Crop.findById(cropId).populate('farmerId');
  if (!crop) return res.status(404).json({ msg: 'Crop not found' });

  // Check loyalty discount
  const pastOrders = await Order.find({ middlemanId: req.user._id, farmerId: crop.farmerId._id });
  const discount = pastOrders.length > 0 ? 0.05 : 0; // 5% off
  const basePrice = crop.expectedPrice * quantity;
  const finalPrice = basePrice * (1 - discount);

  const order = new Order({
    cropId,
    middlemanId: req.user._id,
    farmerId: crop.farmerId._id,
    quantity,
    finalPrice
  });
  await order.save();

  // Simulate 30% advance
  const advance = finalPrice * 0.3;
  console.log(`Simulated advance payment: ₹${advance}`); // Mock payment
  order.advancePaid = true;
  await order.save();

  res.json(order);
});

// Get farmer details for crop
router.get('/crop/:id', auth, async (req, res) => {
  const crop = await Crop.findById(req.params.id).populate('farmerId', 'name phone');
  if (!crop) return res.status(404).json({ msg: 'Not found' });
  res.json(crop.farmerId);
});

module.exports = router;