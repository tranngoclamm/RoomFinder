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

// Xóa bài viết
const deleteArticle = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedArticle = await Article.findByIdAndDelete(id);
      if (!deletedArticle) {
        return res.status(404).json({ message: "Bài viết không tồn tại" });
      }
      res.status(200).json({ message: "Đã xóa bài viết thành công", article: deletedArticle });
    } catch (error) {
      console.error("Lỗi khi xóa bài viết:", error);
      res.status(500).json({ message: "Đã xảy ra lỗi khi xóa bài viết" });
    }
  };

// Update bài viết
const updateArticle = async (req, res) => {
    const { id } = req.params;
    const { category, title, content, author, landlord } = req.body;
    console.log("id:", id)
    console.log("body:", req.body)
    try {
      const articleToUpdate = await Article.findById(id);
      if (!articleToUpdate) {
        return res.status(404).json({ message: "Bài viết không tồn tại" });
      }
  
      // Nếu tiêu đề thay đổi, cập nhật slug
      if (title && title !== articleToUpdate.title) {
        let slug = slugify(title, { lower: true });
        const existingArticle = await Article.findOne({ slug });
        if (existingArticle && existingArticle._id.toString() !== id) {
          let count = 1;
          while (await Article.findOne({ slug: `${slug}-${count}` })) {
            count++;
          }
          slug = `${slug}-${count}`;
        }
        articleToUpdate.slug = slug;
      }
  
      // Cập nhật các trường khác
      if (category) articleToUpdate.category = category;
      if (title) articleToUpdate.title = title;
      if (content) articleToUpdate.content = content;
      if (author) articleToUpdate.author = author;
      if (landlord) articleToUpdate.landlord = landlord;
  
      // Lưu thay đổi
      const updatedArticle = await articleToUpdate.save();
      res.status(200).json({ message: "Cập nhật bài viết thành công", article: updatedArticle });
    } catch (error) {
      console.error("Lỗi khi cập nhật bài viết:", error);
      res.status(500).json({ message: "Đã xảy ra lỗi khi cập nhật bài viết" });
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

const getArticleDetail = async (req, res) => {
    const { slug } = req.params;
    try {
      const article = await Article.findOne({ slug })
        .populate({
            path: 'landlord',
            select: '-password' // loại bỏ trường password khỏi landlord
        })
        .populate({
            path: 'author',
            select: '-password' // loại bỏ trường password khỏi author
        });
      
      if (!article) {
        return res.status(404).json({ message: 'Bài viết không tồn tại' });
      }
      res.json(article);
    } catch (error) {
      console.error('Error details:', error);
      res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy bài viết' });
    }
  };

  const articlesByUser = async (req, res) => {
    const { userId } = req.params;
    const { page = 1, pageSize = 10 } = req.query; // Lấy page và pageSize từ query, mặc định là 1 và 10

    try {
        // Lấy tổng số lượng bài viết của người dùng
        const totalArticles = await Article.countDocuments({ author: userId });

        // Lấy bài viết theo trang
        const articles = await Article.find({ author: userId })
            .populate({
                path: 'landlord',
                select: '-password' // loại bỏ trường password khỏi landlord
            })
            .populate({
                path: 'author',
                select: '-password' // loại bỏ trường password khỏi author
            })
            .sort({ createdAt: -1 }) // Sắp xếp bài viết theo ngày tạo (mới nhất trước)
            .skip((page - 1) * pageSize) // Bỏ qua số lượng bài viết ở các trang trước đó
            .limit(Number(pageSize)); // Giới hạn số lượng bài viết trả về

        // Kiểm tra nếu không có bài viết nào
        if (!articles.length) {
            return res.status(404).json({ message: 'Bài viết không tồn tại' });
        }

        // Trả về dữ liệu bao gồm bài viết và tổng số lượng bài viết
        res.json({
            total: totalArticles,  // Tổng số lượng bài viết
            articles,              // Danh sách bài viết
        });
    } catch (error) {
        console.error('Error details:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy bài viết' });
    }
};


module.exports = { createArticle, getLatestArticles, updateArticle, deleteArticle, getArticleDetail,articlesByUser  };
