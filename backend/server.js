// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

// Simple test route
app.get('/', (req, res) => {
  res.send('HarvestLink backend is alive! 🚀');
});

// Connect to MongoDB (local)
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/harvestlink')
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err.message));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});