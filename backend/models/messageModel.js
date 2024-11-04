// models/messageModel.js

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation', // Tham chiếu đến Conversation
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Người gửi tin nhắn
    required: true,
  },
  text: {
    type: String,
    required: false,
  },
  attachment: {
    type: String, // Đường dẫn tệp đính kèm (URL)
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true, // Tự động thêm createdAt và updatedAt
});

module.exports = mongoose.model('Message', messageSchema);
