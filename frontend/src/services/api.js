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

// Hàm lấy danh sách người dùng với phân trang
export const getUsersWithPagination = (page) => {
  return axios.get(`${API_URL}/user`, { 
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,  // Lấy token từ localStorage
    },
    params: { 
      page: page  // Truyền tham số phân trang vào query string
    }
  });
};

export const updateUser = (userData, userId) => {
  return axios.put(`${API_URL}/user/update/${userId}`, userData);
};

export const updateUserRole = (userId, role) => {
  return axios.put(
    `${API_URL}/user/update-role/${userId}`, 
    { role }, // Role được đưa vào body dưới dạng một đối tượng
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`, // Lấy token từ localStorage
      },
    }
  );
};

export const deleteUser = (userId) => {
  return axios.delete(`${API_URL}/user/delete/${userId}`, { 
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,  // Lấy token từ localStorage
    },
  });
};


// Hàm thêm bài đăng 
export const postNew = (formData) => {
  return axios.post(`${API_URL}/posts`, formData);
};


// Hàm thêm bài đăng 
export const postUpdate = (data, id) => {
  return axios.put(`${API_URL}/posts/${id}`, data);
};

// Hàm xóa bài đăng 
export const deletePost = (ids) => {
  return axios.post(`${API_URL}/posts/delete`, ids);
};


// Hàm lấy bài đăng theo loại
export const getPosts = (query) => {
  return axios.get(`${API_URL}/posts`, {
    params: { type: query.type, page: query.page, search: query.search}
  });
};

// Hàm lấy bài đăng của người dùng
export const getUserPosts = (userId) => {
  return axios.get(`${API_URL}/posts/user/${userId}`, {
  });
};

// Hàm lấy bài đăng mới nhất
export const getLatestPosts = (query) => {
  return axios.get(`${API_URL}/latest-posts`, {
    params: { page: query.page,
              limit: query.limit,
              search: query.search,
              roomType: query.roomType, 
              location: query.location, 
              price: query.price, 
              area: query.area,
           }
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
export const searchRoom = (data, page) => {
  return axios.post(`${API_URL}/search-room`, data,{
    params: { page: page }
  });
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
    params: { userId: query.userId ,
            page: query.page
    }
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

// Hàm update tin
export const articleUpdate = (data, id) => {
  return axios.put(`${API_URL}/article/${id}`, data);
};

// Hàm xóa tin
export const deleteArticle = (id) => {
  return axios.delete(`${API_URL}/article/${id}`);
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


// Hàm tạo mới conversations
export const createConversation = (data) => {
  return axios.post(`${API_URL}/conversations`, data);
};

// Hàm Lấy tất cả cuộc hội thoại của người dùng
export const getUserConversations = (userId, page = 1, pageSize = 10) => {
  return axios.get(`${API_URL}/conversations/${userId}`, {
    params: {
      page,      // Tham số page
      pageSize   // Tham số pageSize
    }
  });
};

// Hàm lấy tất cả tin nhắn trong một cuộc hội thoại
export const getUserProfileById = (userId) => {
  return axios.get(`${API_URL}/user/${userId }`, {
  });
};

// Hàm gửi tin nhắn
export const sendMessage = (data) => {
  return axios.post(`${API_URL}/messages`, data);
};

// Hàm lấy tất cả tin nhắn trong một cuộc hội thoại
export const getMessages = (conversationId , page = 1, pageSize = 10) => {
  return axios.get(`${API_URL}/messages/${conversationId }`, {
    params: {
      page,      // Tham số page
      pageSize   // Tham số pageSize
    }
  });
};

// Hàm đánh dấu đã đọc
export const resetUnreadMessages = (conversationId, userId) => {
  return axios.post(`${API_URL}/resetUnreadMessages`, {
    conversationId,
    userId
  });
};

// Hàm tạo giao dịch thanh toán 
export const createPayment = (id, amount, buyUser) => {
  return axios.post(`${API_URL}/payment/create`, {
    id,
    amount, 
    buyUser
  });
};

// Trả về thông báo
export const vnpayReturn = (vnp_ResponseCode , vnp_TxnRef, vnp_SecureHash) => {
  return axios.get(`${API_URL}/vnpay_return`, {
    params: {
      vnp_ResponseCode , vnp_TxnRef, vnp_SecureHash
    }
  });
};

// Hàm lấy lịch sử giao dịch của người dùng
export const getHistories = (userId , page = 1, pageSize = 10) => {
  return axios.get(`${API_URL}/history/${userId }`, {
    params: {
      page,      // Tham số page
      pageSize   // Tham số pageSize
    }
  });
};