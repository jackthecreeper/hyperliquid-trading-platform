// Import required modules
const express = require('express');
const path = require('path');
require('dotenv').config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '.'))); // Serve static files from the root directory

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


