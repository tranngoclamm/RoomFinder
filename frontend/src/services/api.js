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
export const postNew = (userData) => {
  return axios.post(`${API_URL}/posts`, userData);
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

// Hàm lịch sử tìm kiếm của người dùng
export const searchHistory = (data) => {
  return axios.get(`${API_URL}/analyze-search-history`, data);
  
};

