const { uploadToCloudinary } = require('./imageController'); // Sử dụng require
const Room = require('../models/roomModel'); // Sử dụng require
const House = require('../models/houseModel'); // Sử dụng require
const Apartment = require('../models/apartmentModel'); // Sử dụng require
const FindRoommate = require('../models/findRoommateModel'); // Sử dụng require
const SearchHistory = require('../models/searchHistoryModel'); // Sử dụng require
const multer = require('multer'); // Sử dụng require
const path = require('path'); // Sử dụng require
const Province = require('../models/provinceModel'); // Đường dẫn tùy thuộc vào cấu trúc dự án của bạn
const District = require('../models/districtModel'); 
const Ward = require('../models/wardModel');
const fs = require('fs');
const axios = require('axios');


// Lấy danh sách bài đăng với phân trang và lọc theo nội dung tìm kiếm
const getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Lấy số trang từ query string, mặc định là 1
  const limit = 9; // Số lượng bài đăng mỗi trang
  const postType = req.query.type; // Lấy loại bài viết từ query string (rooms, houses, apartments, find-roommates)
  const searchQuery = req.query.search || ''; // Lấy giá trị tìm kiếm từ query string
  let Model;

  // Xác định collection dựa trên loại param
  switch (postType) {
    case 'rooms':
      Model = Room;
      break;
    case 'houses':
      Model = House;
      break;
    case 'apartments':
      Model = Apartment;
      break;
    case 'find-roommates':
      Model = FindRoommate;
      break;
    default:
      return res.status(400).json({ message: 'Loại bài viết không hợp lệ' });
  }

  try {
    // Tạo điều kiện tìm kiếm
    const searchCondition = {
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } }, // Tìm theo title
        { street: { $regex: searchQuery, $options: 'i' } }, // Tìm theo street
        { exactAddress: { $regex: searchQuery, $options: 'i' } }, // Tìm theo exactAddress
        { details: { $regex: searchQuery, $options: 'i' } }, // Tìm theo details
        { contactName: { $regex: searchQuery, $options: 'i' } }, // Tìm theo contactName
        { contactMobile: { $regex: searchQuery, $options: 'i' } } // Tìm theo contactMobile
      ]
    };

    // Lấy bài viết mới nhất đến cũ và sử dụng populate
    const posts = await Model.find(searchCondition)
      .populate('province') // Populate province
      .populate('district') // Populate district
      .populate('ward') // Populate ward
      .populate({
        path: 'userId', // Populate userId
        select: '-password' // Chỉ định không lấy trường password
      })
      .sort({ createdAt: -1 }) // Sắp xếp từ mới đến cũ
      .skip((page - 1) * limit) // Bỏ qua số bài viết đã có trên các trang trước
      .limit(limit); // Giới hạn số bài viết trả về

    const totalPosts = await Model.countDocuments(searchCondition); // Tổng số bài viết trong collection tương ứng

    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit), // Tổng số trang
      posts, // Bài viết hiện tại
    });
  } catch (error) {
    console.error('Lỗi lấy bài viết:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi' });
  }
};


