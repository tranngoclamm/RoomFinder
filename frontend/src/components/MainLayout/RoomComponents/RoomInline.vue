<template>

    <!-- Khung search -->
    <div class="view-switcher room-list d-flex align-items-center justify-content-between">
          <div class="breadcrumb-list">
              <a href="/">RoomFinder</a>
              <span> > </span>
              <a ref="postTitle" href="">{{type}}</a>
          </div>
          <div class="view-switcher__element"><input type="hidden" value="en">
              <input v-model="searchQuery" type="text" placeholder="Nhập nội dung tìm kiếm" class="form-control"> 
              <a href="#" @click.prevent="fetchData"><i class="fas fa-search"></i></a>
              <a href="#" style="display: none;"></a> 
              <a class="active">
                  <i class="fas fa-th-large"></i>
              </a> 
              <a>
                  <i class="fas fa-list-ul"></i>
              </a>
          </div>
    </div>

    <!-- Danh sách phòng -->
    <div class="apartment__inline">
        <div class="row">
            <div class="col-12">
                <div class="apartment__inline__card"  v-for="item in items" :key="item.id">
                  <div class="row">
                    <div class="col-md-4 col-6 pr-tablet-0" @click.prevent="openDetailRoom(item)">
                        <a>
                        <img :src="item.images[0] || 'https://cdn.dribbble.com/users/263641/screenshots/4517916/404_not_found_3_dribbble.jpg'" alt="" class="apartment__inline__card__img">
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
                              <div  @click.prevent="toggleFavorite(item)" class="apartment__list__card__container__facilities__balcony d-flex align-items-center">
                                <img :src="isFavorite(item) ? require('@/assets/images/ic-heart-active.svg') : require('@/assets/images/ic-heart.svg')" alt="" class="inline-heart">
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
                            <div class="col col-3 apartment__list__card__container__header-col d-flex align-items-center justify-content-center">
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
                <div v-if="loading">Loading...</div> <!-- Optional loading indicator -->
            </div>
        </div>
    </div>

    <!-- navigation -->
    <ul role="navigation" class="pagination mb-3"><li aria-disabled="true" aria-label="« Previous" class="page-item disabled"><span aria-hidden="true" class="page-link">‹</span></li> <li aria-current="page" class="page-item active"><span class="page-link">1</span></li> <li class="page-item"><a href="http://rentroom.md/en/list?page=2" class="page-link">2</a></li> <li class="page-item"><a href="http://rentroom.md/en/list?page=3" class="page-link">3</a></li> <li class="page-item"><a href="http://rentroom.md/en/list?page=4" class="page-link">4</a></li> <li class="page-item"><a href="http://rentroom.md/en/list?page=2" rel="next" aria-label="Next »" class="page-link">›</a></li></ul>
        
    <!-- modal-detail -->
            
    <DetailRoom v-if="showDetailRoom" @close-modal="showDetailRoom = false" :apartment="selectedApartment" />
  </template>
  
  <script>
    import 'bootstrap/dist/css/bootstrap.min.css';
    import DetailRoom from './DetailRoom.vue';
    import { getPosts, deleteFavorite, addFavorite } from '@/services/api'; // Import hàm gọi API từ api.js

    export default {
    name: 'RoomInline',
    data() {
        return {
            type:'',
            roomType: '',
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

        async fetchData() {
              this.loading = true;
              this.type = this.$route.meta.type;
              if(this.type == 'rooms'){
                this.roomType = 'rooms';
                this.type = 'Cho thuê phòng trọ';
              } else if(this.type == 'apartments'){
                this.roomType = 'apartments';
                this.type = 'Cho thuê căn hộ';
              } else if(this.type == 'houses'){
                this.roomType = 'houses';
                this.type = 'Cho thuê nhà ở';
              } else if(this.type == 'find-roommates'){
                  this.roomType = 'findroommates';
                  this.type = 'Tìm người ở ghép';
              }
              const query = {
                type: this.$route.meta.type || 'default', // Lấy loại phòng từ meta
                page: this.$route.query.page || 1, // Lấy số trang từ query params (mặc định là 1)
                search: this.searchQuery || '',
              };
              try {
                const response = await getPosts(query); // Gọi API với query
                this.items = response.data.posts; // Giả sử kết quả trả về có trường 'posts'
              } catch (error) {
                console.error('Lỗi lấy dữ liệu:', error);
              } finally {
                this.loading = false;
              }
        },

        async toggleFavorite(item) {
          const user = JSON.parse(localStorage.getItem('user'));
          console.log(user);
          try {
            if (!user._id) {
              console.error("Người dùng không hợp lệ.");
              return;
            }

              // Kiểm tra xem phòng có trong danh sách yêu thích hay không
              const isFavorite = this.favorites.includes(item._id);

              const data = {
                userId: user._id,
                roomId: 'af'
                };
              if (isFavorite) {
                this.animateHeart(item, false); // false cho việc xóa

                // Nếu có, gọi API để xóa phòng khỏi danh sách yêu thích
                await deleteFavorite(data);
                console.log('Xóa khỏi danh sách yêu thích thành công!');
                
                // Cập nhật danh sách yêu thích trên client
                this.favorites = this.favorites.filter(favId => favId !== item._id);

              } else {
                this.animateHeart(item, true); // true cho việc thêm

                // Nếu chưa có, gọi API để thêm phòng vào danh sách yêu thích
                await addFavorite(data);
                console.log('Thêm vào danh sách yêu thích thành công!');
                
                // Cập nhật danh sách yêu thích trên client
                this.favorites.push(item._id);
              }
          } catch (error) {
            console.error('Lỗi khi thêm/xóa yêu thích:', error);
          }
        },
        isFavorite(itemId) {
          return this.favorites.includes(itemId); // Kiểm tra xem phòng có trong danh sách yêu thích không
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
        
        scrollToTitle() {
          const titleElement = this.$refs.postTitle; // Giả sử bạn đã thêm ref vào h2
          const offset = 32; // Kích thước offset bạn muốn

          const elementPosition = titleElement.getBoundingClientRect().top + window.scrollY; // Tính vị trí của tiêu đề
          const offsetPosition = elementPosition - offset; // Tính vị trí cuộn với offset

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth", // Thêm hiệu ứng cuộn mượt
          });
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
    mounted() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user._id) {
      this.favoriteRooms = ['exampleRoomId1', 'exampleRoomId2']; // Placeholder cho danh sách yêu thích
    }
    },
  };
  </script>
  
  
  