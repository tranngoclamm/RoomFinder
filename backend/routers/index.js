const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { registerUser, loginUser, updateUser, updateUserRole, deleteUser, getUsersWithPagination } = require('../controllers/authController');
const { getPosts, getLatestPosts, createPost,updatePost, deletePosts, searchPosts, getAllPostsForAnalytics, getUserPosts, findCategoryByPostId, updatePostVisibility } = require('../controllers/postController');
const { getFavorites, updateFavorites, addFavorite, removeFavorite} = require('../controllers/favoritesController');
const { analyzeSearchHistory } = require('../controllers/searchHistory'); 
const { searchLocation, searchRoom, searchHost } = require('../controllers/searchController');
const { createArticle, getLatestArticles, getArticleDetail, articlesByUser, updateArticle, deleteArticle,updateArticleStatus  } = require('../controllers/articleController');
const { createConversation, getUserConversations, getUserProfileById, resetUnreadMessages  } = require('../controllers/conversationController');
const { sendMessage, getMessages } = require('../controllers/messageController');
const { createPayment, vnpayReturn } = require('../controllers/paymentController');
const { getHistory } = require('../controllers/historyController');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

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

// Đăng nhập, đăng ký, update, change role
router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/user', authenticate, authorize(['admin']), getUsersWithPagination); // lấy danh sách user
router.put('/user/update/:userId', updateUser); // Cập nhật thông tin người dùng
router.put('/user/update-role/:userId', authenticate, authorize(['admin']), updateUserRole); // Thay đổi quyền người dùng
router.delete('/user/delete/:userId', authenticate, authorize(['admin']), deleteUser); // Xóa tài khoản

// Bài đăng
router.get('/posts', getPosts); // Lấy bài đăng theo loại
router.post('/posts', upload.array('images'), createPost); 
router.put('/posts/:id', upload.array('images'), updatePost); 
router.post('/posts/delete', deletePosts); 
router.get('/latest-posts', getLatestPosts); // Lấy bài đăng mới nhất
router.get('/posts/user/:userId', getUserPosts); // Lấy phòng của người dùng đã đăng
router.get('/posts/:id/category', findCategoryByPostId ); // lấy category từ id bài
router.patch('/posts/:id/visibility', updatePostVisibility ); // lấy category từ id bài

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
router.delete("/article/:id", deleteArticle); // Xóa bài viết
router.put("/article/:id", updateArticle); // Cập nhật bài viết
router.patch('/article/:id/status', updateArticleStatus); // cập nhật trạng thái ẩn/ hiện 

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
