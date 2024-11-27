const mongoose = require('mongoose');

// Định nghĩa schema cho bài viết
const articleSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 450 },
  content: { type: String, required: true }, // Nội dung bài viết
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Tham chiếu tới người viết
  landlord: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Tham chiếu tới chủ trọ (chỉ có trong bài review chủ trọ)
  category: { type: String, required: true },
  status: { type: String },
  slug: { type: String, unique: true, required: true } 
}, { timestamps: true });

// Tạo model từ schema
const Article = mongoose.model('Article', articleSchema);

// Xuất model để sử dụng ở nơi khác
module.exports = Article;
