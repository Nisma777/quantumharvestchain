// backend/models/User.js
const mongoose = require('mongoose');

// models/User.js (updated)
const userSchema = new mongoose.Schema({
  aadhaar: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['Farmer', 'Middleman'], required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },   // ← changed to string
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);