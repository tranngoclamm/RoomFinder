const { uploadToCloudinary } = require('./imageController'); // Sử dụng require
const Room = require('../models/roomModel'); // Sử dụng require
const User = require('../models/userModel'); // Sử dụng require
const House = require('../models/houseModel'); // Sử dụng require
const Apartment = require('../models/apartmentModel'); // Sử dụng require
const FindRoommate = require('../models/findRoommateModel'); // Sử dụng require
const Favorites = require('../models/userModel'); // Sử dụng require
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
  const postType = req.query.type; // Lấy loại bài viết từ query string (rooms, houses, apartments, find-roommates, favorites)
  const searchQuery = req.query.search || ''; // Lấy giá trị tìm kiếm từ query string
  const status = req.query.status || ''; // Lấy giá trị tìm kiếm từ query string
  
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
    case 'favorites':
      Model = Favorites;
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
    var statusCondition
    if (status) {
      if (status === "visible") {
          // Lọc bài đăng có status là "visible"
          
       statusCondition = { status: { $ne: ["sold", "hidden"] } };

      }
      } else {
        statusCondition = { status: { $ne: 'sold' } };
      }
    var posts;
    if(postType == 'favorites'){
      posts = await Model.find({ ...searchCondition }) // Loại bỏ các bài viết có status = 'sold'
      .and([{ ...statusCondition }]) // Áp dụng lọc chỉ khi có trường status
      .populate('favorites') // Populate favorites
        .sort({ createdAt: -1 }) // Sắp xếp từ mới đến cũ
        .skip((page - 1) * limit) // Bỏ qua số bài viết đã có trên các trang trước
        .limit(limit); // Giới hạn số bài viết trả về
    } else{
      // Lấy bài viết mới nhất đến cũ và sử dụng populate
      posts = await Model.find({ ...searchCondition }) // Loại bỏ các bài viết có status = 'sold'
      .and([{ ...statusCondition }]) // Áp dụng lọc chỉ khi có trường status
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
    }

    const countPosts = await Model.countDocuments({ ...searchCondition, ...statusCondition });
    res.status(200).json({
      currentPage: page,
      totalPosts: countPosts, // Tổng số bài
      totalPages: Math.ceil(countPosts / limit), // Tổng số trang
      posts, // Bài viết hiện tại
    });
  } catch (error) {
    console.error('Lỗi lấy bài viết:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi' });
  }
};

