const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

require('dotenv').config();


app.use(cors()); // Thêm dòng này để cho phép tất cả các nguồn

// Middleware
app.use(express.json());

// Routes
app.use('/api', require('./routers/index.js'));

// Kết nối đến MongoDB

mongoose.connect(process.env.uri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});