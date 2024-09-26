// routes/roomRoutes.js
const express = require('express');
const multer = require('multer');
const Room = require('../models/Room');
const path = require('path');
const router = express.Router();

// Cấu hình multer để lưu hình ảnh
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Thư mục để lưu hình ảnh
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Đổi tên hình ảnh
    },
});

const upload = multer({ storage });

// Route đăng tải thông tin phòng trọ
router.post('/rooms', upload.array('images', 5), async (req, res) => {
    const { title, area, address, price, description } = req.body;
    
    try {
        const images = req.files.map(file => file.path); // Lấy đường dẫn hình ảnh
        
        const newRoom = new Room({
            title,
            area,
            address,
            price,
            description,
            images,
        });

        await newRoom.save();
        res.status(201).json({ message: 'Đăng tải phòng trọ thành công', room: newRoom });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi server', error: err.message });
    }
});

module.exports = router;
