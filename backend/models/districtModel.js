const mongoose = require('mongoose');

// Khai báo districtSchema
const districtSchema = new mongoose.Schema({
  id: { type: String, required: true },  // Mã ID của district
  name: { type: String, required: true },  // Tên district
  full_name: { type: String, required: true },  // Tên đầy đủ của district
  latitude: { type: String, required: true },  // Tọa độ latitude
  longitude: { type: String, required: true },  // Tọa độ longitude
  provinceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Province', required: true }  // Tham chiếu đến ID của province
}, { timestamps: true });

// Tạo model District
const District = mongoose.model('District', districtSchema);

// Xuất model District
module.exports = District;
