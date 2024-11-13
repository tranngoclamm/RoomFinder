const User = require('../models/userModel'); // Sử dụng require
const Room = require('../models/roomModel'); // Sử dụng require
const House = require('../models/houseModel'); // Sử dụng require
const Apartment = require('../models/apartmentModel'); // Sử dụng require
const FindRoommate = require('../models/findRoommateModel'); // Sử dụng require

const getFavorites = async (req, res) => {
  const { userId, page = 1, pageSize = 9 } = req.query; // Lấy userId, page, pageSize từ query

  try {
    // Tìm người dùng dựa trên userId và lấy danh sách favorites
    const user = await User.findById(userId).select('favorites');

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    const { favorites } = user;

    // Tạo các truy vấn để tìm kiếm trong các collections dựa trên danh sách favorites
    const roomPromise = Room.find({ _id: { $in: favorites } })
      .populate('province')
      .populate('district')
      .populate('ward')
      .populate({
        path: 'userId',
        select: '-password'
      });

    const housePromise = House.find({ _id: { $in: favorites } })
      .populate('province')
      .populate('district')
      .populate('ward')
      .populate({
        path: 'userId',
        select: '-password'
      });

    const apartmentPromise = Apartment.find({ _id: { $in: favorites } })
      .populate('province')
      .populate('district')
      .populate('ward')
      .populate({
        path: 'userId',
        select: '-password'
      });

    const findRoommatePromise = FindRoommate.find({ _id: { $in: favorites } })
      .populate('province')
      .populate('district')
      .populate('ward')
      .populate({
        path: 'userId',
        select: '-password'
      });

    // Thực hiện tất cả các truy vấn song song
    const [rooms, houses, apartments, findRoommates] = await Promise.all([
      roomPromise,
      housePromise,
      apartmentPromise,
      findRoommatePromise
    ]);

    // Tổng hợp tất cả các kết quả từ các collections
    const allFavorites = [...rooms, ...houses, ...apartments, ...findRoommates];
    const allFavoriteIds = allFavorites.map(item => item._id);

    // Số lượng phần tử
    const totalItems = allFavorites.length;

    // Tính toán phần tử bắt đầu và kết thúc
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;

    // Lọc các phần tử trong phạm vi phân trang
    const paginatedFavorites = allFavorites.slice(startIndex, endIndex);

    // Trả kết quả về client
    return res.status(200).json({
      allFavoriteIds: allFavoriteIds,
      results: paginatedFavorites, // Danh sách các bài yêu thích đã populate theo trang
      totalItems,                  // Tổng số bài yêu thích
      currentPage: parseInt(page, 10),
      pageSize: parseInt(pageSize, 10),
      totalPages: Math.ceil(totalItems / pageSize)
    });
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu yêu thích:', error);
    return res.status(500).json({
      message: 'Đã xảy ra lỗi khi lấy dữ liệu yêu thích'
    });
  }
};


const updateFavorites = async (req, res) => {
  const {userId,favorites} = req.body; // Lấy userId và danh sách favorites từ body

  try {
    // Tìm người dùng dựa trên userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    // Cập nhật danh sách favorites
    user.favorites = favorites;

    // Lưu lại thay đổi
    await user.save();


    // Trả kết quả về client
    return res.status(200).json({
      message: 'Favorites updated successfully',
    });
  } catch (error) {
    console.error('Lỗi khi cập nhật danh sách yêu thích:', error);
    return res.status(500).json({
      message: 'Đã xảy ra lỗi khi cập nhật danh sách yêu thích'
    });
  }
};

const addFavorite = async (req, res) => {
  const {userId,roomId} = req.body; // Lấy userId và roomId từ body
  try {
    // Tìm người dùng dựa trên userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    // Kiểm tra nếu roomId chưa có trong danh sách favorites thì thêm vào
    if (!user.favorites.includes(roomId)) {
      user.favorites.push(roomId);
      await user.save();

      return res.status(200).json({
        message: 'Room added to favorites successfully',
      });
    } else {
      return res.status(400).json({
        message: 'Room is already in favorites'
      });
    }
  } catch (error) {
    console.error('Lỗi khi thêm vào danh sách yêu thích:', error);
    return res.status(500).json({
      message: 'Đã xảy ra lỗi khi thêm vào danh sách yêu thích'
    });
  }
};

const removeFavorite = async (req, res) => {
  const {userId,roomId} = req.body; // Lấy userId và roomId từ body
  try {
    // Tìm người dùng dựa trên userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    // Kiểm tra nếu roomId có trong danh sách favorites thì xóa
    const favoriteIndex = user.favorites.indexOf(roomId);
    if (favoriteIndex !== -1) {
      user.favorites.splice(favoriteIndex, 1);
      await user.save();

      return res.status(200).json({
        message: 'Room removed from favorites successfully',
      });
    } else {
      return res.status(400).json({
        message: 'Room is not in favorites'
      });
    }
  } catch (error) {
    console.error('Lỗi khi xóa khỏi danh sách yêu thích:', error);
    return res.status(500).json({
      message: 'Đã xảy ra lỗi khi xóa khỏi danh sách yêu thích'
    });
  }
};

module.exports = {
  getFavorites,
  updateFavorites,
  addFavorite,
  removeFavorite
};