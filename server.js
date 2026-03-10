const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/quantumharvestchain';
const jwtSecret = process.env.JWT_SECRET || 'supersecret123';
const port = process.env.PORT || 3000;

mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./backend/routes/auth'));
app.use('/api/crops', require('./backend/routes/crops'));
app.use('/api/orders', require('./backend/routes/orders'));
app.use('/api/reports', require('./backend/routes/reports'));

const PORT = port;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));