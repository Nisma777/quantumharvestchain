// backend/routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // we'll create this next
const router = express.Router();

// Simulated Aadhaar verification (mock for MVP)
const mockVerifyAadhaar = (aadhaar) => {
  if (aadhaar.length !== 12 || !/^\d{12}$/.test(aadhaar)) {
    throw new Error('Invalid Aadhaar number');
  }
  return { name: 'Mock User From Aadhaar', verified: true };
};

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { aadhaar, role, phone, location } = req.body;

  if (!aadhaar || !role || !['Farmer', 'Middleman'].includes(role)) {
    return res.status(400).json({ msg: 'Missing or invalid fields' });
  }

  try {
    // Mock KYC check
    mockVerifyAadhaar(aadhaar);

    // Check if user already exists
    let user = await User.findOne({ aadhaar });
    if (user) {
      return res.status(400).json({ msg: 'User with this Aadhaar already exists' });
    }

    // Create new user
    user = new User({
      aadhaar,
      name: 'Mock User', // in real app, pull from KYC
      role,
      phone,
      location
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: err.message || 'Server error' });
  }
});

// POST /api/auth/login (bonus - simple version)
router.post('/login', async (req, res) => {
  const { aadhaar } = req.body;

  try {
    const user = await User.findOne({ aadhaar });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
