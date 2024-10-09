const mongoose = require('mongoose');

const provinceSchema = new mongoose.Schema({
  id: { type: String, required: true },  // Mã ID của tỉnh/thành
  name: { type: String, required: true },  // Tên tỉnh/thành
  full_name: { type: String, required: true },  // Tên đầy đủ của tỉnh/thành
  latitude: { type: String, required: true },  // Tọa độ latitude
  longitude: { type: String, required: true },  // Tọa độ longitude
}, { timestamps: true });

const Province = mongoose.model('Province', provinceSchema);
module.exports = Province;
