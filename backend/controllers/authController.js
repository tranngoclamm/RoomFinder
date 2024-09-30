const User = require('../models/userModel');
const bcrypt = require('bcrypt');

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
  
      console.log('Thông tin tài khoản đăng nhập:');
      console.log('Username:', username);
      console.log('Mật khẩu đã nhập:', password);
      
      // So sánh mật khẩu đã mã hóa
      const isPasswordValid = await bcrypt.compare(password,  user.password);
      console.log(isPasswordValid);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Mật khẩu không đúng' });
      }
  
      // Nếu đăng nhập thành công
      res.status(200).json({ message: 'Đăng nhập thành công', user });
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      res.status(500).json({ message: 'Đã xảy ra lỗi' });
    }
  };