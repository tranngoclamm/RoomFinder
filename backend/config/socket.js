// backend/config/socket.js
const socketIo = require('socket.io');
const socketEvents = require('../events/socketEvents');

let io;

const setupSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: "http://localhost:8080",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Gọi các sự kiện trong socketEvents
    socketEvents(io, socket);
  });
};

const getIoInstance = () => io;

module.exports = {
  setupSocket,
  getIoInstance,
};
