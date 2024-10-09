const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { registerUser, loginUser } = require('../controllers/authController');
const { getPosts, getLatestPosts, createPost, searchPosts } = require('../controllers/postController');
const { analyzeSearchHistory } = require('../controllers/searchHistory'); 
const { searchLocation, searchRoom } = require('../controllers/searchController');

// Cấu hình lưu trữ file với multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

router.get('/api', (req, res) => {
  res.json({ message: 'Hello from the API' });
});

// Đăng nhập, đăng ký
router.post('/login', loginUser);
router.post('/register', registerUser);

// Bài đăng
router.get('/posts', getPosts); // Lấy bài đăng theo loại
router.post('/posts', upload.array('images', 10), createPost); // Tạo bài đăng
router.get('/latest-posts', getLatestPosts); // Lấy bài đăng mới nhất

// Tìm kiếm
router.post('/search', searchPosts); 
router.get('/search-location', searchLocation); // Tìm kiếm địa chỉ ở khung search
router.post('/search-room', searchRoom); // Tìm kiếm ở HomePage

// Phân tích lịch sử tìm kiếm
router.get('/analyze-search-history', analyzeSearchHistory);

module.exports = router;
