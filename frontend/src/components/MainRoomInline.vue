<!-- RoomCategory.vue -->
<template>
    <div id="app">
        <HeaderRoom @search="handleSearch"  @scroll-to-title="scrollToPostTitle" />  
        <div class="room-category d-flex flex-column justify-content-center align-items-center">
              
            <!-- Danh sách phòng -->
            <RoomInline ref="roomInline"/>

            <!-- Chi tiết phòng -->
            <DetailRoom v-if="showModal" @close-modal="showModal = false" :apartment="apartment" />
        </div>

        <PostNewModal v-if="showModal" @close-modal="closeModal" />

        <FooterRoom />  
    </div>
</template>
  
  <script>
  import 'bootstrap/dist/css/bootstrap.min.css';
  import '@/assets/css/app.css'; // Nhúng file CSS
  import 'bootstrap/dist/js/bootstrap.bundle.js';
  import HeaderRoom from './HeaderRoom.vue';
  import RoomInline from './RoomInline.vue';
  import PostNewModal from './PostNewModal.vue';
  import FooterRoom from './FooterRoom.vue';
  import DetailRoom from './DetailRoom.vue'; 
  import { search } from '@/services/api'; // Import hàm gọi API từ api.js

  
  export default {
    components: {
      HeaderRoom,
      RoomInline,
      PostNewModal,
      FooterRoom,
      DetailRoom
    },
    data() {
      return {
         searchQuery: '',
         showModal: false, // Trạng thái để điều khiển modal
         animation: {
          phone: false,
         },
          config: {
            selected: {
              id: null,
            },
          },
      };
    },
    methods: {
      scrollToPostTitle() {
        this.$refs.roomInline.scrollToTitle(); // Gọi phương thức trong RoomInline
      },
      async handleSearch() {
        const userString = localStorage.getItem('user');
        const user = JSON.parse(userString);
        // Lấy ID
        const userId = user._id;
            console.log(userId);
            const searchData = {
              searchString: this.searchQuery,
              userId: userId,
              timestamp: new Date().toISOString() // Current timestamp
            };
            try {
              console.log(searchData.query);
              if (!searchData.searchString || typeof searchData.searchString !== 'string') {
              alert('Vui lòng nhập nội dung tìm kiếm hợp lệ.');
              return; // Stop execution if the search string is not valid
            }
              const response = await search(searchData);

              if (response && response.data) {
                console.log('Search Results:', searchData);
              }
            } catch (error) {
              if (error.response && error.response.data.message) {
                alert(error.response.data.message);
              } else {
                alert('Đã xảy ra lỗi, vui lòng thử lại.');
              }
            }
      },

      openModal() {
        this.showModal = true; // Mở modal
      },

      closeModal() {
        this.showModal = false; // Đóng modal
      },
    },
  };
  </script>
    
