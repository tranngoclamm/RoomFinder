const Province = require('../models/provinceModel');
const District = require('../models/districtModel');
const Ward = require('../models/wardModel');
const Room = require('../models/roomModel');
const User = require('../models/userModel');
const House = require('../models/houseModel');
const Apartment = require('../models/apartmentModel');
const FindRoommate = require('../models/findRoommateModel');

const searchLocation = async (req, res) => {
  const searchTerm = req.query.q; // Lấy từ query parameter

  try {
    // Tìm kiếm các tỉnh, quận, và phường theo trường full_name
    const wards = await Ward.find({ full_name: { $regex: searchTerm, $options: 'i' } })
    .populate({
      path: 'districtId', // Populate districtId của ward
      populate: { path: 'provinceId', model: 'Province' } // Populate provinceId bên trong districtId
    });
    const provinces = await Province.find({ full_name: { $regex: searchTerm, $options: 'i' } });
    const districts = await District.find({ full_name: { $regex: searchTerm, $options: 'i' } })
      .populate('provinceId');

    // Tạo danh sách kết quả
    const results = [];
    // Thêm các phường vào danh sách kết quả
    wards.forEach(ward => {
      const district = ward.districtId; // District đã được populate
      const province = district?.provinceId;
      results.push({
        wardId: ward.id, // ID của ward
        wardName: ward.full_name, // Tên đầy đủ của ward
        districtId: district?.id,
        districtName: district?.full_name,
        provinceId: province?.id,
        provinceName: province?.full_name,
      });
    });
  
    // Thêm các quận vào danh sách kết quả
    districts.forEach(district => {
      const province = district.provinceId; // Province đã được populate
      results.push({
        districtId: district.id, // ID của district
        districtName: district.full_name, // Tên đầy đủ của district
        provinceId: province.id, // ID của province
        provinceName: province.full_name, // Tên đầy đủ của province
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
  const {
    roomType,
    location,
    price,
    area
  } = req.body;
  console.log("reqbody: ", req.body);

  try {
    let query; // Khởi tạo truy vấn
    let {
      page = 1, limit = 9
    } = req.query; // Lấy page và limit từ query string (mặc định page 1, mỗi trang 9 mục)
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
        return res.status(400).json({
          message: 'Invalid room type'
        });
    }

    // Truy vấn province, district và ward từ collections
    if (location) {
      let provinceObjectId;
      let districtObjectId;
      let wardObjectId;

      // Tìm kiếm ObjectId của tỉnh
      if (location.provinceId) {
        const province = await Province.findOne({
          id: location.provinceId
        }).exec();

        if (!province) {
          return res.status(404).json({
            message: 'Province not found'
          });
        }
        provinceObjectId = province._id; // Lưu ObjectId của tỉnh
      }

      // Tìm kiếm ObjectId của quận
      if (location.districtId) {
        const district = await District.findOne({
          id: location.districtId
        }).exec();

        if (!district) {
          return res.status(204).json({
            message: 'District not found'
          });
        }
        districtObjectId = district._id; // Lưu ObjectId của quận
      }

      // Tìm kiếm ObjectId của phường
      if (location.wardId) {
        const ward = await Ward.findOne({
          id: location.wardId
        }).exec();

        if (!ward) {
          return res.status(204).json({
            message: 'Ward not found'
          });
        }
        wardObjectId = ward._id; // Lưu ObjectId của phường
      }

      // Thêm điều kiện province vào truy vấn
      if (provinceObjectId) {
        query = query.where('province').equals(provinceObjectId);
      }

      // Thêm điều kiện district vào truy vấn
      if (districtObjectId) {
        query = query.where('district').equals(districtObjectId);
      }

      // Thêm điều kiện ward vào truy vấn
      if (wardObjectId) {
        query = query.where('ward').equals(wardObjectId);
      }
    }

    // Thêm điều kiện cho giá
    if (price) {
      if (typeof price.to == 'string' && price.to.endsWith('+')) {
        const minPrice = parseInt(price.from, 10); // Lấy giá trị trước dấu +
        if (!isNaN(minPrice)) {
          query = query.where('price').gte(minPrice);
        }
      } else if (typeof price === 'object' && price.from !== undefined && price.to !== undefined) {
        const fromPrice = parseInt(price.from, 10);
        const toPrice = parseInt(price.to, 10);
        
        if (!isNaN(fromPrice) && !isNaN(toPrice)) {
          query = query.where('price').gte(fromPrice).lte(toPrice);
        }
      }
    }

    // Thêm điều kiện cho diện tích
    if (area) {
      if (typeof area.to == 'string' && area.to.endsWith('+')) {
        const minArea = parseInt(area.from, 10); // Lấy giá trị trước dấu +
        if (!isNaN(minArea)) {
          query = query.where('area').gte(minArea);
        }
      } else if (typeof area === 'object' && area.from !== undefined && area.to !== undefined) {
        const fromArea = parseInt(area.from, 10);
        const toArea = parseInt(area.to, 10);
        
        if (!isNaN(fromArea) && !isNaN(toArea)) {
          query = query.where('area').gte(fromArea).lte(toArea);
        }
      }
    }

    query = query.skip((page - 1) * limit).limit(limit);
    const results = await query.populate('province').populate('district').populate('ward').exec();
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
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

  
      const searchHost = async (req, res) => {
        try {
          const { query } = req; // Lấy thông tin từ query params
          const searchTerm = query.q; // term là từ khóa tìm kiếm
      
          if (!searchTerm) {
            return res.status(400).json({ message: 'Missing search term' });
          }
      
          // Tìm kiếm người dùng có chứa fullName, email hoặc phone
          const users = await User.find({
            $or: [
              { fullName: { $regex: searchTerm, $options: 'i' } }, // Tìm theo fullName
              { email: { $regex: searchTerm, $options: 'i' } }, // Tìm theo email
              { phone: { $regex: searchTerm, $options: 'i' } } // Tìm theo phone
            ]
          });
      
          return res.status(200).json(users);
        } catch (error) {
          console.error('Error searching users:', error);
          return res.status(500).json({ message: 'Server error', error: error.message });
        }
      };
      
  module.exports = { searchLocation, searchRoom, searchHost };

