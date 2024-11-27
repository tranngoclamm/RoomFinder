const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');  // Thêm jwt vào file của bạn

// đăng ký
exports.registerUser = async (req, res) => {
  const { fullName, username, email, password } = req.body;

  try {
    // Check if the email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email đã tồn tại' });
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Tên tài khoản đã tồn tại' });
    }

    const newUser = new User({
      fullName,
      username,
      email,
      password,
    });

    await newUser.save();
    res.status(201).json({ message: 'Đăng ký thành công' });
  } catch (error) {
    console.error('Lỗi đăng ký:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi' });
  }
};

// đăng nhập
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Tìm người dùng theo tên tài khoản
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Tên tài khoản không tồn tại' });
    }

    // So sánh mật khẩu đã mã hóa
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Mật khẩu không đúng' });
    }

    // Tạo JWT token khi đăng nhập thành công
    const token = jwt.sign(
      { userId: user._id, role: user.role },  // Payload: thông tin người dùng bạn muốn lưu vào token
      process.env.JWT_SECRET,  // Secret key từ môi trường
      { expiresIn: process.env.JWT_EXPIRES_IN }  // Thời gian hết hạn token
    );

    // Loại bỏ mật khẩu khỏi đối tượng người dùng
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    // Trả về thông tin người dùng và token
    res.status(200).json({ message: 'Đăng nhập thành công', user: userWithoutPassword, token });
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi' });
  }
};


// update
exports.updateUser = async (req, res) => {
  const { userId } = req.params; // Lấy userId từ params
  const { fullName, email, password } = req.body;

  try {
    // Tìm user theo ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }

    // Kiểm tra email đã tồn tại chưa (nếu muốn cập nhật email)
    if (email && email !== user.email) {
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: 'Email đã được sử dụng' });
      }
    }

    // Cập nhật thông tin
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;

    // Nếu người dùng muốn thay đổi mật khẩu
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.status(200).json({ message: 'Cập nhật thông tin thành công', user });
  } catch (error) {
    console.error('Lỗi cập nhật người dùng:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi' });
  }
};

// thay đổi quyền
exports.updateUserRole = async (req, res) => {
  const { userId } = req.params; // Lấy userId từ params
  const { role } = req.body; // Role mới được gửi từ client

  try {
    // Tìm user theo ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }

    // Cập nhật role
    user.role = role;
    await user.save();

    res.status(200).json({ message: 'Cập nhật quyền thành công', user });
  } catch (error) {
    console.error('Lỗi thay đổi quyền người dùng:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi' });
  }
};

// Xóa tài khoản
exports.deleteUser = async (req, res) => {
  const { userId } = req.params; // Lấy userId từ params

  try {
    // Tìm và xóa user theo ID
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }

    res.status(200).json({ message: 'Xóa tài khoản thành công', user: deletedUser });
  } catch (error) {
    console.error('Lỗi xóa người dùng:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi' });
  }
};

// Lấy danh sách user
exports.getUsersWithPagination = async (req, res) => {
  try {
    const requestingUserId = req.user.id; // ID của người yêu cầu (có thể được gắn từ middleware xác thực)

    // Tìm người yêu cầu để kiểm tra vai trò
    const requestingUser = await User.findById(requestingUserId);
    if (!requestingUser || requestingUser.role !== 'admin') {
      return res.status(403).json({ message: 'Bạn không có quyền truy cập' });
    }

    const { page = 1, limit = 9 } = req.query; // Lấy page và limit từ query
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    if (pageNum < 1 || limitNum < 1) {
      return res.status(400).json({ message: 'Page và limit phải là số nguyên dương' });
    }

    const skip = (pageNum - 1) * limitNum;

    // Lấy danh sách người dùng, loại bỏ trường password
    const users = await User.find()
      .select('-password') // Loại bỏ trường password
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 });

    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / limitNum);

    res.status(200).json({
      data: users,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalUsers,
        pageSize: limitNum,
      },
    });
  } catch (error) {
    console.error('Lỗi lấy danh sách người dùng:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi' });
  }
};

