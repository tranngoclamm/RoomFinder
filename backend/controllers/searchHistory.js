const SearchHistory = require('../models/searchHistoryModel'); // Điều chỉnh đường dẫn cho phù hợp

// Phân tích lịch sử tìm kiếm
exports.analyzeSearchHistory = async (req, res) => {
  try {
    // Ví dụ 1: Đếm số lần tìm kiếm theo từng từ khóa
    const keywordCounts = await SearchHistory.aggregate([
      {
        $group: {
          _id: "$searchString", // Nhóm theo trường searchString
          count: { $sum: 1 },   // Đếm số lần xuất hiện
        },
      },
      {
        $sort: { count: -1 } // Sắp xếp theo số lần tìm kiếm giảm dần
      }
    ]);

    // Ví dụ 2: Lấy lịch sử tìm kiếm gần đây nhất của mỗi người dùng
    const recentSearches = await SearchHistory.aggregate([
      {
        $sort: { timestamp: -1 } // Sắp xếp theo timestamp giảm dần
      },
      {
        $group: {
          _id: "$userId", // Nhóm theo userId
          recentSearch: { $first: "$searchString" }, // Lấy tìm kiếm gần đây nhất
          timestamp: { $first: "$timestamp" } // Lấy timestamp của tìm kiếm gần đây nhất
        },
      }
    ]);

    res.status(200).json({
      keywordCounts,
      recentSearches
    });
  } catch (error) {
    console.error('Lỗi phân tích lịch sử tìm kiếm:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình phân tích lịch sử tìm kiếm', error: error.message });
  }
};
