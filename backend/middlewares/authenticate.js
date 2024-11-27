const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Middleware xác thực JWT
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Lấy token từ header Authorization
  if (!token) {
    return res.status(401).json({ message: 'Bạn chưa đăng nhập' });
  }

  try {
    // Giải mã token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Kiểm tra người dùng tồn tại
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'Người dùng không tồn tại' });
    }

    // Gắn thông tin người dùng vào request
    req.user = user;
    next();
  } catch (error) {
    console.error('Lỗi xác thực:', error);
    res.status(401).json({ message: 'Xác thực không thành công' });
  }
};

module.exports = authenticate;
