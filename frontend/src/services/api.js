import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Đường dẫn API backend của bạn

// Hàm đăng ký người dùng
export const registerUser = (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

// Hàm đăng nhập người dùng
export const loginUser = (userData) => {
  return axios.post(`${API_URL}/login`, userData);
};

// Hàm thêm bài đăng 
export const postNew = (formData) => {
  return axios.post(`${API_URL}/posts`, formData);
};

// Hàm lấy bài đăng theo loại
export const getPosts = (query) => {
  return axios.get(`${API_URL}/posts`, {
    params: { type: query.type, page: query.page, search: query.search}
  });
};


// Hàm lấy bài đăng mới nhất
export const getLatestPosts = (query) => {
  return axios.get(`${API_URL}/latest-posts`, {
    params: { page: query.page, limit: query.limit, search: query.search }
  });
};

// Hàm tìm kiếm
export const search = (data) => {
  return axios.post(`${API_URL}/search`, data);
  
};

// Hàm tìm kiếm địa chỉ ở khung search 
export const searchLocation = (query) => {
  return axios.get(`${API_URL}/search-location`, {
    params: { q: query }
  });
};

// Hàm tìm kiếm ở HomePage 
export const searchRoom = (data) => {
  return axios.post(`${API_URL}/search-room`, data);
};

// Hàm tìm kiếm chủ trọ ở đăng tin
export const searchOwner = (query) => {
  return axios.get(`${API_URL}/search-owner`, {
    params: {q: query}
  });
};

// Hàm lịch sử tìm kiếm của người dùng
export const searchHistory = (data) => {
  return axios.get(`${API_URL}/analyze-search-history`, data);
  
};

// Hàm lấy danh sách yêu thích
export const getFavorites = (query) => {
  return axios.get(`${API_URL}/favorites`,{
    params: { userId: query }
  });
};

// Hàm update danh sách yêu thích
export const updateFavorites = (data) => {
  return axios.post(`${API_URL}/favorites`, data);
};

// Hàm thêm phòng vào danh sách yêu thích
export const addFavorite = (data) => {
  return axios.post(`${API_URL}/favorites/add`, data);
};

// Hàm xóa phòng khỏi danh sách yêu thích
export const removeFavorite = (data) => {
  return axios.post(`${API_URL}/favorites/remove`, data);
};

// Hàm upload ảnh tin tức lên Cloudinary bằng upload preset
export const uploadImagePostToCloudinary = (formData) => {
  return axios.post('https://api.cloudinary.com/v1_1/dlawgdb8h/image/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// Hàm lấy chi tiết tin
export const getArticleDetail = (slug) => {
  return axios.get(`${API_URL}/blog-posts/${slug}`);
};

// Hàm lấy danh sách tin mới nhất với các tham số tìm kiếm và phân trang
export const getLatestArticles = (query = "", page = 1, size = 10, category = "") => {
  return axios.get(`${API_URL}/article`, {
    params: {query, page, size,category}
  });
};

// Hàm lấy tin theo user
export const getArticleByUser = (userId, page = 1, pageSize = 10) => {
  return axios.get(`${API_URL}/article/user/${userId}`, {
    params: {
      page,      // Tham số page
      pageSize   // Tham số pageSize
    }
  });
};

// Hàm tạo mới tin
export const createArticle = (data) => {
  return axios.post(`${API_URL}/article`, data);
};