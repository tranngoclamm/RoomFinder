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
