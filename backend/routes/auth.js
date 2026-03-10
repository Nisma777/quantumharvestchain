const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Mock Aadhaar verify (simulate API)
const mockAadhaarVerify = async (aadhaar) => {
  if (aadhaar.length !== 12 || !/^\d+$/.test(aadhaar)) throw new Error('Invalid Aadhaar');
  // Simulate success
  return { name: 'Mock User', verified: true };
};

router.post('/register', async (req, res) => {
  const { aadhaar, role, phone, location } = req.body;
  try {
    const { name } = await mockAadhaarVerify(aadhaar);
    let user = await User.findOne({ aadhaar });
    if (user) return res.status(400).json({ msg: 'User exists' });

    user = new User({ aadhaar, name, role, phone, location });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, name, role } });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { aadhaar } = req.body;
  try {
    const user = await User.findOne({ aadhaar });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(400).json({ msg: 'Error' });
  }
});

module.exports = router;