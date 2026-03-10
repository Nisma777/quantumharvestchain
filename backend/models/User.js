const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  aadhaar: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['Farmer', 'Middleman'], required: true },
  location: { lat: Number, lng: Number },
  phone: String,
  reports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Report' }],
  reportCount: { type: Number, default: 0 }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);