<!-- HomePage.vue -->
<template>
    <LoadingPreloader :isLoading="isLoading" />
    <HeaderRoom @search="handleSearch"  @scroll-to-latestPostTitle="scrollToLatestPostTitle"/>
    <div v-if="!isLoading" :class="{ loaded: !isLoading }" class="main_content" >
      <RoomCategory ref="roomCategory" @search="receiveEmit" :results="dataSearch" :total-pages="totalPages" :current-page="currentPage"  /> 
      <FooterRoom />
      <PostNewModal v-if="showModal" @close-modal="closeModal" />
    </div>
</template>
  
<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/css/app.css'; // Nhúng file CSS
import 'bootstrap/dist/js/bootstrap.bundle.js';
import HeaderRoom from './HeaderRoom.vue';
import LoadingPreloader from './LoadingPreloader.vue';
import RoomCategory from './RoomCategory.vue';
import FooterRoom from './FooterRoom.vue';
import PostNewModal from './PostNewModal.vue';
import {searchRoom, getLatestPosts } from '@/services/api'; // Import hàm gọi API từ api.js

export default {
  emits: ['scrollToLatestPostTitle'], // Khai báo sự kiện
  components: {
    LoadingPreloader,
    RoomCategory,
    PostNewModal,
    HeaderRoom,
    FooterRoom,
  },
  data() {
    return {
      isLoading: true,
      results:'',
      dataSearch: [], 
      fullname: '',
      currentPage: 1,      // Trang hiện tại
      totalPages: 0, 
      showModal: false, // Trạng thái để điều khiển modal
      animation: {
        phone: false,
      },
      config: {
        selected: {
          id: null,
        },
      },
      booking__data: {
        string: '',
      },
      peoples: 1,
      rooms: [
        // Sample data for rooms
        { id: 1, title: 'Phòng 1', description: 'Mô tả phòng 1', image: 'images/room1.jpg' },
        { id: 2, title: 'Phòng 2', description: 'Mô tả phòng 2', image: 'images/room2.jpg' },
        { id: 3, title: 'Phòng 3', description: 'Mô tả phòng 3', image: 'images/room3.jpg' },
      ],
      hamburger_menu: false,
    };
  },
  methods: {
    scrollToLatestPostTitle() {
        this.$refs.roomCategory.scrollToLatestPostTitle(); // Gọi phương thức
      },
    openModal() {
      this.showModal = true; // Mở modal
    },
    closeModal() {
      this.showModal = false; // Đóng modal
    },

    receiveEmit(searchInput) {
       this.fetchLatestPosts(searchInput);
    },

    async fetchLatestPosts(searchInput) {
      try {
        const response = await getLatestPosts({ type: this.type, search: searchInput  }); // Gọi API lấy bài đăng mới nhất
        if (response && response.data) {
          this.dataSearch = response.data.results; // Dữ liệu phòng mới nhất
          this.totalPages = response.data.totalPages;
          this.currentPage = response.data.currentPage;
        }
        console.log(this.dataSearch);
      } catch (error) {
        console.error("Lỗi lấy bài đăng mới nhất:", error);
      }
    },

    async handleSearch(formData) {
      try {
        // Gửi yêu cầu tìm kiếm phòng
        const response = await searchRoom(formData);
        // Kiểm tra phản hồi và cập nhật kết quả
        if (response && response.data) {
          this.dataSearch = response.data.results;       // Kết quả của trang hiện tại
          this.totalPages = response.data.totalPages; // Tổng số trang
          this.currentPage = response.data.currentPage; // Trang hiện tại
          // Thực hiện cập nhật giao diện hoặc render lại dữ liệu
        } else {
          console.warn('No data found in response.');
        }
      } catch (error) {
        console.error('Error:', error);
      }

    },
  },
  computed: {
    isLoggedIn() {
      // Kiểm tra nếu có user trong localStorage
      return !!localStorage.getItem('user');
    },
  },
  mounted() {
    this.fetchLatestPosts(); // Gọi API để lấy bài mới nhất khi trang được tải
    // Lấy thông tin người dùng từ localStorage nếu đã đăng nhập
    setTimeout(() => {
      this.isLoading = false; // Tắt preloader sau ít nhất 0.5s
    }, 1000);
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.fullname = user.fullName || 'Người dùng'; // Thay đổi theo cách lưu trữ username trong user object
    }
  },
};
</script>
  