// Lấy danh sách bài viết mới nhất và lọc theo nội dung tìm kiếm
const getLatestPosts = async (req, res) => {
  let { page = 1, limit = 9, search = '' } = req.query; // Lấy page, limit, và search từ query string
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);

  try {
    // Tạo điều kiện tìm kiếm
    const searchCondition = {
      $or: [
        { title: { $regex: search, $options: 'i' } }, // Tìm theo title
        { street: { $regex: search, $options: 'i' } }, // Tìm theo street
        { exactAddress: { $regex: search, $options: 'i' } }, // Tìm theo exactAddress
        { details: { $regex: search, $options: 'i' } }, // Tìm theo details
        { contactName: { $regex: search, $options: 'i' } }, // Tìm theo contactName
        { contactMobile: { $regex: search, $options: 'i' } } // Tìm theo contactMobile
      ]
    };

    // Lấy dữ liệu từ tất cả các collections và áp dụng điều kiện tìm kiếm
    const roomPromise = Room.find(searchCondition).populate('province').populate('district').populate('ward').populate({
      path: 'userId',
      select: '-password' // Không lấy trường password
    }).sort({ createdAt: -1 });
    
    const housePromise = House.find(searchCondition).populate('province').populate('district').populate('ward').populate({
      path: 'userId',
      select: '-password' // Không lấy trường password
    }).sort({ createdAt: -1 });
    
    const apartmentPromise = Apartment.find(searchCondition).populate('province').populate('district').populate('ward').populate({
      path: 'userId',
      select: '-password' // Không lấy trường password
    }).sort({ createdAt: -1 });
    
    const findRoommatePromise = FindRoommate.find(searchCondition).populate('province').populate('district').populate('ward').populate({
      path: 'userId',
      select: '-password' // Không lấy trường password
    }).sort({ createdAt: -1 });

    // Đợi tất cả các truy vấn hoàn tất
    const [rooms, houses, apartments, findRoommates] = await Promise.all([
      roomPromise, 
      housePromise, 
      apartmentPromise, 
      findRoommatePromise
    ]);

    // Tổng hợp dữ liệu từ các collections và sắp xếp theo thời gian tạo
    const allPosts = [...rooms, ...houses, ...apartments, ...findRoommates].sort(
      (a, b) => b.createdAt - a.createdAt
    );

    // Áp dụng phân trang sau khi đã tổng hợp
    const startIndex = (page - 1) * limit;
    const paginatedPosts = allPosts.slice(startIndex, startIndex + limit);

    // Đếm tổng số mục trong tất cả các collections
    const totalRooms = await Room.countDocuments(searchCondition);
    const totalHouses = await House.countDocuments(searchCondition);
    const totalApartments = await Apartment.countDocuments(searchCondition);
    const totalFindRoommates = await FindRoommate.countDocuments(searchCondition);
    
    const totalItems = totalRooms + totalHouses + totalApartments + totalFindRoommates;
    
    // Trả dữ liệu về cho client
    return res.status(200).json({
      results: paginatedPosts, // Danh sách bài viết đã được phân trang
      currentPage: page, // Trang hiện tại
      totalPages: Math.ceil(totalItems / limit), // Tổng số trang
      totalItems // Tổng số bài viết trong tất cả collections
    });
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy dữ liệu' });
  }
};


