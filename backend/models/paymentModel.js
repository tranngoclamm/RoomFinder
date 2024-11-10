const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  itemId: { 
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,  
    refPath: 'type',  // Sử dụng refPath để tham chiếu đến collection đúng
  },
  type: {
    type: String,
    required: true,
  },
  buyUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Tham chiếu đến model User
    required: true,
  },
  amount: {
    type: Number,
    required: true,  // Số tiền thanh toán
  },
  adminShare: {
    type: Number,
    required: true,  // Phần tiền admin nhận
  },
  sellerShare: {
    type: Number,
    required: true,  // Phần tiền người bán nhận
  },
  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending',  // Trạng thái thanh toán
  },
  transactionDate: {
    type: Date,
    required: true,  // Thời gian giao dịch
  },
  txnRef: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);