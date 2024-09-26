// backend/app.js
const express = require('express');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello from Express');
});

// Start server
app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
