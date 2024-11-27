const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  zalo: {
    type: Number,
  },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RoomType', // Tham chiếu đến collection phòng
    },
  ],
  phone: {
    type: String, // Đổi thành String nếu muốn lưu mã vùng hoặc ký tự đặc biệt
  },
  postedRooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RoomType', // Tham chiếu đến collection phòng
    },
  ],
  profilePicture: { 
    type: String 
  },
  role: { 
    type: String 
  }
  
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
module.exports = User;
