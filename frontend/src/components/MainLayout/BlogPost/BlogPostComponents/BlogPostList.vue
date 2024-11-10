<template>
  <div class="col-8">
    <div class="apartment__inline__card blog__inline__card" v-for="item in blogPosts" :key="item._id">
      <div class="row blog-item">
        <div class="col-md-4 col-6 pr-tablet-0" >
          <router-link :to="`/blog-posts/${item.slug}`" @click="openDetailPost(item.slug)">
            <img
              :src="item.image || 'https://cdn.dribbble.com/users/263641/screenshots/4517916/404_not_found_3_dribbble.jpg'"
              @error="this.src='https://cdn.dribbble.com/users/263641/screenshots/4517916/404_not_found_3_dribbble.jpg'"
              alt="" class="blog__inline__card__img" />
          </router-link>
        </div>
        <div class="col-md-8 col-6 pl-0">
          <div class="apartment__inline__card__container blog__inline__card__container">
            <div class="apartment__inline__card__container__header">
              <div class="row">
                <router-link :to="`/blog-posts/${item.slug}`" class="col-11 apartment__inline__card__container__header-street-wrap" @click="openDetailPost(item.slug)" >
                  <small>{{ item.title }}</small>
                </router-link>
                <div class="col-1 apartment__inline__card__container__header-price-wrap">
                  <div @click.prevent="toggleFavorite(item)"
                    class="apartment__list__card__container__facilities__balcony d-flex align-items-center">
                    <img
                      :src="favorites.includes(item._id) ? require('@/assets/images/ic-heart-active.svg') : require('@/assets/images/ic-heart.svg')"
                      alt="" class="inline-heart">
                  </div>
                </div>
              </div>
            </div>
            <div class="my-1 description">
              <span class="text-indent">{{ item.description }}</span>
            </div>
            <div class="apartment__inline__card__container__facilities mt-2">
              <div class="row">
                <div class="col-6 col-mob-dn d-flex align-items-center">
                  <img src="@/assets/images/time-svgrepo-com.svg" alt="" class="icon-time">
                  <span class="time">{{ item.createdAt }}</span> <!-- Sử dụng phương thức formatDate -->
                </div>
                <div class="col-6 d-flex align-items-center">
                  <div class="apartment__list__card__container__facilities__bedroom d-flex align-items-center" @click.stop="openProfileModal(item.author)">
                    <img :src="item.author ? item.author.profilePicture : require('@/assets/images/default-user.svg')" @error="onError"
                      alt="" class="icon-user text-black">
                    <span>
                      {{ item.author ? item.author.fullName : 'Chưa có tác giả' }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ProfileModal v-if="isProfileModal" @closeModal="isProfileModal=false" :author="this.selectedUser"/>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.min.css';
  import '@/assets/css/blogpost.css';
  import '@/assets/css/history.css';
  import { formatDate } from '@/utils/dateUtils'; 
  import {updateFavorites, addFavorite, removeFavorite, getLatestArticles} from '@/services/api'; // Import hàm gọi API từ api.js
  import ProfileModal from '../../ProfileModal.vue';

  export default {
    name: 'BlogPostList',
    emits: ['openDetailPost'],
    components: {
      ProfileModal,
    },
    data() {
      return {
        isProfileModal: false,
        isFavorite: false,
        favorites: [], // Danh sách yêu thích của người dùng
        searchQuery: '',
        selectedUser:{},
        loading: false, // Khai báo biến loading
        blogPosts: [],
        category: '',
      };
    },
    methods: {
      async fetchLatestArticles() {
      try {
        const response = await getLatestArticles("", 1, 7, this.category);  // Gọi API lấy tin mới nhất
        if (response && response.data) {
          let postData = response.data
          postData.data.forEach(newsItem => {
          newsItem.createdAt = formatDate(newsItem.createdAt); // chuyển định dạng ngày
          // Sử dụng biểu thức chính quy để tìm URL hình ảnh trong content
          const imageUrlMatch = newsItem.content.match(/<img[^>]+src="([^">]+)"/);
      
          // Nếu tìm thấy URL, thêm trường image vào đối tượng
          if (imageUrlMatch && imageUrlMatch[1]) {
              newsItem.image = imageUrlMatch[1]; // thêm trường image
          } else {
              newsItem.image = 'https://cdn.dribbble.com/users/263641/screenshots/4517916/404_not_found_3_dribbble.jpg'; 
          }
          // Tạo phần tử HTML ảo
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = newsItem.content; // Gán nội dung HTML vào phần tử ảo

          // Lấy nội dung đã giải mã từ phần tử HTML ảo
          const decodedContent = tempDiv.textContent || tempDiv.innerText || '';

          // Tìm vị trí bắt đầu và kết thúc của createdAt trong decodedContent
          const createdAtString = newsItem.createdAt; // Giá trị của createdAt
          const createdAtIndex = decodedContent.indexOf(createdAtString); // Tìm vị trí bắt đầu

          // Tính vị trí kết thúc của createdAt
          const endOfCreatedAtIndex = createdAtIndex + createdAtString.length; // Vị trí kết thúc

          // Nếu tìm thấy createdAt, cắt chuỗi từ vị trí kết thúc đó
          const mainContent = createdAtIndex !== -1 ? decodedContent.slice(endOfCreatedAtIndex).trim() : decodedContent;

          // Lấy 100 từ đầu tiên từ mainContent và thêm vào trường description
          const words = mainContent.split(/\s+/); // Chia nhỏ chuỗi thành các từ
          const description = words.slice(0, 100).join(' '); // Lấy 100 từ đầu tiên
          newsItem.description = description; // Thêm trường description đã lấy được nội dung
          this.blogPosts= postData.data
          });
        }
      } catch (error) {
        console.error("Lỗi lấy tin mới nhất:", error);
      }
     },
     openDetailPost(slug){
      this.$emit('openDetailPost', slug);
     },
     openProfileModal(user){
      this.selectedUser=user;
      this.isProfileModal = true;
     },
      onError(event) {
        event.target.src = require('@/assets/images/avatar-mac-dinh-1.jpg');
      },

      async updateFavorites() {
        const user = JSON.parse(localStorage.getItem('user'));

        try {
          if (!user || !user._id) {
            console.error("Người dùng không hợp lệ.");
            return;
          }

          const data = {
            userId: user._id,
            favorites: this.favorites
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
        const user = JSON.parse(localStorage.getItem('user'));
        try {
          if (!user._id) {
            console.error("Người dùng không hợp lệ.");
            return;
          }

          // Kiểm tra xem phòng có trong danh sách yêu thích hay không
          this.isFavorite = this.favorites.includes(item._id);
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
                this.favorites = this.favorites.filter(favId => favId !== item._id);
              }
            } else {
              this.animateHeart(item, false); // false cho việc xóa
              this.favorites = this.favorites.filter(favId => favId !== item._id);
            }
          } else {
            if (this.roomType !== 'favorites') {
              const response = await addFavorite(data); // Gọi API thêm
              if (response.status === 200) { // Kiểm tra nếu API thành công
                this.animateHeart(item, true); // true cho việc thêm
                // Cập nhật danh sách yêu thích trên client
                this.favorites.push(item._id);
              }
            } else {
              this.animateHeart(item, true); // true cho việc thêm
              this.favorites.push(item._id);
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
    mounted() {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user._id) {
        this.favoriteRooms = ['exampleRoomId1', 'exampleRoomId2']; // Placeholder cho danh sách yêu thích
      }
      this.category=this.$route.params.category
      this.fetchLatestArticles(); // Truyền category vào hàm
    },
    watch: {
    '$route.params.category': function(newCategory) {
      this.category = newCategory; // Cập nhật category
      this.fetchLatestArticles(); // Gọi lại hàm khi category thay đổi
      },
    },
  
  };
</script>