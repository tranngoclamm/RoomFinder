const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json()); // Để xử lý JSON trong request body

// Kết nối tới MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Mô hình người dùng (User Schema)
const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    agree: { type: Boolean, required: true }
});

const User = mongoose.model('User', UserSchema);

// Hàm tạo JWT
const generateToken = (user) => {
    return jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
};

// Route xử lý đăng ký
app.post('/register', async (req, res) => {
    const { fullName, username, email, password, agree } = req.body;

    if (!agree) {
        return res.status(400).json({ message: 'You must agree to the terms and services' });
    }

    try {
        // Kiểm tra xem email hoặc username đã tồn tại hay chưa
        let user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) {
            return res.status(400).json({ message: 'Email hoặc tên tài khoản đã tồn tại' });
        }

        // Mã hóa mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Tạo người dùng mới
        user = new User({
            fullName,
            username,
            email,
            password: hashedPassword,
            agree
        });

        await user.save();

        // Tạo JWT token cho người dùng
        const token = generateToken(user);

        res.status(201).json({ message: 'Tạo tài khoản thành công', token });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi server', error: err.message });
    }
});

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
