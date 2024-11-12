<!-- HomePage.vue -->
<template>
  <LoadingPreloader :isLoading="isLoading" />
  <HeaderRoom @search="handleSearch" @scroll-to-latestPostTitle="scrollToLatestPostTitle" />
  <div v-if="!isLoading" :class="{ loaded: !isLoading }" class="main_content">
    <TrendRoom />
    <BlogHomePage />
    <RoomCategory ref="roomCategory" @search="receiveEmit" :results="dataSearch" :total-pages="totalPages"
      :current-page="currentPage" />
    <!-- Pagination Navigation -->
    <div class="d-flex justify-content-center">
      <ul role="navigation" class="pagination mb-3">
        <li @click="goToPage(currentPage - 1)" :class="{ disabled: currentPage === 1 }" class="page-item">
          <span aria-hidden="true" class="page-link">‹</span>
        </li>
        <li v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="{ active: currentPage === page }"
          class="page-item">
          <span class="page-link">{{ page }}</span>
        </li>
        <li @click="goToPage(currentPage + 1)" :class="{ disabled: currentPage === totalPages }" class="page-item">
          <span aria-hidden="true" class="page-link">›</span>
        </li>
      </ul>
    </div>
    <FooterRoom />
    <PostNewModal v-if="showModal" @close-modal="closeModal" />
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.min.css';
  import '@/assets/css/app.css'; // Nhúng file CSS
  import 'bootstrap/dist/js/bootstrap.bundle.js';
  import HeaderRoom from './HeaderRoom.vue';
  import LoadingPreloader from '../LoadingPreloader.vue';
  import TrendRoom from './RoomComponents/TrendRoom.vue';
  import RoomCategory from './RoomComponents/RoomCategory.vue';
  import BlogHomePage from './BlogHomePage.vue';
  import FooterRoom from './FooterRoom.vue';
  import PostNewModal from './RoomComponents/PostNewModal.vue';
  import {
    // searchRoom,
    getLatestPosts
  } from '@/services/api'; // Import hàm gọi API từ api.js

  export default {
    emits: ['scrollToLatestPostTitle'], // Khai báo sự kiện
    components: {
      LoadingPreloader,
      TrendRoom,
      RoomCategory,
      BlogHomePage,
      PostNewModal,
      HeaderRoom,
      FooterRoom,
    },
    data() {
      return {
        isLoading: true,
        results: '',
        dataSearch: [],
        fullname: '',
        selectedArea:{
                      from: 0,
                      to: "50+",
                    },
        selectedLocation:'',
        selectedPrice:
        {
            from: 0,
            to: "30+",
          },
        selectedRoomType:'All',
        currentPage: 1, // Trang hiện tại
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
          {
            id: 1,
            title: 'Phòng 1',
            description: 'Mô tả phòng 1',
            image: 'images/room1.jpg'
          },
          {
            id: 2,
            title: 'Phòng 2',
            description: 'Mô tả phòng 2',
            image: 'images/room2.jpg'
          },
          {
            id: 3,
            title: 'Phòng 3',
            description: 'Mô tả phòng 3',
            image: 'images/room3.jpg'
          },
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

      async fetchLatestPosts(searchInput, page = 1) {
      try {
        const response = await getLatestPosts({
          type: this.type,
          search: searchInput,
          page: page,
          roomType: this.selectedRoomType, 
          location: this.selectedLocation, 
          price: this.selectedPrice, 
          area: this.selectedArea,
        });
        if (response && response.data) {
          this.dataSearch = response.data.results;
          this.totalPages = response.data.totalPages;
          this.currentPage = response.data.currentPage;
        }
      } catch (error) {
        console.error('Lỗi lấy bài đăng mới nhất:', error);
      }
    },
    receiveEmit(searchInput) {
      this.fetchLatestPosts(searchInput, 1); // Gọi API với trang đầu tiên
    },
    goToPage(page) {
      if (page < 1 || page > this.totalPages) return; // Kiểm tra nếu trang nằm trong giới hạn
      this.currentPage = page;
      this.fetchLatestPosts('', page); // Gọi API với trang hiện tại
    },

      async handleSearch(formData) {
        this.selectedRoomType = formData.roomType;
        this.selectedLocation = formData.location;
        this.selectedPrice = formData.price;
        this.selectedArea = formData.area;
        console.log(formData)
        console.log(this.selectedArea)
        console.log(this.selectedLocation)
        console.log(this.selectedPrice)
        console.log(this.selectedRoomType)
        // try {
        //   // Gửi yêu cầu tìm kiếm phòng
        //   const response = await searchRoom(formData);
        //   // Kiểm tra phản hồi và cập nhật kết quả
        //   if (response && response.data) {
        //     this.dataSearch = response.data.results; // Kết quả của trang hiện tại
        //     this.totalPages = response.data.totalPages; // Tổng số trang
        //     this.currentPage = response.data.currentPage; // Trang hiện tại
        //     // Thực hiện cập nhật giao diện hoặc render lại dữ liệu
        //   } else {
        //     console.warn('No data found in response.');
        //   }
        // } catch (error) {
        //   console.error('Error:', error);
        // }

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
      }, 800);
    },
  };
</script>