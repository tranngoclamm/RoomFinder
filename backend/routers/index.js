const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { registerUser, loginUser } = require('../controllers/authController');
const { getPosts, getLatestPosts, createPost, searchPosts, getAllPostsForAnalytics } = require('../controllers/postController');
const { getFavorites, updateFavorites, addFavorite, removeFavorite} = require('../controllers/favoritesController');
const { analyzeSearchHistory } = require('../controllers/searchHistory'); 
const { searchLocation, searchRoom, searchHost } = require('../controllers/searchController');
const { createArticle, getLatestArticles, getArticleDetail, articlesByUser } = require('../controllers/articleController');
const { createConversation, getUserConversations, getUserProfileById, resetUnreadMessages  } = require('../controllers/conversationController');
const { sendMessage, getMessages } = require('../controllers/messageController');
const { createPayment, vnpayReturn } = require('../controllers/paymentController');
const { getHistory } = require('../controllers/historyController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Thư mục lưu trữ file tạm
  },
  filename: (req, file, cb) => {
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
router.post('/posts', upload.array('images'), createPost); 
router.get('/latest-posts', getLatestPosts); // Lấy bài đăng mới nhất

// Danh sách yêu thích
router.get('/favorites', getFavorites);
router.post('/favorites', updateFavorites);
router.post('/favorites/add', addFavorite);
router.post('/favorites/remove', removeFavorite);

// Tìm kiếm
router.post('/search', searchPosts); 
router.get('/search-location', searchLocation); // Tìm kiếm địa chỉ ở khung search
router.post('/search-room', searchRoom); // Tìm kiếm ở HomePage
router.get('/search-owner', searchHost); // Tìm kiếm ở HomePage

// Phân tích lịch sử tìm kiếm
router.get('/analyze-search-history', analyzeSearchHistory);

// Đăng tin
router.get('/article', getLatestArticles ); // Lấy danh sách tin mới nhất, có tìm kiếm, lọc theo loại và phân trang
router.get('/article/user/:userId', articlesByUser );  // Lấy danh sách tin theo người dùng
router.get('/blog-posts/:slug', getArticleDetail ); // Lấy chi tiết tin
router.post('/article', createArticle); // Đăng tin 

// Conversations
router.get('/conversations/:userId', getUserConversations); // Lấy tất cả cuộc hội thoại của người dùng
router.post('/conversations', createConversation); // Tạo cuộc hội thoại mới
router.post('/resetUnreadMessages', resetUnreadMessages); // Endpoint để reset tin nhắn chưa đọc 
router.get('/user/:userId', getUserProfileById); // Lấy thông tin của ChatUser

// Message
router.get('/messages/:conversationId', getMessages); // Lấy tất cả tin nhắn trong cuộc hội thoại
router.post('/messages', sendMessage); // Gửi tin nhắn

// Thanh toán
router.post('/payment/create', createPayment);  // Tạo giao dịch thanh toán
router.get('/vnpay_return', vnpayReturn);  // Xử lý kết quả thanh toán từ VNPAY

// Lịch sử
router.get('/history/:userId', getHistory);  // Xử lý kết quả thanh toán từ VNPAY

// Phân tích 
router.get('/analytic', getAllPostsForAnalytics);  // Xử lý kết quả thanh toán từ VNPAY
module.exports = router;
