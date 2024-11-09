// backend/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const app = express();
const { setupSocket } = require('./config/socket'); // Import hàm setupSocket

require('dotenv').config();

// app.use(cors()); // Thêm dòng này để cho phép tất cả các nguồn

app.use(cors({
  origin: 'http://localhost:8080',  // Frontend URL
  credentials: true
}));

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

// Tạo server HTTP
const server = http.createServer(app);

// Cấu hình Socket.io
setupSocket(server);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
