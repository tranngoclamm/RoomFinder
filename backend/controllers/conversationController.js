const Conversation = require('../models/conversationModel');
const User = require('../models/userModel');

// Tạo cuộc hội thoại mới
const createConversation = async (req, res) => {
  const { participants } = req.body;
  try {
    // Kiểm tra nếu cuộc hội thoại giữa hai người dùng đã tồn tại
    let conversation = await Conversation.findOne({
      participants: { $all: participants, $size: 2 },
    });

    if (conversation) {
      // Nếu cuộc hội thoại tồn tại, chỉ cần trả về nó
      res.status(200).json(conversation);
    } else {
      // Nếu chưa tồn tại, tạo cuộc hội thoại mới
      conversation = await Conversation.create({ participants });
      res.status(201).json(conversation);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error creating conversation' });
  }
};

// Lấy tất cả cuộc hội thoại của người dùng
const getUserConversations = async (req, res) => {
    const userId = req.params.userId;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    
    try {
      const conversations = await Conversation.find({ participants: userId })
        .populate('participants', '-password')
        .sort({ lastMessageAt: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize);
      
      const totalConversations = await Conversation.countDocuments({ participants: userId });
      res.status(200).json({
        conversations,
        totalPages: Math.ceil(totalConversations / pageSize),
        currentPage: page
      });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching conversations' });
    }
  };
  
// Hàm lấy thông tin người dùng 
const getUserProfileById = async (req, res) => {
  const userId = req.params.userId; // Lấy userId từ tham số của yêu cầu (req.params)

  try {
    const user = await User.findById(userId).select('-password -favorites -username'); 

    if (!user) {
      return res.status(404).json({ message: 'User không tồn tại' });
    }

    res.status(200).json(user); // Trả về dữ liệu người dùng
  } catch (error) {
    console.error('Lỗi khi lấy thông tin người dùng:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy thông tin người dùng' });
  }
};

// Đặt lại tin nhắn chưa đọc của người dùng về 0
const resetUnreadMessages = async (req, res) => {
  const { conversationId, userId } = req.body;

  try {
    // Tìm cuộc hội thoại theo conversationId
    let conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    // Đặt lại số lượng tin nhắn chưa đọc của userId về 0 trong trường unreadMessages
    conversation.unreadMessages.set(userId, 0);

    // Lưu thay đổi vào database
    await conversation.save();

    res.status(200).json({ message: 'Unread messages reset to 0', conversation });
  } catch (error) {
    res.status(500).json({ error: 'Error resetting unread messages' });
  }
};

module.exports = { createConversation, getUserConversations, getUserProfileById, resetUnreadMessages  };