const mongoose = require('mongoose');

const findRoommateSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 150 },
  province: { type: mongoose.Schema.Types.ObjectId, ref: 'Province', required: true },  // Tham chiếu tới schema Province
  district: { type: mongoose.Schema.Types.ObjectId, ref: 'District', required: true },  // Tham chiếu tới schema District
  ward: { type: mongoose.Schema.Types.ObjectId, ref: 'Ward', required: true },  // Tham chiếu tới schema Ward
  street: { type: String, required: true, maxlength: 150  },
  exactAddress: { type: String, required: true, maxlength: 250  },
  price: { type: Number, required: true },
  area: { type: Number, required: true },
  details: { type: String, required: true, maxlength: 5000 },
  contactName: { type: String, required: true },
  contactMobile: { type: String, required: true },
  contactPhone: { type: String },
  images: [{ type: String }], // Array of image file names
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Tham chiếu tới User
}, { timestamps: true });

const FindRoommate = mongoose.model('FindRoommate', findRoommateSchema);
module.exports = FindRoommate;
