const Province = require('../models/provinceModel');
const District = require('../models/districtModel');
const Room = require('../models/roomModel');
const House = require('../models/houseModel');
const Apartment = require('../models/apartmentModel');
const FindRoommate = require('../models/findRoommateModel');

const searchLocation = async (req, res) => {
    const searchTerm = req.query.q; // Lấy từ query parameter
  
    try {
      // Tìm kiếm các tỉnh và quận theo trường full_name
      const provinces = await Province.find({ full_name: { $regex: searchTerm, $options: 'i' } });
      const districts = await District.find({ full_name: { $regex: searchTerm, $options: 'i' } })
        .populate('provinceId');
  
      // Tạo danh sách kết quả
      const results = [];
  
      // Thêm các quận vào danh sách kết quả
      districts.forEach(district => {
        const province = district.provinceId; // Province đã được populate
        results.push({
          districtId: district.id, // ID của district
          districtName: district.full_name, // Tên đầy đủ của district
          provinceId: province.id, // ID của province
          provinceName: province.name // Tên đầy đủ của province
        });
      });
  
      // Thêm các tỉnh vào danh sách kết quả
      provinces.forEach(province => {
        results.push({
          provinceId: province.id, // ID của province
          provinceName: province.full_name, // Tên đầy đủ của province
        });
      });
  
      // Gửi phản hồi JSON
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching data' });
    }
  };
  
  const searchRoom = async (req, res) => {
    const { roomType, location, price, area } = req.body;
  
  
    try {
      let query; // Khởi tạo truy vấn
      let { page = 1, limit = 9 } = req.query; // Lấy page và limit từ query string (mặc định page 1, mỗi trang 9 mục)
      page = parseInt(page, 10);
      limit = parseInt(limit, 10);

      // Lựa chọn collection dựa trên roomType
      switch (roomType) {
        case 'PHÒNG TRỌ':
          query = Room.find(); // Sử dụng Room
          break;
        case 'NHÀ Ở':
          query = House.find(); // Sử dụng House
          break;
        case 'CĂN HỘ':
          query = Apartment.find(); // Sử dụng Apartment
          break;
        case 'TÌM NGƯỜI Ở GHÉP':
          query = FindRoommate.find(); // Sử dụng FindRoommate
          break;
        default:
          return res.status(400).json({ message: 'Invalid room type' });
      }
  
      // Truy vấn province và district từ collections
      if (location) {
        let provinceObjectId;
        let districtObjectId;
  
        // Tìm kiếm ObjectId của tỉnh
        if (location.provinceId) {
          const province = await Province.findOne({ id: location.provinceId }).exec();
          console.log("Province Search Result: ", province); // In ra kết quả tìm kiếm tỉnh
  
          if (!province) {
            return res.status(404).json({ message: 'Province not found' });
          }
          provinceObjectId = province._id; // Lưu ObjectId của tỉnh
        }
  
        // Tìm kiếm ObjectId của quận
        if (location.districtId) {
          const district = await District.findOne({ id: location.districtId }).exec();
          console.log("District Search Result: ", district); // In ra kết quả tìm kiếm quận
  
          if (!district) {
            return res.status(204).json({ message: 'No data' });
          }
          districtObjectId = district._id; // Lưu ObjectId của quận
        }
  
        // Thêm điều kiện province vào truy vấn
        if (provinceObjectId) {
          query = query.where('province').equals(provinceObjectId);
          console.log("Query Province: ", provinceObjectId); // In ra ObjectId của tỉnh
        }
  
        // Thêm điều kiện district vào truy vấn
        if (districtObjectId) {
          query = query.where('district').equals(districtObjectId);
          console.log("Query District: ", districtObjectId); // In ra ObjectId của quận
        }
      }
        
        // Thêm điều kiện cho giá
      if (price) {
        if (typeof price === 'string' && price.endsWith('+')) {
          const minPrice = parseInt(price.slice(0, -1), 10); // Lấy giá trị trước dấu +
          if (!isNaN(minPrice)) {
            query = query.where('price').gte(minPrice);
            console.log("Query Price Range: >", minPrice); // In ra giá trị tối thiểu
          }
        } else if (price.from && price.to) {
          query = query.where('price').gte(price.from).lte(price.to);
          console.log("Query Price Range: ", price.from, price.to); // In ra khoảng giá
        }
      }

      // Thêm điều kiện cho diện tích
      if (area) {
        if (typeof area === 'string' && area.endsWith('+')) {
          const minArea = parseInt(area.slice(0, -1), 10); // Lấy giá trị trước dấu +
          if (!isNaN(minArea)) {
            query = query.where('area').gte(minArea);
            console.log("Query Area Range: >", minArea); // In ra diện tích tối thiểu
          }
        } else if (area.from && area.to) {
          query = query.where('area').gte(area.from).lte(area.to);
          console.log("Query Area Range: ", area.from, area.to); // In ra khoảng diện tích
        }
      }



      query = query.skip((page - 1) * limit).limit(limit);

      const results = await query.populate('province').populate('district').exec();
      console.log("Final Results: ", results);

      // Đếm tổng số kết quả không phân trang
      const totalItems = await Room.countDocuments(); // Đếm số lượng mục tổng cộng

      // Trả kết quả về client, bao gồm cả thông tin phân trang
      return res.json({
        results, // Kết quả tìm kiếm cho trang hiện tại
        currentPage: page, // Trang hiện tại
        totalPages: Math.ceil(totalItems / limit), // Tổng số trang
        totalItems // Tổng số mục
      });
      } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
      }
      };
  
  module.exports = { searchLocation, searchRoom };

