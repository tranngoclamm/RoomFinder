<template>
    <header class="header header__background user-select-none">
        <div class="header__navbar">
          <div class="container-fluid">
            <nav class="navbar navbar-expand-lg navbar-dark">
              <a class="navbar-brand" href="/">
                <img src="@/assets/images/logo_white.svg" alt="RentRoom" ref="logo" />
              </a>
    
              <div class="lang__currency lang_top d-block d-sm-none">
                <div class="dropdown white">
                  <a
                    href="#"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    id="dropdownMenuLang"
                  >
                    <img src="@/assets/images/flags/united-kingdom.svg" /> <span>ENG</span>
                    <i class="fas fa-chevron-up fa-xs"></i>
                  </a>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuLang">
                    <a href="ro.html" class="dropdown-item">
                      <img src="@/assets/images/flags/romania.svg" /> Ro
                    </a>
                    <a href="ru.html" class="dropdown-item">
                      <img src="@/assets/images/flags/russia.svg" /> Rus
                    </a>
                  </div>
                </div>
              </div>
    
              <button
                class="navbar-toggler header__hamburger-wrap"
                type="button"
              >
                <div
                  class="hamburger-icon"
                  @click="hamburgerMenu('logo_white')"
                  :class="{ open: hamburger_menu }"
                >
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </button>
              <transition name="fade">
                <div
                  :class="{'d-block':hamburger_menu}"
                  class="header__navbar-collapse-mobile collapse navbar-collapse"
                  id="navbarText"
                >
                  <div class="header__navbar-collapse-mobile-wrap navbar-collapse">
                    <ul class="navbar-nav mx-auto ps-2">
                      <li class="nav-item">
                        <router-link @click="navigateToPostTitle('postType')" class="nav-link" to="/rent-room">
                          <span>Cho thuê phòng trọ</span>
                        </router-link>
                      </li>
                      <li class="nav-item">
                        <router-link @click="navigateToPostTitle('postType')" class="nav-link" to="/rent-house">
                            <span>Cho thuê nhà ở</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link @click="navigateToPostTitle('postType')" class="nav-link" to="/rent-apartment">
                            <span>Cho thuê căn hộ</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link @click="navigateToPostTitle('postType')" class="nav-link" to="/find-roommate">
                            <span>Tìm người ở ghép</span>
                        </router-link>
                    </li>
                      <li class="nav-item">
                        <div class="calltoaction__text" @mouseover="animation.phone = true" @mouseleave="animation.phone = false">
                          <a href="#" @click="openCall2action">
                            <div v-bind:class="{ 'shake animated slow infinite': animation.phone }" style="display: inline-block;" >
                              <img src="@/assets/images/ic-heart.svg" class="icon ms-2 ic-heart" alt="" />
                            </div>
                          </a>
                        </div>
                      </li>
                    </ul>
    
                    <span class="navbar-text pe-2">
                      <div class="calltoaction ms-1">
                        <div class="login-nav">
                          <div class="position-relative btn-login"  @click="showPostNew = true">
                            <img src="@/assets/images/ic-edit-white.svg" alt="" class="ic-edit-white icon me-2">
                            <a class="ps-4 btn__post-new">Đăng tin</a>
                          </div>
    
                           <div class="avatar ms-2 d-flex align-items-center jutify-content-center">
    
                             <img class="dropdown-toggle hover" role="button" data-bs-toggle="dropdown" aria-expanded="false" src="@/assets/images/default-user.svg" alt="avatar">
    
                             <div class="dropdown ms-2">
                              <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {{ lastName }}
                              </a>
                            
                              <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Thông tin</a></li>
                                <li><a class="dropdown-item" href="#">Quản lý tin</a></li>
                                <li><a class="dropdown-item" href="#">Đổi mật khẩu</a></li>
                                <li><a class="dropdown-item" href="#">Liên hệ</a></li>
                                <li @click="logout()"><a class="dropdown-item" href="#">Đăng xuất</a></li>
                              </ul>
                            </div>
    
                           </div>
                      </div>
                    </div>
                    </span>
    
                    <div class="header__navbar-socials-mobile">
                      <ul class="list-inline hero__footer__social">
                        <li class="list-inline-item">
                          <a
                            href="https://www.facebook.com/rentroom.md/"
                            target="_blank"
                            >facebook</a
                          >
                        </li>
                        <li class="list-inline-item">
                          <a
                            href="https://www.instagram.com/rentroom.md/"
                            target="_blank"
                            >instagram</a
                          >
                        </li>
                        <li class="list-inline-item">
                          <a
                            href="https://m.me/rentroom.md"
                            target="_blank"
                            >messenger</a
                          >
                        </li>
                        <li class="list-inline-item">
                          <a
                            href="viber://chat?number=37378242428"
                            target="_blank"
                            >viber</a
                          >
                        </li>
                        <li class="list-inline-item">
                          <a
                            href="https://wa.me/37378242428"
                            target="_blank"
                            >whatsapp</a
                          >
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </transition>
            </nav>
          </div>
        </div>
    
        <div class="hero">
          <div class="hero__center">
            <div class="container">
              <h1>Phòng cho thuê hàng đầu tại Việt Nam</h1>
              <h2>Tìm kiếm phòng trọ chất lượng tại mọi địa điểm. Đặt phòng ngay!</h2>
              <div class="booking__form">
                <div class="booking__form__block">
                  <form action="#" method="POST">
                    <input type="hidden" name="_token" value="MJs5ZincYZd6Ayt0cq3xfItS3Dm0GSJlfZ3SuRTt" />
                    <input type="hidden" name="type_rent" v-model="config.selected.id" />
                    <input type="hidden" name="date" v-model="booking__data.string" />
                    <input type="hidden" name="people" v-model="peoples" />
                    <div class="row">
                      <div class="col-12 col-lg-3">
                        <div class="booking__form__block__el brd_right user-select-none">
                          <label for="">LOẠI CHO THUÊ</label>
                          <div class="booking__form__block__el__input">
                            <div data-v-7e7894dc="" class="dropdown" style="--options-height: 35px; --options-height-neg: -35px; --option-height: 35px; --main-el-border-radius: 0; --dropdown-width: 180px; --dropdown-background-color: #cde4f5; --dropdown-expanded-color: #fff; --dropdown-border: 1px solid gray; --dropdown-hover-background-color: #0084d4; --dropdown-default-text-color: black;">
                              <div data-v-7e7894dc="" class="dropdown-label-container">
                                <div data-v-7e7894dc="" class="dropdown-label"  ref="dropdownRoom" @click="toggleDropdown('room')">
                                  <span data-v-7e7894dc="" class="text">{{ selectedRoomType }}</span>
                                  <i data-v-7e7894dc="" class="angle-down"></i>
                                </div>
                                <div v-if="isDropdownOpenTypeRoom" class="dropdown-menu pb-0" style="width: 108% !important">
                                  <div class="options expand w-100" >
                                    <div class="option-item" v-for="roomType in roomTypes" :key="roomType">
                                      <div data-v-7e7894dc="" class="dropdown-label" @click="selectRoomType(roomType)">
                                        <span data-v-7e7894dc="" class="text">{{ roomType }}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
    
                        </div>
                      </div>
                      <div class="col-12 col-lg-3">
                        <div class="booking__form__block__el brd_right user-select-none">
                          <label for="">Khu vực</label>
                          <div class="dropdown ms-0 w-100 mt-1">
                            <div class="d-flex align-items-center">
                              <input
                                type="text"
                                spellcheck="false"
                                placeholder="Nhập khu vực"
                                v-model="inputsearchLocation"
                                @input="searchLocation"
                                class="d-flex align-items-center location-input w-100 dpicker__input"
                              />
                              <i class="angle-down ms-4"></i>
                            </div>
                            <div class="dropdown ms-2">
                              <ul class="dropdown-menu location-menu d-block" v-if="isDropdownAreaVisible && inputsearchLocation.length > 1">
                                <template v-if="results.length > 0">
                                  <li v-for="(item, index) in results" :key="index">
                                    <a class="dropdown-item" @click="selectItem(item)">
                                      <span v-if="item.districtName">{{ item.districtName }}, </span>
                                      <span>{{ item.provinceName }}</span>
                                    </a>
                                  </li>
                                </template>
                                <!-- Nếu không có kết quả thì hiển thị thông báo -->
                                <li v-else>
                                  <a class="dropdown-item">Không tìm thấy</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div class="col-12 pe-0 col-lg-2 brd_right">
                        <div class="booking__form__block__el user-select-none" >
                          <label for="">Khoảng giá</label>
                          <div class="dropdown ms-2 w-100">
                            <span @click="toggleDropdown('price')" data-v-78fbf3d8="" class="d-flex  hover align-items-center w-100 dpicker__input">
                              {{ priceDisplay }}
                              <i data-v-78fbf3d8="" class="angle-down ms-4"></i>
                            </span>
                          </div>
                          <div v-if="isDropdownOpenPrice" class="dropdown-menu pb-0" >
                            <div class="options expand w-100">
                              <div class="option-item">
                                <span class="me-4">Từ</span>

                                <i class="fas fa-chevron-left hover" @click="decreasePrice('from')"></i>
                                <b>{{ price.from }}</b>
                                <i class="fas fa-chevron-right hover" @click="increasePrice('from')"></i>
                              </div>
                        
                              <div class="option-item">
                                <span style="margin-right:16px">Đến</span>
                                <i class="fas fa-chevron-left hover" @click="decreasePrice('to')"></i>
                                <b>{{ price.to }}</b>
                                <i class="fas fa-chevron-right hover" @click="increasePrice('to')"></i>
                              </div> 
                            </div>
                          </div>
             
                        </div>
                      </div>
                      <div class="col-12 pe-0 col-lg-2 brd_right user-select-none">
                        <div class="booking__form__block__el">
                          <label for="">Diện tích</label>
                          <div class="dropdown ms-2 w-100">
                            <span @click="toggleDropdown('area')" data-v-78fbf3d8="" class="d-flex  hover align-items-center w-100 dpicker__input">
                              {{areaDisplay}}
                              <i data-v-78fbf3d8="" class="angle-down ms-4"></i>
                            </span>
                          </div>
                          <div v-if="isDropdownOpenArea" class="dropdown-menu ms-3 pb-0" >
                            <div class="options expand w-100">
                              <div class="option-item">
                                <span class="me-4">Từ</span>

                                <i class="fas fa-chevron-left hover" @click="decreaseArea('from')"></i>
                                <b>{{ area.from }}</b>
                                <i class="fas fa-chevron-right hover" @click="increaseArea('from')"></i>
                              </div>
                        
                              <div class="option-item">
                                <span style="margin-right:16px">Đến</span>
                                <i class="fas fa-chevron-left hover" @click="decreaseArea('to')"></i>
                                <b>{{ area.to }}</b>
                                <i class="fas fa-chevron-right hover" @click="increaseArea('to')"></i>
                              </div> 
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="col-12 col-lg-2">
                        <div class="booking__form__block__el">
                          <div class="btn__submit__wrap">
                            <button type="submit" @click.prevent="searchRoom" @click="navigateToPostTitle('latestPost')" class="search_btn">Tìm</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <PostNewModal v-if="showPostNew" @close-modal="showPostNew = false" />
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/css/app.css'; // Nhúng file CSS
import PostNewModal from './PostNewModal.vue';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { searchLocation
 } from '@/services/api'; // Import hàm gọi API từ api.js