const getUserPosts = async (req, res) => {
  const { userId } = req.params; // Lấy userId từ params

  try {
    // Tạo các truy vấn để lấy tất cả bài đăng của người dùng có userId
    const roomPromise = Room.find({ userId }).populate('province').populate('district').populate('ward').populate({
      path: 'userId',
      select: '-password' // Không lấy trường password
    });
    
    const housePromise = House.find({ userId }).populate('province').populate('district').populate('ward').populate({
      path: 'userId',
      select: '-password' // Không lấy trường password
    });
    
    const apartmentPromise = Apartment.find({ userId }).populate('province').populate('district').populate('ward').populate({
      path: 'userId',
      select: '-password' // Không lấy trường password
    });
    
    const findRoommatePromise = FindRoommate.find({ userId }).populate('province').populate('district').populate('ward').populate({
      path: 'userId',
      select: '-password' // Không lấy trường password
    });

    // Đợi tất cả các truy vấn hoàn tất
    const [rooms, houses, apartments, findRoommates] = await Promise.all([roomPromise, housePromise, apartmentPromise, findRoommatePromise]);

    // Tổng hợp dữ liệu từ các collections
    const allPosts = [...rooms, ...houses, ...apartments, ...findRoommates];

    // Trả dữ liệu về cho client
    return res.status(200).json({
      results: allPosts, // Danh sách bài viết của người dùng
      totalPosts: allPosts.length
    });
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy dữ liệu' });
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
    // Kiểm tra có trường status trong từng collection và thêm điều kiện lọc status = 'sold' nếu có
    const roomPromise = Room.find({
      ...searchCondition,
      status: { $ne: 'sold' } // Loại bỏ bài viết có status 'sold'
    }).populate('province').populate('district').populate('ward').populate({
      path: 'userId',
      select: '-password' // Không lấy trường password
    }).sort({ createdAt: -1 });
    
    const housePromise = House.find({
      ...searchCondition,
      status: { $ne: 'sold' } // Loại bỏ bài viết có status 'sold'
    }).populate('province').populate('district').populate('ward').populate({
      path: 'userId',
      select: '-password' // Không lấy trường password
    }).sort({ createdAt: -1 });
    
    const apartmentPromise = Apartment.find({
      ...searchCondition,
      status: { $ne: 'sold' } // Loại bỏ bài viết có status 'sold'
    }).populate('province').populate('district').populate('ward').populate({
      path: 'userId',
      select: '-password' // Không lấy trường password
    }).sort({ createdAt: -1 });
    
    const findRoommatePromise = FindRoommate.find({
      ...searchCondition,
      status: { $ne: 'sold' } // Loại bỏ bài viết có status 'sold'
    }).populate('province').populate('district').populate('ward').populate({
      path: 'userId',
      select: '-password' // Không lấy trường password
    }).sort({ createdAt: -1 });

    // Đợi tất cả các truy vấn hoàn tất
    const [rooms, houses, apartments, findRoommates] = await Promise.all([roomPromise, housePromise, apartmentPromise, findRoommatePromise]);

    // Tổng hợp dữ liệu từ các collections và sắp xếp theo thời gian tạo
    const allPosts = [...rooms, ...houses, ...apartments, ...findRoommates].sort(
      (a, b) => b.createdAt - a.createdAt
    );

    // Áp dụng phân trang sau khi đã tổng hợp
    const startIndex = (page - 1) * limit;
    const paginatedPosts = allPosts.slice(startIndex, startIndex + limit);

    // Đếm tổng số mục trong tất cả các collections
    const totalRooms = await Room.countDocuments({ ...searchCondition, status: { $ne: 'sold' } });
    const totalHouses = await House.countDocuments({ ...searchCondition, status: { $ne: 'sold' } });
    const totalApartments = await Apartment.countDocuments({ ...searchCondition, status: { $ne: 'sold' } });
    const totalFindRoommates = await FindRoommate.countDocuments({ ...searchCondition, status: { $ne: 'sold' } });
    
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
      var {
          category,
          title,
          provinceId,
          districtId,
          wardId,
          street,
          exactAddress,
          price,
          area,
          details,
          contactName,
          contactMobile,
          userId
      } = req.body;
      console.log("req :",req.body)
           // Kiểm tra và xử lý các file ảnh từ `req.files`
    const uploadedImages = [];
    const images = req.files || []; // Lấy tất cả ảnh từ `req.files`
      if (images) {

        for (const file of images) {
          const tempFilePath = file.path;
          try {
            // Upload file lên Cloudinary
            const secureUrl = await uploadToCloudinary(tempFilePath);
            uploadedImages.push(secureUrl);
          } catch (error) {
            console.error(`Error uploading image: ${error.message}`);
          } finally {
            // Xóa tệp tạm sau khi upload
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
              return res.status(400).json({
                  message: 'Invalid category'
              });
      }
      // Lưu thông tin tỉnh, huyện, xã vào các collections tương ứng
      const provinceData = await Province.findOneAndUpdate({
              id: provinceId
          }, // Điều kiện lọc
          {
              $set: {
                  updatedAt: new Date()
              }
          }, // Nếu cần cập nhật bất kỳ trường nào
          {
              new: true
          } // Đảm bảo trả về giá trị sau khi cập nhật
      ).exec();

      // Tìm và cập nhật quận
      let districtData = await District.findOneAndUpdate({
          id: districtId
      }, {
          $set: {
              updatedAt: new Date()
          }
      }, {
          new: true
      }).exec();

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
              }
          } catch (error) {
              console.error("Error fetching district data from API:", error);
          }
      }

      // Lấy districtData._id để sử dụng
      const districtIdToUse = districtData ? districtData._id : null;

      // Tìm và cập nhật xã/phường
      let wardData = await Ward.findOneAndUpdate({
          id: wardId
      }, {
          $set: {
              updatedAt: new Date()
          }
      }, {
          new: true
      }).exec();

      if (!wardData) {
          // Nếu không tìm thấy wardData, gọi API để lấy dữ liệu xã/phường
          try {
              const apiResponse = await axios.get(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`);
              const wardList = apiResponse.data.data;

              // Tìm thông tin xã/phường trong dữ liệu lấy từ API
              const wardFromApi = wardList.find(w => w.id === wardId);
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
      res.status(201).json({
          message: 'Post created successfully!',
          post: newPost
      });
      // Cập nhật postedRooms của user
      await User.findByIdAndUpdate(
        userId, // Lấy userId từ request
        { $push: { postedRooms: newPost._id } }, // Thêm _id của bài đăng vào postedRooms
        { new: true, useFindAndModify: false }
      );
  } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({
          message: 'Error creating post',
          error: error.message
      });
  }
};

//Update bài
const mongoose = require('mongoose'); // Để sử dụng ObjectId

const updatePost = async (req, res) => {
  try {
    const {
      category,
      title,
      provinceId,
      districtId,
      wardId,
      street,
      exactAddress,
      price,
      area,
      details,
      contactName,
      contactMobile,
      userId,
    } = req.body;

    const postId = req.params.id;
    // Tìm bài viết trong tất cả các collections để lấy category cũ
    const categoryModels = { room: Room, house: House, apartment: Apartment, 'find-roommate': FindRoommate };
    let existingPost = null;
    let currentCategory = null;

    for (const [key, model] of Object.entries(categoryModels)) {
      existingPost = await model.findById(postId);
      if (existingPost) {
        currentCategory = key;
        break;
      }
    }
    if (!existingPost) {
      return res.status(404).json({ message: 'Post not found in any category' });
    }
    const uploadedImages = [];
    const images = req.files || []; // Lấy tất cả ảnh từ `req.files`
      if (images) {

        for (const file of images) {
          const tempFilePath = file.path;
          try {
            // Upload file lên Cloudinary
            const secureUrl = await uploadToCloudinary(tempFilePath);
            uploadedImages.push(secureUrl);
          } catch (error) {
            console.error(`Error uploading image: ${error.message}`);
          } finally {
            // Xóa tệp tạm sau khi upload
            fs.unlinkSync(tempFilePath);
          }
        }
      }
    // Lưu thông tin tỉnh, huyện, xã vào các collections tương ứng
    const provinceData = await Province.findOneAndUpdate({
      id: provinceId
  }, // Điều kiện lọc
  {
      $set: {
          updatedAt: new Date()
      }
  }, // Nếu cần cập nhật bất kỳ trường nào
  {
      new: true
  } // Đảm bảo trả về giá trị sau khi cập nhật
).exec();

// Tìm và cập nhật quận
let districtData = await District.findOneAndUpdate({
  id: districtId
}, {
  $set: {
      updatedAt: new Date()
  }
}, {
  new: true
}).exec();

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
      }
  } catch (error) {
      console.error("Error fetching district data from API:", error);
  }
}

// Lấy districtData._id để sử dụng
const districtIdToUse = districtData ? districtData._id : null;

// Tìm và cập nhật xã/phường
let wardData = await Ward.findOneAndUpdate({
  id: wardId
}, {
  $set: {
      updatedAt: new Date()
  }
}, {
  new: true
}).exec();

if (!wardData) {
  // Nếu không tìm thấy wardData, gọi API để lấy dữ liệu xã/phường
  try {
      const apiResponse = await axios.get(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`);
      const wardList = apiResponse.data.data;

      // Tìm thông tin xã/phường trong dữ liệu lấy từ API
      const wardFromApi = wardList.find(w => w.id === wardId);
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
      }
  } catch (error) {
      console.error("Error fetching ward data from API:", error);
  }
}

