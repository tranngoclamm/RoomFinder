<!-- RoomCategory.vue -->
<template>
    <div class="room-category d-flex flex-column justify-content-center align-items-center">
        
        <!-- trend-room -->
        <div class="trend_location">
            <h2>Khu vực đang thịnh hành</h2>
            <p>Các lựa chọn phổ biến nhất cho khách từ Việt Nam</p>
            <div class="sub_small-form d-flex justify-content-between gap-4 m-0 mt-3 w-100">
                <div class="img_caption p-0">
                    <a href=""><img src="@/assets/images/nha-tro-gac-lung-1-1.jpg" alt="" class="resize-form"></a>
                    <div class="styled_text flex-container">
                        <a href="">Hà Nội</a> 
                        <a href=""><img src="@/assets/images/VN-Vietnam-Flag.svg" alt="" class="resize-form"></a>
                    </div>
                </div>
                <div class="img_caption p-0">
                    <a href=""><img src="@/assets/images/nha-tro-gac-lung-3.jpg" alt="" class="resize-form"></a>
                    <div class="styled_text flex-container">
                        <a href="">Hồ Chí Minh </a> 
                        <a href=""><img src="@/assets/images/VN-Vietnam-Flag.svg" alt="" class="resize-form"></a>
                    </div>
                </div>
                <div class="img_caption p-0">
                    <a href=""><img src="@/assets/images/thiet-ke-phong-tro-dep-63.jpg" alt="" class="resize-form"></a>
                    <div class="styled_text flex-container">
                        <a href="">Đà Lạt</a> 
                        <a href=""><img src="@/assets/images/VN-Vietnam-Flag.svg" alt="" class="resize-form"></a>
                    </div>
                </div>
            </div>
            
        </div>

        <!-- Title -->
        <div class="view-switcher room-list d-flex align-items-center justify-content-between">
            <div class="title">
                <h2 ref="latestPostTitle">Mới nhất</h2>
            </div>
            <div class="view-switcher__element"><input type="hidden" value="en">
                <input v-model="searchQuery" type="text" placeholder="Nhập nội dung tìm kiếm" class="form-control"> 
                <a href="#" @click.prevent="search"><i class="fas fa-search"></i></a>
                <a href="#" style="display: none;"></a> 
                <a class="active">
                    <i class="fas fa-th-large"></i>
                </a> 
                <a>
                    <i class="fas fa-list-ul"></i>
                </a>
            </div>
        </div>
        
        <!-- list-room-col-3 -->
        <div class="apartment__list room-list">
            <div class="row" >
               <div v-for="result in results" :key="result._id" class="room-item col-12 col-md-5 col-lg-4">
                  <div class="apartment__list__card ">
                     <a @click.prevent="openDetailRoom(result)" >
                     <img :src="result.images && result.images.length > 0 ? result.images[0] : 'https://cdn.dribbble.com/users/263641/screenshots/4517916/404_not_found_3_dribbble.jpg'" alt="" class="apartment__list__card__img">
                     </a> 
                     <div class="apartment__list__card__container">
                        <div class="apartment__list__card__container__header">
                           <div class="row">
                              <div @click.prevent="openDetailRoom(result)"  class="col-sm-8 col-8 apartment__list__card__container__header-col"><span class="apartment__list__card__container__header__street">                      
                                {{ result.title }} </span></div>
                              <div class="col-sm-4 col-4 apartment__list__card__container__header-col d-flex  align-items-center justify-content-center">
                                <img class="icon text-black" src="@/assets/images/measure-area-svgrepo-com.svg" alt="">
                                <span class="apartment__list__card__container__header__price">
                                    {{ result.area }}m²
                                </span>
                              </div>
                           </div>
                        </div>
                        <div class="apartment__list__card__container__facilities">
                           <div class="row">
                              <div class="col-8 d-flex align-items-center">
                                 <div class="apartment__list__card__container__facilities__bedroom d-flex align-items-center ">
                                    <img src="@/assets/images/location-87.svg" alt="" class="icon text-black">
                                    <span>
                                      {{ result.district && result.district.name ? result.district.name + ',' : '' }}
                                      {{ result.province && result.province.name ? result.province.name : '' }}
                                    </span>                                 
                                  </div>
                              </div>
                              <div class="col-4 p-0">
                                 <div class="apartment__list__card__container__facilities__balcony  d-flex align-items-center ">
                                    <img src="@/assets/images/money-35.svg" alt="" class="icon text-black">
                                    <span>{{ result.price }}tr /tháng</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         
         <DetailRoom v-show="showDetailRoom" @close-modal="showDetailRoom = false" :apartment="apartment" />

        <!-- navigation -->
        <ul role="navigation" class="pagination mb-3">
            <li @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" aria-disabled="true" aria-label="« Previous" class="page-item disabled"><span aria-hidden="true" class="page-link">‹</span></li> 
            <li aria-current="page" class="page-item active"><span class="page-link">1</span></li>
            <li class="page-item"><a href="http://rentroom.md/en/list?page=2" class="page-link">2</a></li>
                        <!-- Nút cho từng trang -->
            <li v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="{ active: currentPage === page }">
                <span class="page-link">{{ page }}</span>
            </li>
            <li @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages" class="page-item"><a href="http://rentroom.md/en/list?page=2" rel="next" aria-label="Next »" class="page-link">›</a></li>
        </ul>
        
         <!-- travel -->
        <div class="looking_for-travel">
            <div class="yellow-circle"></div>
            <div class="blue-circle">
              <div class="sub-form">
                <div class="d-flex">

                    <a href="#" class="styled_text me-1">Cho thuê</a>
                    <div class="wordList">
                      <ul id="wordList">
                        <li v-for="(word, index) in words" :key="index" :class="{ active: index === currentIndex }">
                          <a href="#" class="styled_text">{{ word }}</a>
                        </li>
                      </ul>
                    </div>
                </div>
                <a href="#" class="styled_text">cùng RoomFinder</a><br>
                <button>Bắt đầu ngay để nhận ưu đãi</button>
              </div>
            </div>
            <img src="@/assets/images/bh_aw_cpg_main_image.b4347622.png" alt="">
          </div>



    </div>
  </template>
  
  <script>
  import 'bootstrap/dist/css/bootstrap.min.css';
  import '@/assets/css/app.css'; 
  import '@/assets/css/room-category.css'; 
  import DetailRoom from './DetailRoom.vue';

  export default {
    name: 'RoomCategory',
    props: {
      results: {
        type: Array,
        default: () => [],
      },
    },
    data() {
    return {
      searchQuery: '',
      currentPage: 1,      // Trang hiện tại
      totalPages: 0,       // 
      words: ['phòng trọ', 'nhà ở', 'căn hộ'],
      currentIndex: 0,
      showDetailRoom: false,
      selectedApartmentId: null,
      apartment: {}
    };
    
  },
  mounted() {
    this.startWordRotation();
  },
  methods: {
    startWordRotation() {
      setInterval(this.showNextWord, 2000);
    },
    showNextWord() {
      this.currentIndex = (this.currentIndex + 1) % this.words.length;
    },
    openDetailRoom(apartment) {
      // Lưu căn hộ đã chọn và hiển thị chi tiết
      this.apartment = apartment;
      this.showDetailRoom = true;
    },

    async goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        await this.searchRoom(page);  // Gửi request để lấy dữ liệu của trang mới
      }
    },
    search() {
      console.log(this.searchQuery);
      this.$emit('search', this.searchQuery);
    },
    scrollToLatestPostTitle() {
          const titleElement = this.$refs.latestPostTitle; // Giả sử bạn đã thêm ref vào h2
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
  };
  </script>
  
  
