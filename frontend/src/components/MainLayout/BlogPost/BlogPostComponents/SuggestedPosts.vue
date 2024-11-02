<template>
  <div class="aside-box mt-2">
    <div class="aside-box-title">
      Có thể bạn quan tâm
    </div>
    <div class="aside-box-content">
      <div class="news-listing">
        <div v-for="(post, index) in SuggestedPosts" :key="index">
          <div class="news-item">
            <router-link :to="`/blog-posts/${post.slug}`" @click="openDetailPost(post.slug)">
              <figure class="news-thumb" @click="openDetailPost(post.slug)">
                <img :src="post.image" alt="Blog thumbnail">
              </figure>
            </router-link>
            <aside class="news-aside ms-3">
              <div class="d-flex">
                <img src="@/assets/images/time-svgrepo-com.svg" alt="" class="icon-time">
                <span class="news-publish">{{ post.createdAt }}</span>
              </div>
              <router-link :to="`/blog-posts/${post.slug}`" @click="openDetailPost(post.slug)">
                <h3 @click="openDetailPost(post.slug)" class="news-title">{{ post.title }}</h3>
              </router-link>
            </aside>
          </div>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.min.css';
  import '@/assets/css/blogpost.css';
  import { formatDate } from '@/utils/dateUtils'; 
  import { getLatestArticles} from '@/services/api'; // Import hàm gọi API từ api.js

  export default {
    name: 'SuggestedPosts',
    emits: ['openDetailPost'],
    data() {
      return {
        SuggestedPosts: [],
      };
    },
    methods: {
      async fetchLatestArticles() {
        try {
          const response = await getLatestArticles("", 1, 5, "");  // Gọi API lấy tin mới nhất
          if (response && response.data) {
            let postData = response.data

            // let data = Object.values(response.data)[0]; // Chuyển object sang mảng
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
            this.SuggestedPosts= postData.data
            });
          }
        } catch (error) {
          console.error("Lỗi lấy tin mới nhất:", error);
        }
      },
      openDetailPost(slug){
        this.$emit('openDetailPost', slug);
     },
    },
    mounted() {
      this.fetchLatestArticles();
    },
  };
</script>