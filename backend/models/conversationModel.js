// models/conversationModel.js

const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Tham chiếu đến người dùng
      required: true,
    }
  ],
  lastMessage: {
    type: String,
    default: '',
  },
  lastMessageAt: {
    type: Date,
    default: Date.now,
  },
  unreadMessages: {
    type: Map, // Dùng Map để lưu số lượng tin nhắn chưa đọc của từng người
    of: Number,
    default: {},
  },
}, {
  timestamps: true, // Tự động thêm createdAt và updatedAt
});

module.exports = mongoose.model('Conversation', conversationSchema);
