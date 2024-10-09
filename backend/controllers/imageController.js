const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const fs = require('fs'); // Thư viện fs để kiểm tra file

// Load các biến môi trường từ file .env
dotenv.config();

// Cấu hình Cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Kiểm tra cấu hình Cloudinary
const validateCloudinaryConfig = () => {
    if (!process.env.CLOUDINARY_CLOUD_NAME || 
        !process.env.CLOUDINARY_API_KEY || 
        !process.env.CLOUDINARY_API_SECRET) {
        throw new Error('Cloudinary configuration is missing.');
    }
};

// Kiểm tra xem file có tồn tại hay không
const validateFilePath = (filePath) => {
    if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
    }
};

// Upload an image
const uploadToCloudinary = async (filePath) => {
    try {
        validateCloudinaryConfig(); // Kiểm tra cấu hình Cloudinary
        validateFilePath(filePath); // Kiểm tra đường dẫn file

        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'images' 
        });
        console.log("imageController:", result.secure_url);
        return result.secure_url; // Lấy URL của ảnh sau khi upload thành công
    } catch (error) {
        throw new Error(`Upload to Cloudinary failed: ${error.message}`);
    }
};

module.exports = { uploadToCloudinary };
