const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin:'*'
}));
app.use(bodyParser.json());

// Routes
app.use('/api', bookRoutes);

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = app;