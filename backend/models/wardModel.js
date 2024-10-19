const mongoose = require('mongoose');

const wardSchema = new mongoose.Schema({
  id: { type: String, required: true },  // Mã ID của ward
  name: { type: String, required: true },  // Tên ward
  full_name: { type: String, required: true },  // Tên đầy đủ của ward
  latitude: { type: String},  // Tọa độ latitude
  longitude: { type: String },  // Tọa độ longitude
  districtId: { type: mongoose.Schema.Types.ObjectId, ref: 'District', required: true }  // Tham chiếu đến ID của province

}, { timestamps: true });

const Ward = mongoose.model('Ward', wardSchema);
module.exports = Ward;
