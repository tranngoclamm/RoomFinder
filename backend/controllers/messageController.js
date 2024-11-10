const Message = require('../models/messageModel');
const Conversation = require('../models/conversationModel');

// Gửi tin nhắn
const sendMessage = async (req, res) => {
  try {
    const { conversationId, sender, text, attachment } = req.body;
    // Tạo tin nhắn mới
    const message = await Message.create({
      conversationId,
      sender,
      text,
      attachment
    });

    // Tìm cuộc hội thoại để cập nhật lastMessage, lastMessageAt và unreadMessages
    const conversation = await Conversation.findById(conversationId);
    if (conversation) {
      // Cập nhật lastMessage và lastMessageAt
      conversation.lastMessage = text || (attachment ? 'File attachment' : '');
      conversation.lastMessageAt = Date.now();

      // Tăng số lượng tin nhắn chưa đọc cho các người tham gia khác người gửi
      conversation.participants.forEach(participant => {
        if (participant._id.toString() !== sender.toString()) {
          conversation.unreadMessages.set(
            participant.toString(),
            (conversation.unreadMessages.get(participant.toString()) || 0) + 1
          );
        }
      });

      await conversation.save();
    }

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error });
  }
};

  

// Lấy tất cả tin nhắn trong một cuộc hội thoại
const getMessages = async (req, res) => {
    const { conversationId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
  
    try {
      const messages = await Message.find({ conversationId })
        .populate('sender', '-password')
        .sort({ createdAt: -1 }) // Lấy tin nhắn mới nhất trước
        .skip((page - 1) * pageSize)
        .limit(pageSize);
  
      const totalMessages = await Message.countDocuments({ conversationId });
      res.status(200).json({
        messages,
        totalPages: Math.ceil(totalMessages / pageSize),
        currentPage: page
      });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching messages' });
    }
  };
  
module.exports = { sendMessage, getMessages  };
