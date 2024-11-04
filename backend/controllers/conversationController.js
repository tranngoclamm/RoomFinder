const Conversation = require('../models/conversationModel');

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
  
module.exports = { createConversation, getUserConversations  };