// Lấy wardData._id để sử dụng
const wardIdToUse = wardData ? wardData._id : null;

    // Nếu category thay đổi:
    // 1. Xóa bài viết từ category cũ
    await categoryModels[currentCategory].findByIdAndDelete(postId);

    // 2. Tạo bài viết mới trong category mới
    const PostModel = categoryModels[category];
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
      userId: userId,
    });

    await newPost.save();

    res.status(200).json({
      message: 'Post moved to new category and updated successfully!',
      post: newPost,
    });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Error updating post', error: error.message });
  }
};




// Xóa bài
const deletePosts = async (req, res) => {
  const { ids } = req.body; // Lấy danh sách id từ request body
  console.log(req.body)
  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: 'Danh sách id không hợp lệ hoặc trống.' });
  }

  try {
    // Khởi tạo danh sách các promises xóa
    const deletePromises = ids.map(async (id) => {

      // Kiểm tra và xóa trong từng collection
      const deletedRoom = await Room.findByIdAndDelete(id);
      if (deletedRoom) return { id, collection: 'Room', success: true };

      const deletedHouse = await House.findByIdAndDelete(id);
      if (deletedHouse) return { id, collection: 'House', success: true };

      const deletedApartment = await Apartment.findByIdAndDelete(id);
      if (deletedApartment) return { id, collection: 'Apartment', success: true };

      const deletedFindRoommate = await FindRoommate.findByIdAndDelete(id);
      if (deletedFindRoommate) return { id, collection: 'FindRoommate', success: true };

      // Nếu không tìm thấy, trả về thông báo thất bại
      return { id, collection: null, success: false };
    });

    // Chờ tất cả các thao tác xoá hoàn tất
    const results = await Promise.all(deletePromises);

    // Phân loại kết quả
    const successfulDeletes = results.filter((result) => result.success);
    const failedDeletes = results.filter((result) => !result.success);

    // Trả kết quả về cho client
    return res.status(200).json({
      message: 'Đã xử lý xóa bài viết.',
      successfulDeletes, // Danh sách bài viết xóa thành công
      failedDeletes, // Danh sách bài viết không tìm thấy hoặc thất bại
    });
  } catch (error) {
    console.error('Lỗi khi xóa bài viết:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa bài viết.' });
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

