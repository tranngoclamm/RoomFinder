// backend/events/socketEvents.js

const onlineUsers = {};

module.exports = (io, socket) => {
  // Đăng ký user
  socket.on('registerUser', (userId) => {
    onlineUsers[userId._id] = socket;
    console.log(`User ${userId.username} is online`);
  });

  // Xử lý khi gửi tin nhắn
  socket.on('sendMessage', (messageData, receiverId) => {
    console.log('Message received:', messageData, 'Receiver ID:', receiverId);

    // Phát sự kiện 'receiveMessage' tới người nhận nếu họ online
    if (onlineUsers[receiverId]) {
      onlineUsers[receiverId].emit('receiveMessage', messageData);
    }
  });

  // Xử lý khi user ngắt kết nối
  socket.on('disconnect', () => {
    for (const userId in onlineUsers) {
      if (onlineUsers[userId] === socket) {
        delete onlineUsers[userId];
        console.log(`User ${userId} has disconnected`);
        break;
      }
    }
  });
};
