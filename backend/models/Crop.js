const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: String,
  quantity: Number,
  expectedPrice: Number,
  location: { lat: Number, lng: Number }
}, { timestamps: true });

module.exports = mongoose.model('Crop', cropSchema);