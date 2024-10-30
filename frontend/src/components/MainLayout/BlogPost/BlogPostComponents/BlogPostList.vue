<template>
  <div class="col-8">
    <div class="apartment__inline__card blog__inline__card" v-for="item in blogPosts" :key="item._id">
      <router-link :to="{ path: '/blog-posts/' + item.blogType + '/' + item.url }" class="row blog-item">
        <div class="col-md-4 col-6 pr-tablet-0">
          <a>
            <img
              :src="item.images[0] || 'https://cdn.dribbble.com/users/263641/screenshots/4517916/404_not_found_3_dribbble.jpg'"
              @error="this.src='https://cdn.dribbble.com/users/263641/screenshots/4517916/404_not_found_3_dribbble.jpg'"
              alt="" class="blog__inline__card__img" />
          </a>
        </div>
        <div class="col-md-8 col-6 pl-0">
          <div class="apartment__inline__card__container blog__inline__card__container">
            <div class="apartment__inline__card__container__header">
              <div class="row">
                <div class="col-11 apartment__inline__card__container__header-street-wrap">
                  <small>{{ item.title }}</small>
                </div>
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
              <span class="text-indent">{{ item.details }}</span>
            </div>
            <div class="apartment__inline__card__container__facilities mt-2">
              <div class="row">
                <div class="col-6 col-mob-dn d-flex align-items-center">
                  <img src="@/assets/images/time-svgrepo-com.svg" alt="" class="icon-time">
                  <span class="time">{{ formatDate(item.createdAt) }}</span> <!-- Sử dụng phương thức formatDate -->
                </div>
                <div class="col-6 d-flex align-items-center">
                  <div class="apartment__list__card__container__facilities__bedroom d-flex align-items-center">
                    <img :src="item.postedBy.avatar || require('@/assets/images/default-user.svg')" @error="onError"
                      alt="" class="icon-user text-black">
                    <span>
                      {{ item.postedBy.fullName }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.min.css';
  import '@/assets/css/blogpost.css';

  import {
    updateFavorites,
    addFavorite,
    removeFavorite
  } from '@/services/api'; // Import hàm gọi API từ api.js

  export default {
    name: 'BlogPostList',
    data() {
      return {
        isFavorite: false,
        favorites: [], // Danh sách yêu thích của người dùng
        searchQuery: '',
        loading: false, // Khai báo biến loading
        blogPosts: [{
            _id: '1',
            blogType: 'kinh-nghiem',
            url: 'chia-se-kinh-doanh-cho-thue-phong-tro-co-phai-dong-thue',
            title: 'Kinh doanh cho thuê phòng trọ có phải đóng thuế gì hay không? phòng trọ có phải đóng thuế gì hay không? phòng trọ có phải đóng thuế gì hay không? phòng trọ có phải đóng thuế gì hay không? ',
            details: 'Kinh doanh nhà trọ là hình thức kinh doanh không còn xa lạ với mọi người, đặc biệt là ở những thành phố lớn như Hà Nội, Hồ Chí Minh, Bình Dương… có nền kinh tế phát triển, nhu cầu nhà ở cho người cư trú làm việc, học tập cao. Vậy ? Nếu có thì phải nộp những loại thuế nào? Đây không phải là vấn đề mới nhưng nhiều chủ trọ còn chưa nắm rõ quy định về việc này. Bài viết hôm nay sẽ giúp bạn tìm hiểu chi tiết nhé.',
            createdAt: '2024-10-29',
            owner: {
              name: "Nguyễn Văn A",
              phone: "0123456789",
              email: "nguyenvana@gmail.com",
              avatar: "https://i.pinimg.com/1200x/07/28/b3/0728b3f6fa0250cf79be40"
            },
            postedBy: {
              username: "user123",
              fullName: "Ngọc Lâm",
              email: "user123@gmail.com",
              avatar: "https://i.pinimg.com/1200x/07/28/b3/0728b3f6fa0250cf79be40a2e"
            },
            images: ['https://img.thuephongtro.com/images/uploads/20200309134037-bskpl.jpg']
          },
          {
            _id: '2',
            url: 'chia-se-kinh-doanh-cho-thue-phong-tro-co-phai-dong-thue',
            blogType: 'kinh-nghiem',
            title: 'Chủ nhà có phải chịu trách nhiệm khi người thuê phòng trọ sử dụng chất ma túy không?',
            details: 'Người thuê phòng trọ sử dụng chất ma túy thì chủ nhà có bị phạm tội chứa chấp hay không?Ma túy là những chất gây nghiện có nguồn gốc tự nhiên hay tổng hợp, khi vào cơ thể (đường hút, uống, ngậm, chích) sẽ gây ức chế hay kích hệ thần kinh trung ương, làm giảm đau, gây ảo giác, sảng khoái, gây cho người nghiện ham muốn không kìm chế được, phải tăng liều để thỏa mãn cơn thèm. Ma túy là tệ nạn của xã hội gây ra những hậu quả khôn lường cho xã hội, sức khỏe của con người và sự phát triển của mỗi quốc gia.',
            createdAt: '2024-10-25',
            owner: {
              name: "Nguyễn Văn A",
              phone: "0123456789",
              email: "nguyenvana@gmail.com",
              avatar: "https://i.pinimg.com/1200x/07/28/b3/0728b3f6fa0250cf79be40a2e2aa3484.jpg"
            },
            postedBy: {
              username: "user123",
              fullName: "Nam Anh",
              email: "user123@gmail.com",
              avatar: "https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/462142832_1580789536126892_8988904784593471280_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=IiulzP4mNgcQ7kNvgEbWBn-&_nc_zt=23&_nc_ht=scontent.fhan14-2.fna&_nc_gid=AbsWm1JFi79NXqsPDwISUSr&oh=00_AYDYsGmsQmd8ID8xGH4Isd9HCJNY8GggOxbiIeJfdsR_oA&oe=6727A85D"
            },
            images: [
              'https://img.thuephongtro.com/Images/Uploads/chu-nha-co-phai-chiu-trach-nhiem-khi-nguoi-thue-phong-tro.gif'
            ]
          },
          {
            _id: '3',
            blogType: 'kinh-nghiem',
            url: 'chia-se-kinh-doanh-cho-thue-phong-tro-co-phai-dong-thue',
            title: 'Mẫu nội quy cho thuê phòng trọ, nhà trọ mới nhất 2020',
            details: 'Nội quy phòng trọ, nhà trọ là những quy định được chủ nhà đặt ra giúp khu trọ an ninh trật tự hơn. Từ đó đảm bảo chất lượng môi trường sống tốt hơn và tài sản mọi người. Dưới đây là mẫu nội quy nhà trọ bạn có thể tham khảo!',
            createdAt: '2024-10-20',
            owner: {
              name: "Nguyễn Văn A",
              phone: "0123456789",
              email: "nguyenvana@gmail.com",
              avatar: "https://i.pinimg.com/1200x/07/28/b3/0728b3f6fa0250cf79be40a2e2aa3484.jpg"
            },
            postedBy: {
              username: "user123",
              fullName: "Phương Ngân",
              email: "user123@gmail.com",
              avatar: "https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-6/458314988_1251128709396925_2677975528133404291_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Z3BzVxBfQIoQ7kNvgGOWD13&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=AolpzjyD-pi1JEZw5AmvUq0&oh=00_AYA7kLzKpYnMLSRTvxFc4j8CZqtPDU4X5T-uyCZADMue0A&oe=6727CD3B"
            },
            images: ['https://img.thuephongtro.com/Images/Uploads/mau-noi-quy-nha-tro-2020.jpg']
          },
          {
            _id: '4',
            blogType: 'kinh-nghiem',
            url: 'chia-se-kinh-doanh-cho-thue-phong-tro-co-phai-dong-thue',
            title: 'Bộ Công thương đề xuất giá điện sinh hoạt 5 bậc',
            details: 'Đưa ra 5 phương án cải tiến cơ cấu biểu giá điện sinh hoạt, Bộ Công thương đề xuất phương án 5 bậc thay vì 6 bậc như hiện hành.Bộ Công thương vừa đưa ra dự tháo lấy ý kiến nhằm hoàn thiện dự thảo quyết định của Thủ tướng Chính phủ quy định cơ cấu biểu giá bán lẻ điện (thay thế quyết định số 28/2014/QĐ-TTg), để trình Thủ tướng xem xét, quyết định.',
            createdAt: '2024-10-18',
            owner: {
              name: "Nguyễn Văn A",
              phone: "0123456789",
              email: "nguyenvana@gmail.com",
              avatar: "https://i.pinimg.com/1200x/07/28/b3/0728b3f6fa0250cf79be40a2e2aa3484.jpg"
            },
            postedBy: {
              username: "user123",
              fullName: "Lê Dung",
              email: "user123@gmail.com",
              avatar: "https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/431902507_7455605027830258_5703730044865332460_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=N2YU0ffmA8oQ7kNvgF32c4Q&_nc_zt=23&_nc_ht=scontent.fhan2-4.fna&_nc_gid=AjCIHIET9Z7ONZjZLxGQyeb&oh=00_AYAnw4aYhjU_KUKRDRRO4JW6LbL0b_Oem3s2V-wYRdifhA&oe=6727CBB8"
            },
            images: ['https://img.thuephongtro.com/Images/Uploads/dien-sinh-hoat-5-bac.jpg']
          },
          {
            _id: '5',
            blogType: 'kinh-nghiem',
            url: 'chia-se-kinh-doanh-cho-thue-phong-tro-co-phai-dong-thue',
            title: 'Lưu ý 3 chiêu trò lừa đảo cho thuê phòng trọ, nhà trọ giá rẻ',
            details: 'Thuê phòng trọ, nhà trọ giá rẻ là mối quan tâm của nhiều sinh viên, người lao động khi sống và học tập tại các thành phố lớn. Lợi dụng nhu cầu đó, nhiều mánh khóe đã được kẻ xấu vẽ ra để lừa lọc người thuê.Chiêu trò lừa đảo cho thuê phòng trọ giá rẻ',
            createdAt: '2024-10-15',
            owner: {
              name: "Nguyễn Văn A",
              phone: "0123456789",
              email: "nguyenvana@gmail.com",
              avatar: "https://i.pinimg.com/1200x/07/28/b3/0728b3f6fa0250cf79be40a2e2aa3484.jpg"
            },
            postedBy: {
              username: "user123",
              fullName: "Thắng Parama",
              email: "user123@gmail.com",
              avatar: "https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/362685124_6300030890093553_1330102407148584754_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=xG-ZWefmSKAQ7kNvgFv67US&_nc_zt=23&_nc_ht=scontent.fhan14-3.fna&_nc_gid=AW8PiZtxhaCCCrCvv6sOEiE&oh=00_AYCHH_atY1g_SD_fAKSG_2E5DftnBCmvPA9XduwtOMQ5Pw&oe=6727CA35"
            },
            images: ['https://img.thuephongtro.com/Images/Uploads/3-chieu-tro-lua-dao-cho-thue-phong-tro.jpg']
          }
        ],
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
    },
  };
</script>