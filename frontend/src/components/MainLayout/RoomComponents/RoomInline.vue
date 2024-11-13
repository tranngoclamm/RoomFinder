<template>
  <!-- Khung search -->
  <div class="view-switcher room-list d-flex align-items-center justify-content-between">
    <div class="breadcrumb-list">
      <router-link to="/">RoomFinder</router-link>
      <span> > </span>
      <a ref="postTitle" href="">{{type}}</a>
    </div>
    <div class="view-switcher__element"><input type="hidden" value="en">
      <input v-model="searchQuery" type="text" placeholder="Nhập nội dung tìm kiếm" class="form-control">
      <a href="#" @click.prevent="fetchData"><i class="fas fa-search"></i></a>
      <a href="#" style="display: none;"></a>
      <a class="active" v-if="this.roomType !='favorites'">
        <i class="fas fa-th-large"></i>
      </a>
      <a v-if="this.roomType !='favorites'">
        <i class="fas fa-list-ul"></i>
      </a>
    </div>
    <div v-if="this.roomType=='favorites'">
      <a href="" @click.prevent="fetchData">Hủy</a>
      <a class="ml-4" href="" @click.prevent="updateFavorites()">Lưu</a>
    </div>
  </div>

  <!-- Danh sách phòng -->
  <div class="apartment__inline">
    <div class="row">
      <div class="col-12">
        <div class="apartment__inline__card" v-for="item in items" :key="item._id">
          <div class="row">
            <div class="col-md-4 col-6 pr-tablet-0" @click.prevent="openDetailRoom(item)">
              <a>
                <img
                  :src="item.images[0] || 'https://cdn.dribbble.com/users/263641/screenshots/4517916/404_not_found_3_dribbble.jpg'"
                  alt="" class="apartment__inline__card__img">
              </a>
            </div>
            <div class="col-md-8 col-6 pl-tablet-0">
              <div class="apartment__inline__card__container">
                <div class="apartment__inline__card__container__header">
                  <div class="row">
                    <div class="col-11 apartment__inline__card__container__header-street-wrap">
                      <small @click.prevent="openDetailRoom(item)">{{ item.title }}</small>
                    </div>
                    <div class="col-1 apartment__inline__card__container__header-price-wrap">
                      <div @click.prevent="toggleFavorite(item)"
                        class="apartment__list__card__container__facilities__balcony d-flex align-items-center">
                        <img
                          :src="this.favoriteRooms.includes(item._id) ? require('@/assets/images/ic-heart-active.svg') : require('@/assets/images/ic-heart.svg')"
                          alt="" class="inline-heart">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="my-2 description">
                  <span>{{ item.details }}</span>
                </div>
                <div class="apartment__inline__card__container__facilities">
                  <div class="row">
                    <div class="col-3 col-mob-dn d-flex align-items-center">
                      <img src="@/assets/images/time-svgrepo-com.svg" alt="" class="icon-time me-1">
                      <span class="time">{{ formatDate(item.createdAt) }}</span> <!-- Sử dụng phương thức formatDate -->
                    </div>
                    <div class="col-4 d-flex align-items-center">
                      <div class="apartment__list__card__container__facilities__bedroom d-flex align-items-center">
                        <img src="@/assets/images/location-87.svg" alt="" class="icon text-black">
                        <span>
                          {{ item.district && item.district.name ? item.district.name + ',' : '' }}
                          {{ item.province && item.province.name ? item.province.name : '' }}
                        </span>
                      </div>
                    </div>
                    <div
                      class="col col-3 apartment__list__card__container__header-col d-flex align-items-center justify-content-center">
                      <img class="icon-area me-1" src="@/assets/images/measure-area-svgrepo-com.svg" alt="">
                      <span class="apartment__list__card__container__header__price fw-normal">{{ item.area }}m²</span>
                    </div>
                    <div class="col-2 p-0">
                      <div class="apartment__list__card__container__facilities__balcony d-flex align-items-center">
                        <img src="@/assets/images/money-35.svg" alt="" class="icon text-black">
                        <span>{{ item.price }}tr/ tháng</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-8 loading-wrapper" v-if="loading">Loading...</div> <!-- Optional loading indicator -->
      </div>
    </div>
  </div>
  
    <!-- Pagination Navigation -->
    <div class="d-flex justify-content-center" v-if="items.length != 0">
      <ul role="navigation" class="pagination mb-3">
        <li @click="goToPage(currentPage - 1)" :class="{ disabled: currentPage === 1, 'cursor-pointer': currentPage !== 1 }" class="page-item">
          <span aria-hidden="true" class="page-link">‹</span>
        </li>
        <li v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="{ active: currentPage === page }"
          class="page-item cursor-pointer">
          <span class="page-link">{{ page }}</span>
        </li>
        <li @click="goToPage(currentPage + 1)" :class="{ disabled: currentPage === totalPages, 'cursor-pointer': currentPage !== totalPages  }" class="page-item">
          <span aria-hidden="true" class="page-link cursor-pointer">›</span>
        </li>
      </ul>
    </div>

  <DetailRoom v-if="showDetailRoom" @close-modal="showDetailRoom = false" :apartment="selectedApartment" />
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.min.css';
  import DetailRoom from './DetailRoom.vue';
  import {
    mapGetters
  } from 'vuex';

  import {
    getPosts,
    getFavorites,
    updateFavorites,
    addFavorite,
    removeFavorite
  } from '@/services/api'; // Import hàm gọi API từ api.js

  export default {
    name: 'RoomInline',
    data() {
      return {
        user: {},
        type: '',
        roomType: '',
        currentPage: 1, // Trang hiện tại
        totalPages: 1,
        isFavorite: false,
        favoriteRooms: [],
        favorites: [], // Danh sách yêu thích của người dùng
        searchQuery: '',
        items: [], // Data từ server
        showModal: false, // Khai báo showModal
        showDetailRoom: false,
        selectedApartment: null, // Biến để lưu thông tin căn hộ được chọn
        selectedApartmentId: null,
        apartment: {},
        apartments: [], // Khai báo biến apartments
        loading: false // Khai báo biến loading
      };
    },
    computed: {
      ...mapGetters(['getUserProfile']),
    },
    methods: {
      formatDate(dateString) {
        const date = new Date(dateString);

        // Lấy giờ và phút
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        // Lấy ngày, tháng và năm
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = date.getFullYear();

        // Trả về định dạng mong muốn
        return `${hours}:${minutes} ${day}/${month}/${year}`;
      },

      openDetailRoom(apartment) {
        this.selectedApartment = apartment; // Lưu căn hộ/phòng được chọn
        this.showDetailRoom = true; // Hiển thị modal
      },
      async goToPage(page) {
      if (page < 1 || page > this.totalPages) return; // Kiểm tra nếu trang nằm trong giới hạn
      this.currentPage = page;
      await this.fetchData();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
      async fetchData() {
        this.loading = true;
        if(this.$route.meta.type != this.roomType){
          this.currentPage = 1;
        }
        this.type = this.$route.meta.type;
        if (this.type == 'rooms') {
          this.roomType = 'rooms';
          this.type = 'Cho thuê phòng trọ';
        } else if (this.type == 'apartments') {
          this.roomType = 'apartments';
          this.type = 'Cho thuê căn hộ';
        } else if (this.type == 'houses') {
          this.roomType = 'houses';
          this.type = 'Cho thuê nhà ở';
        } else if (this.type == 'find-roommates') {
          this.roomType = 'findroommates';
          this.type = 'Tìm người ở ghép';
        } else if (this.type == 'favorites') {
          this.roomType = 'favorites';
          this.type = 'Danh sách yêu thích';
        }
        let query = {
          type: this.$route.meta.type || 'default', // Lấy loại phòng từ meta
          page: this.currentPage || 1, // Lấy số trang từ query params (mặc định là 1)
          search: this.searchQuery || '',
        };
        try {
          const user = await this.getUserProfile; // Lấy dữ liệu người dùng từ getter
          if (this.roomType === 'favorites') {
            
            // Kiểm tra nếu `user` tồn tại và có `_id`
            if (user && user._id) {
              // Gán `userId` vào `query` khi người dùng đã đăng nhập
              query.userId = user._id;
              const response = await getFavorites(query); // Gọi API với query
              this.items = response.data.results;
              this.totalPages = response.data.totalPages;
              this.favoriteRooms = response.data.allFavoriteIds;
              // Lấy tất cả các `_id` trong mảng favorites
              const favoriteIds = this.items.map(item => item._id);
              // Gán trực tiếp danh sách `_id` vào `this.favorites`
              this.favorites = favoriteIds;
            } else {
              // Nếu `user` không tồn tại hoặc thiếu `_id`, chuyển hướng người dùng đến trang đăng nhập
              this.$router.push('/login');
            }
          } else {
            const response = await getPosts(query); // Gọi API với query
            this.items = response.data.posts;
            this.totalPages = response.data.totalPages;
            if (user && user._id) {
              query.userId = user._id;
              const response = await getFavorites(query); // Gọi API với query
              this.favoriteRooms = response.data.allFavoriteIds;
            }
          }
        } catch (error) {
          console.error('Lỗi lấy dữ liệu:', error);
        } finally {
          this.loading = false;
        }

      },

      async updateFavorites() {
        const user = this.getUserProfile;

        try {
          if (!user || !user._id) {
            console.error("Người dùng không hợp lệ.");
            return;
          }

          const data = {
            userId: user._id,
            favorites: this.favoriteRooms
          };

          // Gọi API cập nhật danh sách yêu thích
          await updateFavorites(data);
        } catch (error) {
          console.error('Lỗi khi thêm/xóa yêu thích:', error);
        } finally {
          this.fetchData();
        }

      },

      async toggleFavorite(item) {
        let user = this.user;
        try {
          if (!user._id) {
            console.error("Người dùng không hợp lệ.");
            return;
          }

          // Kiểm tra xem phòng có trong danh sách yêu thích hay không
          this.isFavorite = this.favoriteRooms.includes(item._id);
          const data = {
            userId: user._id,
            roomId: item._id
          };
          if (this.isFavorite) {
            if (this.roomType !== 'favorites') {
              const response = await removeFavorite(data); // Gọi API xóa
              if (response.status === 200) { // Kiểm tra nếu API thành công
                this.animateHeart(item, false); // false cho việc xóa
                // Cập nhật danh sách yêu thích trên client
                this.favoriteRooms = this.favoriteRooms.filter(favId => favId !== item._id);
              }
            } else {
              this.animateHeart(item, false); // false cho việc xóa
              this.favoriteRooms = this.favoriteRooms.filter(favId => favId !== item._id);
            }
          } else {
            if (this.roomType !== 'favorites') {
              const response = await addFavorite(data); // Gọi API thêm
              if (response.status === 200) { // Kiểm tra nếu API thành công
                this.animateHeart(item, true); // true cho việc thêm
                // Cập nhật danh sách yêu thích trên client
                this.favoriteRooms.push(item._id);
              }
            } else {
              this.animateHeart(item, true); // true cho việc thêm
              this.favoriteRooms.push(item._id);
            }
          }
        } catch (error) {
          console.error('Lỗi khi thêm/xóa yêu thích:', error);
        }
      },


      animateHeart(item, isAdding) {
        const heartElement = this.$refs[`heart-${item._id}`]; // Giả sử bạn có ref cho mỗi biểu tượng trái tim

        if (heartElement) {
          // Thêm lớp CSS cho hiệu ứng
          heartElement.classList.add('heart-animate');

          // Nếu đang thêm vào yêu thích, có thể thêm hiệu ứng khác
          if (isAdding) {
            heartElement.classList.add('heart-active');
          } else {
            heartElement.classList.remove('heart-active');
          }
          // Sau 0.5 giây, xóa lớp hiệu ứng
          setTimeout(() => {
            heartElement.classList.remove('heart-animate');
          }, 500); // Thời gian tương ứng với hiệu ứng CSS
        }
      },
    },

    components: {
      DetailRoom, // Đăng ký component
    },
    watch: {
      '$route': 'fetchData' // Gọi lại hàm fetchData khi route thay đổi
    },
    created() {
      this.fetchData(); // Gọi hàm fetchData khi component được tạo
    },
    async mounted() {
      this.user = this.getUserProfile;
      if (this.user && this.user._id) {
        let query = {
          type: this.$route.meta.type || 'default', // Lấy loại phòng từ meta
          page: 1, // Lấy số trang từ query params (mặc định là 1)
          search: this.searchQuery || '',
          userId: this.user._id
        };
        const response = await getFavorites(query); // Gọi API với query
        this.favoriteRooms = response.data.allFavoriteIds;
      }
    },
  };
</script>