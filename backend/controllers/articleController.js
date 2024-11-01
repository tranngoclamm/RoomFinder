const Article = require('../models/articleModel'); // Sử dụng require
const slugify = require('slugify');

// Đăng tin tức
const createArticle = async (req, res) => {
    const { category, title, content, author, landlord } = req.body;

    // Tạo slug từ tiêu đề
    let slug = slugify(title, { lower: true });
    const existingArticle = await Article.findOne({ slug });
    if (existingArticle) {
        // Nếu slug đã tồn tại, thêm số vào cuối slug để tạo slug mới
        let count = 1;
        while (await Article.findOne({ slug: `${slug}-${count}` })) {
            count++;
        }
        slug = `${slug}-${count}`;
    }

     // Tạo đối tượng bài viết mới
     const newArticleData = {
      category,
      title,
      content,
      author,
      slug
    };

    // Chỉ thêm landlordId nếu nó tồn tại
    if (landlord) {
      newArticleData.landlord = landlord;
    }
    try {
      const newArticle = new Article(newArticleData);
      const savedArticle = await newArticle.save();
      res.status(201).json(savedArticle);
    } catch (error) {
      console.error("Error details:", error); // Log chi tiết lỗi
      res.status(500).json({ message: error.message });
    }
};

// Lấy bài đăng mới nhất với phân trang, tìm kiếm, và lọc loại bài viết
const getLatestArticles = async (req, res) => {
  const { query = "", page = 1, size = 10, category } = req.query;

  try {
      // Tạo bộ lọc tìm kiếm
      const searchCriteria = {
          $or: [
              { title: { $regex: query, $options: "i" } },
              { content: { $regex: query, $options: "i" } }
          ]
      };

      // Thêm điều kiện lọc theo category nếu có
      if (category) {
          searchCriteria.category = category;
      }

      // Tính toán số lượng bài viết cần bỏ qua
      const skip = (page - 1) * size;

      // Lấy bài viết với bộ lọc tìm kiếm, sắp xếp theo ngày tạo mới nhất, và áp dụng phân trang
      const articles = await Article.find(searchCriteria)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(parseInt(size))
          .populate('author', 'name fullName email profilePicture phone') 
          .populate('landlord', 'name fullName email profilePicture phone');

      // Đếm tổng số bài viết khớp với tiêu chí tìm kiếm để trả về tổng số trang
      const totalArticles = await Article.countDocuments(searchCriteria);
      const totalPages = Math.ceil(totalArticles / size);

      // Trả về kết quả
      res.status(200).json({
          data: articles,
          currentPage: parseInt(page),
          totalPages: totalPages,
          totalArticles: totalArticles
      });
  } catch (error) {
      console.error("Error fetching latest articles:", error);
      res.status(500).json({ message: error.message });
  }
};


module.exports = { createArticle, getLatestArticles };
