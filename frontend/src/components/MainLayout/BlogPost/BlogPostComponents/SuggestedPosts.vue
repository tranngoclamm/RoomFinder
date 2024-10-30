<template>
  <div class="aside-box mt-2">
    <div class="aside-box-title">
      Có thể bạn quan tâm
    </div>
    <div class="aside-box-content">
      <div class="news-listing">
        <div v-for="(post, index) in SuggestedPosts" :key="index">
          <router-link :to="`/blog-posts/${post.blogType}/${post.url}`" class="news-item">
            <figure class="news-thumb">
              <img :src="post.image" alt="Blog thumbnail">
            </figure>
            <aside class="news-aside ms-3">
              <div class="d-flex">
                <img src="@/assets/images/time-svgrepo-com.svg" alt="" class="icon-time">
                <span class="news-publish">{{ post.date }}</span>
              </div>
              <h3 class="news-title">{{ post.title }}</h3>
            </aside>
          </router-link>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.min.css';
  import '@/assets/css/blogpost.css';

  export default {
    name: 'SuggestedPosts',
    data() {
      return {
        SuggestedPosts: [{
            blogType: 'kinh-nghiem',
            url: 'chia-se-kinh-doanh-cho-thue-phong-tro-co-phai-dong-thue',
            image: 'https://img.thuephongtro.com/images/uploads/20200309134037-bskpl.jpg',
            date: '12:24 09/03/2020',
            title: 'Kinh doanh cho thuê phòng trọ có phải đóng thuế gì hay không?',
          },
          {
            blogType: 'kinh-nghiem',
            url: 'nhung-dieu-can-luu-y-trong-viec-quan-ly-nha-tro',
            image: 'https://img.thuephongtro.com/images/uploads/20200309133059-1nvvd.jpg',
            date: '08:35 09/03/2020',
            title: 'Những điều cần lưu ý trong việc quản lý nhà trọ',
          },
          {
            blogType: 'kinh-nghiem',
            url: 'can-than-khi-di-tim-thue-phong-tro',
            image: 'https://img.thuephongtro.com/images/uploads/20200309120917-p4ard.jpg',
            date: '11:44 09/03/2020',
            title: 'Cẩn thận khi đi tìm thuê phòng trọ, nhà trọ với sinh viên mới',
          },
          {
            blogType: 'kinh-nghiem',
            url: 'nhung-dieu-ban-nen-biet-de-bao-dam-quyen-loi',
            image: 'https://img.thuephongtro.com/images/uploads/20200309120431-utm0e.jpg',
            date: '14:40 09/03/2020',
            title: 'Những điều bạn nên biết để bảo đảm quyền lợi khi đi thuê phòng trọ',
          },
          {
            blogType: 'kinh-nghiem',
            url: 'luu-y-3-chieu-tro-lua-dao-cho-thue-phong-tro',
            image: 'https://img.thuephongtro.com/images/uploads/20200309120007-nfyk0.jpg',
            date: '03: 44 09/03/2020',
            title: 'Lưu ý 3 chiêu trò lừa đảo cho thuê phòng trọ, nhà trọ giá rẻ',
          },
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
    },
  };
</script>