// Lấy tất cả bài theo location để phân tích
const getAllPostsForAnalytics = async (req, res) => {
  try {
    // Aggregation pipeline để gộp dữ liệu từ 4 collections
    const collections = [Room, House, Apartment, FindRoommate];
    const promises = collections.map((collection) => {
      return collection.aggregate([
        {
          // Nhóm dữ liệu theo tỉnh, quận và phường
          $group: {
            _id: {
              province: "$province",
              district: "$district",
              ward: "$ward",
              isSold: "$isSold"
            },
            totalPosts: { $sum: 1 },
            totalSold: { $sum: { $cond: ["$isSold", 1, 0] } },
            avgPrice: { $avg: "$price" }
          }
        },
        {
          // Gộp tỉnh
          $group: {
            _id: {
              province: "$_id.province",
              district: "$_id.district"
            },
            wards: {
              $push: {
                ward: "$_id.ward",
                totalPosts: "$totalPosts",
                totalSold: "$totalSold",
                avgPrice: "$avgPrice"
              }
            },
            totalPostsInDistrict: { $sum: "$totalPosts" },
            totalSoldInDistrict: { $sum: "$totalSold" },
            avgPriceInDistrict: { $avg: "$avgPrice" }
          }
        },
        {
          // Gộp quận trong mỗi tỉnh
          $group: {
            _id: "$_id.province",
            districts: {
              $push: {
                district: "$_id.district",
                wards: "$wards",
                totalPostsInDistrict: "$totalPostsInDistrict",
                totalSoldInDistrict: "$totalSoldInDistrict",
                avgPriceInDistrict: "$avgPriceInDistrict"
              }
            },
            totalPostsInProvince: { $sum: "$totalPostsInDistrict" },
            totalSoldInProvince: { $sum: "$totalSoldInDistrict" },
            avgPriceInProvince: { $avg: "$avgPriceInDistrict" }
          }
        },
        {
          // Lookup để lấy thông tin tên của các tỉnh
          $lookup: {
            from: "provinces",
            localField: "_id",
            foreignField: "_id",
            as: "provinceInfo"
          }
        },
        { $unwind: "$provinceInfo" },
        {
          // Chọn ra các trường cần thiết để trả về
          $project: {
            _id: 0,
            provinceId: "$provinceInfo._id",
            provinceName: "$provinceInfo.name",
            totalPostsInProvince: 1,
            totalSoldInProvince: 1,
            avgPriceInProvince: 1,
            districts: 1
          }
        }
      ]);
    });

    // Chạy tất cả các promise và gộp kết quả
    const results = await Promise.all(promises);
    const allStatistics = results.flat();

    // Trả dữ liệu về cho client
    res.status(200).json(allStatistics);
  } catch (error) {
    console.error("Lỗi khi thống kê dữ liệu:", error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi thống kê dữ liệu" });
  }
};

const findCategoryByPostId = async (req, res) => {
  try {
    const { id: postId } = req.params;

    // Các model và category tương ứng
    const categoryModels = { 
      room: Room, 
      house: House, 
      apartment: Apartment, 
      'find-roommate': FindRoommate 
    };

    // Tìm bài viết trong từng collection
    for (const [category, model] of Object.entries(categoryModels)) {
      const post = await model.findById(postId);
      if (post) {
        return res.status(200).json({ category, post });
      }
    }

    // Nếu không tìm thấy bài viết
    return res.status(404).json({ message: "Không tìm thấy bài viết." });
  } catch (error) {
    console.error("Lỗi khi tìm category:", error);
    return res.status(500).json({ message: "Lỗi máy chủ." });
  }
};

const updatePostVisibility = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const { status } = req.body; // Trạng thái được truyền từ client (visible hoặc hidden)

    // Kiểm tra giá trị status hợp lệ
    if (!["visible", "hidden"].includes(status)) {
      return res.status(400).json({ message: "Trạng thái không hợp lệ. Chỉ chấp nhận 'visible' hoặc 'hidden'." });
    }

    // Các model và category tương ứng
    const categoryModels = { 
      room: Room, 
      house: House, 
      apartment: Apartment, 
      'find-roommate': FindRoommate 
    };

    // Tìm bài viết và cập nhật trạng thái
    for (const [category, model] of Object.entries(categoryModels)) {
      const post = await model.findById(postId);
      if (post) {
        // Cập nhật trường status
        post.status = status; 
        const updatedPost = await post.save();
        // Trả về bài viết sau khi cập nhật
        return res.status(200).json({ 
          message: "Cập nhật trạng thái thành công.", 
          post: updatedPost 
        });
      }
    }

    // Nếu không tìm thấy bài viết
    return res.status(404).json({ message: "Không tìm thấy bài viết." });
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái bài viết:", error);
    return res.status(500).json({ message: "Lỗi máy chủ." });
  }
};




module.exports = { getPosts, getLatestPosts, createPost,updatePost, deletePosts,updatePostVisibility,findCategoryByPostId , searchPosts, getAllPostsForAnalytics, getUserPosts }; // Export cả searchPosts
