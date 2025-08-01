// Import required modules
const express = require('express');
const path = require('path');
require('dotenv').config();

// Import API route handlers
const cryptoPricesHandler = require('./api/crypto-prices.js');
const healthHandler = require('./api/health.js');

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '.'))); // Serve static files from the root directory

// API Routes
app.get('/api/crypto-prices', cryptoPricesHandler);
app.get('/api/health', healthHandler);

// Routes to serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.get('/professional-dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'professional-dashboard.html'));
});

app.get('/privacy-policy', (req, res) => {
  res.sendFile(path.join(__dirname, 'privacy-policy.html'));
});

app.get('/terms', (req, res) => {
  res.sendFile(path.join(__dirname, 'terms.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