export default {
  name: 'HeaderRoom',
  emits: ['openPostModal', 'search', 'scroll-to-title','scroll-to-latestPostTitle','scrollToLatestPostTitle'], // Khai báo sự kiện
  components: {
    PostNewModal,
  },
  data() {
    return {
       lastName: '',
      selectedRoomType: 'NHÀ Ở', // Loại phòng được chọn hiện tại
      roomTypes: ['PHÒNG TRỌ', 'CĂN HỘ', 'TÌM NGƯỜI Ở GHÉP'], // Các tùy chọn còn lại
      inputsearchLocation: '',
      selectedLocation:'',
      isDropdownOpenArea: false,
      isDropdownOpenPrice: false,
      isDropdownOpenTypeRoom: false,
      isDropdownAreaVisible: false,
      searchTimeout: null, // Biến lưu trữ timeout để debounce
      showPostNew: false, // Trạng thái để điều khiển modal
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
      price: {
        from: 0,
        to: 30,
      },
      area: {
        from: 0,
        to: 50,
      },
    };
  },
  computed: {
  priceDisplay() {
    if (this.price.from === 0 && this.price.to === 30) {
      return "Chọn giá";
    } else {
      return `${this.price.from} - ${this.price.to} triệu`;
    }
  },
  areaDisplay() {
    if (this.area.from === 0 && this.area.to === 50) {
      return "Chọn diện tích";
    } else {
      return `${this.area.from} - ${this.area.to} m2`;
    }
  }
},
  methods: {
    logout() {
      // Xóa thông tin người dùng khỏi localStorage và chuyển hướng về trang đăng nhập
      localStorage.removeItem('user');
      this.$router.push('/login');
    },
    navigateToPostTitle(name){
      if (name == 'postType'){
        this.$emit('scroll-to-title'); // Phát sự kiện
      } else if(name == 'latestPost'){
        this.$emit('scroll-to-latestPostTitle'); // Phát sự kiện
      }
    },
    async searchRoom() {
      // Tạo đối tượng formData đúng cách
      let formData = {
        "roomType": this.selectedRoomType,
        "location": this.selectedLocation,
        "price": this.price,
        "area": this.area,
      };
      this.$emit('search', formData); // Emit event với dữ liệu tìm kiếm
    },

    toggleDropdown(type) {
      // Toggle trạng thái mở/đóng của dropdown theo type (ví dụ: room, price, area, address)
      if (type === 'room') {
        this.isDropdownOpenTypeRoom = !this.isDropdownOpenTypeRoom;
      } else if (type === 'price') {
        this.isDropdownOpenPrice = !this.isDropdownOpenPrice;
      } else if (type === 'area') {
        this.isDropdownOpenArea = !this.isDropdownOpenArea;
      } else if (type === 'location') {
        this.isDropdownOpenLocation = !this.isDropdownOpenAddress;
      }
    },

    handleClickOutside(event) {
    // Kiểm tra từng dropdown xem có click ra ngoài không
    const dropdownRoom = this.$refs.dropdownRoom;
    const dropdownPrice = this.$refs.dropdownPrice;
    const dropdownArea = this.$refs.dropdownArea;
    const dropdownAddress = this.$refs.dropdownAddress;
    
    if (dropdownRoom && !dropdownRoom.contains(event.target)) {
      this.isDropdownOpenRoom = false;
      return;
    }
    if (dropdownPrice && !dropdownPrice.contains(event.target)) {
      this.isDropdownOpenPrice = false;
      console.log("false");
      return;
    } else{
      console.log("true");
    }
    if (dropdownArea && !dropdownArea.contains(event.target)) {
      this.isDropdownOpenArea = false;
    }
    if (dropdownAddress && !dropdownAddress.contains(event.target)) {
      this.isDropdownOpenAddress = false;
    }
  },

    selectRoomType(roomType) {
    // Chuyển loại phòng hiện tại vào danh sách
    this.roomTypes.push(this.selectedRoomType);
    
    // Cập nhật loại phòng được chọn
    this.selectedRoomType = roomType;
    
    // Loại bỏ loại phòng vừa được chọn khỏi danh sách
    this.roomTypes = this.roomTypes.filter(type => type !== roomType);
    
    // Đóng dropdown sau khi chọn
    this.isDropdownOpenTypeRoom = false;
  },
    async searchLocation() {
      if (this.inputsearchLocation.length < 2) {
        this.results = []; // Xóa kết quả nếu input ngắn hơn 2 ký tự
        return;
      }

      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }

      this.searchTimeout = setTimeout(async () => {
        try {
          const response = await searchLocation(this.inputsearchLocation);
          if (response && response.data) {
            this.results = response.data;
            this.isDropdownAreaVisible = true;
          } else {
            this.results = []; // Nếu không có kết quả trả về, làm rỗng results
          }
        } catch (error) {
          console.error('Error:', error);
          this.results = []; // Nếu có lỗi, làm rỗng results
        }
      }, 500); // Đặt độ trễ 500ms để chờ người dùng nhập
    },


    selectItem(item) {
      // Lưu giá trị đã chọn vào ô input
      const location = item.districtName ? `${item.districtName}, ${item.provinceName}` : item.provinceName;
      this.inputsearchLocation = location; // Gán giá trị vào input

      this.selectedLocation = {
        provinceId: item.provinceId,
        districtId: item.districtId
      };
      this.isDropdownAreaVisible = false; // Ẩn dropdown sau khi chọn
      console.log(this.selectedRoomType);
      console.log(this.selectedLocation);
      console.log(this.price);
      console.log(this.area);
      
    },

    close() {
        this.$emit('close-modal');
    },

  increasePrice(type) {
    if (type === 'from') {
      // Nếu giá trị đang là "30", không cho phép tăng
      if (this.price.from === "30") {
        return;
      }
      // Nếu giá trị nhỏ hơn 30, cho phép tăng
      this.price.from += 5;  
      // Nếu giá trị vượt 30, đặt thành "30+"
      if (this.price.from >= 25) {
        this.price.from = "30";
      }
    } else {
      // Nếu giá trị đang là "30+", không cho phép tăng
      if (this.price.to === "30+") {
        return;
      }
      // Nếu giá trị nhỏ hơn 30, cho phép tăng
      this.price.to += 5;  
      // Nếu giá trị vượt 30, đặt thành "30+"
      if (this.price.to >= 30) {
        this.price.to = "30+";
      }
    }
  },

  decreasePrice(type) {
    if (type === 'from') {
      // Nếu đang ở mức tối thiểu không thể giảm (0), không giảm
      if (this.price.from === 0) {
        return;
      }
      // Nếu đang ở "30+", giảm xuống 30
      if (this.price.from === "30+") {
        this.price.from = 30;  
        return;
      }
      // Nếu giá trị từ >= 5, giảm 5 đơn vị
      if (this.price.from >= 5) {
        this.price.from -= 5;  
      }
    } else if (type === 'to') {
      // Nếu đang ở "30+", giảm xuống 30
      if (this.price.to === "30+") {
        this.price.to = 30;  
        return;
      }
      // Nếu giá trị lớn hơn giá trị "from", cho phép giảm
      if (this.price.to > this.price.from+5) {
        this.price.to -= 5;  
      }
    }
  },
    increaseArea(type) {
      if (type === 'from') {
      // Nếu giá trị đang là "50", không cho phép tăng
      if (this.area.from === "50") {
        return;
      }
      // Nếu giá trị nhỏ hơn 50, cho phép tăng
      this.area.from += 5;  
      if (this.area.from >= 45) {
        this.area.from = "50";
      }
    } else {
      // Nếu giá trị đang là "50+", không cho phép tăng
      if (this.area.to === "50+") {
        return;
      }
      // Nếu giá trị nhỏ hơn 30, cho phép tăng
      this.area.to += 5;  
      // Nếu giá trị vượt 50, đặt thành "50+"
      if (this.area.to >= 50) {
        this.area.to = "50+";
      }
    }
    },

    decreaseArea(type) {
      if (type === 'from') {
     // Nếu đang ở mức tối thiểu không thể giảm (0), không giảm
      if (this.area.from === 0) {
        return;
      }
    // Nếu đang ở "50+", giảm xuống 50
      if (this.area.from === "50+") {
        this.area.from = 30;  
        return;
    }
        // Nếu giá trị từ >= 5, giảm 5 đơn vị
        if (this.area.from >= 5) {
          this.area.from -= 5;  
        }
      } else if (type === 'to') {
        // Nếu đang ở "50+", giảm xuống 50
        if (this.area.to === "50+") {
          this.area.to = 50;  
          return;
        }
        // Nếu giá trị lớn hơn giá trị "from", cho phép giảm
        if (this.area.to > this.area.from+5) {
          this.area.to -= 5;  
        }
  }

    },
  },

  mounted() {
  document.addEventListener('click', this.handleClickOutside);
   // Lấy thông tin user từ localStorage
   const user = JSON.parse(localStorage.getItem('user'));
    // Tách chuỗi fullName và lấy từ cuối cùng
    if (user && user.fullName) {
      const nameParts = user.fullName.trim().split(' ');
      this.lastName = nameParts[nameParts.length - 1];
    }
    },
    beforeUnmount() {
      document.removeEventListener('click', this.handleClickOutside);
    }
};
</script>