// Đăng bài
const createPost = async (req, res) => {
  try {
    var { images, category, title,  provinceId, districtId, wardId, street, exactAddress, price, area, details, contactName, contactMobile, userId } = req.body;
    const uploadedImages = [];
    if (images && !Array.isArray(images)) {
        images = [images]; // Chuyển đổi thành mảng nếu chỉ có một ảnh
    }
    
    // Xử lý ảnh base64
    if (images && Array.isArray(images)) {
        for (const imageBase64 of images) {
            const base64Data = imageBase64.replace(/^data:image\/png;base64,/, "");
            const tempFilePath = path.join(__dirname, '../temp', `${Date.now()}.png`); // Lưu vào temp
    
            // Lưu tệp tạm thời để upload
            fs.writeFileSync(tempFilePath, base64Data, 'base64');
    
            try {
                // Upload lên Cloudinary
                const secureUrl = await uploadToCloudinary(tempFilePath);
                uploadedImages.push(secureUrl);
            } catch (error) {
                console.error(`Error uploading image: ${error.message}`);
            } finally {
                // Xóa tệp tạm thời sau khi upload
                fs.unlinkSync(tempFilePath);
            }
        }
    }

    // Xác định model bài viết dựa trên category
    let PostModel;
    switch (category) {
      case 'room':
        PostModel = Room;
        break;
      case 'house':
        PostModel = House;
        break;
      case 'apartment':
        PostModel = Apartment;
        break;
      case 'find-roommate':
        PostModel = FindRoommate;
        break;
      default:
        return res.status(400).json({ message: 'Invalid category' });
    }
    // Lưu thông tin tỉnh, huyện, xã vào các collections tương ứng
    const provinceData = await Province.findOneAndUpdate(
      { id: provinceId }, // Điều kiện lọc
      { $set: { updatedAt: new Date() } }, // Nếu cần cập nhật bất kỳ trường nào
      { new: true } // Đảm bảo trả về giá trị sau khi cập nhật
    ).exec();

// Tìm và cập nhật quận
let districtData = await District.findOneAndUpdate(
  { id: districtId },
  { $set: { updatedAt: new Date() } },
  { new: true }
).exec();

if (!districtData) {
  // Nếu không tìm thấy districtData, gọi API để lấy dữ liệu quận/huyện
  try {
    const apiResponse = await axios.get(`https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`);
    const districtList = apiResponse.data.data;

    // Tìm thông tin quận/huyện trong dữ liệu lấy từ API
    const districtFromApi = districtList.find(d => d.id === districtId);

    if (districtFromApi) {
      // Tạo mới district trong cơ sở dữ liệu
      districtData = await District.create({
        id: districtFromApi.id,
        name: districtFromApi.name,
        full_name: districtFromApi.full_name,
        latitude: districtFromApi.latitude,
        longitude: districtFromApi.longitude,
        provinceId: provinceData._id, // Thêm provinceId vào model
        __v: 0, // Mặc định là 0 khi tạo mới
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log("New district created:", districtData);
    }
  } catch (error) {
    console.error("Error fetching district data from API:", error);
  }
}

// Lấy districtData._id để sử dụng
const districtIdToUse = districtData ? districtData._id : null;

// Tìm và cập nhật xã/phường
let wardData = await Ward.findOneAndUpdate(
  { id: wardId },
  { $set: { updatedAt: new Date() } },
  { new: true }
).exec();

if (!wardData) {
  // Nếu không tìm thấy wardData, gọi API để lấy dữ liệu xã/phường
  try {
    const apiResponse = await axios.get(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`);
    const wardList = apiResponse.data.data;

    // Tìm thông tin xã/phường trong dữ liệu lấy từ API
    const wardFromApi = wardList.find(w => w.id === wardId);
    console.log("wardFromApi: ",wardFromApi);
    if (wardFromApi) {
      // Tạo mới ward trong cơ sở dữ liệu
      wardData = await Ward.create({
        id: wardFromApi.id,
        name: wardFromApi.name,
        full_name: wardFromApi.full_name,
        latitude: wardFromApi.latitude,
        longitude: wardFromApi.longitude,
        districtId: districtData._id, 
        __v: 0, // Mặc định là 0 khi tạo mới
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log("New ward created:", wardData);
    }
  } catch (error) {
    console.error("Error fetching ward data from API:", error);
  }
}

// Lấy wardData._id để sử dụng
const wardIdToUse = wardData ? wardData._id : null;

    // Tạo bài viết mới
    const newPost = new PostModel({
      title,
      province: provinceData._id,
      district: districtIdToUse,
      ward: wardIdToUse,
      street,
      exactAddress,
      price,
      area,
      details,
      contactName,
      contactMobile,
      images: uploadedImages,
      userId,
    });
    await newPost.save();
    res.status(201).json({ message: 'Post created successfully!', post: newPost });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
};

// 
const searchPosts = async (req, res) => {
  const { searchString, category, province, district, minPrice, maxPrice, minArea, maxArea, page = 1 } = req.body; // Nhận các tham số tìm kiếm từ request body
  const userId = req.userId; // Lấy userId từ token hoặc req.body

  try {

    // Step 2: Xây dựng điều kiện tìm kiếm
    let query = {};

    // Tìm kiếm theo loại bài đăng
    if (category) {
      switch (category) {
        case 'room':
          query.model = Room;
          break;
        case 'house':
          query.model = House;
          break;
        case 'apartment':
          query.model = Apartment;
          break;
        case 'find-roommate':
          query.model = FindRoommate;
          break;
        default:
          return res.status(400).json({ message: 'Invalid category' });
      }
    }

    // Tìm kiếm theo khu vực (tỉnh, huyện)
    if (province) {
      const provinceData = await Province.findOne({ name: province });
      if (provinceData) query.province = provinceData._id;
    }
    if (district) {
      const districtData = await District.findOne({ name: district });
      if (districtData) query.district = districtData._id;
    }

    // Tìm kiếm theo khoảng giá
    if (minPrice !== undefined && maxPrice !== undefined) {
      query.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice !== undefined) {
      query.price = { $gte: minPrice };
    } else if (maxPrice !== undefined) {
      query.price = { $lte: maxPrice };
    }

    // Tìm kiếm theo diện tích
    if (minArea !== undefined && maxArea !== undefined) {
      query.area = { $gte: minArea, $lte: maxArea };
    } else if (minArea !== undefined) {
      query.area = { $gte: minArea };
    } else if (maxArea !== undefined) {
      query.area = { $lte: maxArea };
    }


    // Step 3: Thực hiện truy vấn và phân trang (pagination)
    const itemsPerPage = 9;
    const skip = (page - 1) * itemsPerPage; // Số bài cần bỏ qua dựa trên trang hiện tại
    const PostModel = query.model || Post; // Model bài đăng dựa theo category, mặc định là Post

    const searchResults = await PostModel.find(query)
      .skip(skip)
      .limit(itemsPerPage);

    const totalCount = await PostModel.countDocuments(query); // Đếm tổng số bài viết phù hợp

    // Step 4: Phản hồi kết quả tìm kiếm
    res.status(200).json({
      message: searchResults.length > 0 ? 'Search successful' : 'No results found',
      results: searchResults,
      totalItems: totalCount, // Tổng số bài viết phù hợp
      totalPages: Math.ceil(totalCount / itemsPerPage), // Tổng số trang
      currentPage: page
    });

  } catch (error) {
    console.error('Error searching posts:', error);
    res.status(500).json({ message: 'Error searching posts', error: error.message });
  }
};


module.exports = { getPosts, getLatestPosts, createPost, searchPosts }; // Export cả searchPosts
