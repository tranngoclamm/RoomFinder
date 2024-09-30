const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routers/authRoutes.js'); // Đường dẫn đến authRoutes
const cors = require('cors');

require('dotenv').config();

const app = express();
// Sử dụng cors để cho phép mọi origin, hoặc chỉ định origin cụ thể như 'http://localhost:8080'
// app.use(cors({
//   origin: 'http://localhost:8080',
// }));

app.use(cors()); // Thêm dòng này để cho phép tất cả các nguồn

// Middleware
app.use(express.json());

// Routes
app.use('/api', require('./routers/authRoutes.js'));

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
