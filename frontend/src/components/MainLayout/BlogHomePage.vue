<template>
    <div class="blogpost-wrapper w-100 d-flex flex-column align-items-center">
      <!-- Title -->
      <div class="view-switcher room-list d-flex align-items-center justify-content-between">
        <div class="title">
          <h2 ref="latestPostTitle">Tin tức</h2>
        </div>
        <router-link to="/blog-posts" class="more">Xem thêm</router-link>
      </div>
  
      <div class="blogpost-content d-flex flex-column justify-content-center align-items-center">
        <!-- trend-room -->
        <div class="homepage-news">
            <div class="sub_small-form d-flex justify-content-between gap-4 m-0 mt-3 w-100">
            <!-- Hai tin đầu -->
            <router-link :to="{ path: '/blog-posts/' + post.slug }" v-for="(post, index) in news.slice(0, 2)" :key="index" class="img_caption p-0">
              <img :src="post.image" alt="" class="resize-form" />
              <aside class="news-aside">
                <span class="news-publish">
                  <img src="/img/time-svgrepo-com.4b9896ae.svg" alt="" class="icon-time" />
                  {{ post.createdAt }}
                </span>
                <h3 class="news-title">{{ post.title }}</h3>
              </aside>
            </router-link>
            <!-- Ba tin cuối -->
            <div class="img_caption no-filter p-0">
              <router-link :to="{ path: '/blog-posts/' + post.slug }" v-for="(post, index) in news.slice(2, 5)" :key="index">
                <a class="news-item filter-bright d-flex w-100">
                  <aside class="news-aside margin-right-10">
                    <span class="news-publish">
                      <img src="/img/time-svgrepo-com.4b9896ae.svg" alt="" class="icon-time" />
                      {{ post.createdAt }}
                    </span>
                    <h3 class="news-title">{{ post.title }}</h3>
                  </aside>
                  <figure class="news-thumb">
                    <img class="small-img" :src="post.image" alt="news" loading="lazy" />
                  </figure>
                </a>
                <div v-if="index < 2" class="pl-2"><hr></div>
              </router-link>
            </div>
          </div>
  
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import 'bootstrap/dist/css/bootstrap.min.css';
  import '@/assets/css/app.css';
  import '@/assets/css/room-category.css';
  import '@/assets/css/blogpost.css';
  import {getLatestArticles } from '@/services/api'; // Import hàm gọi API từ api.js
  import { formatDate } from '@/utils/dateUtils'; 

  export default {
    name: 'BlogHomePage',
    data() {
      return {
        news: []
      };
    },
    methods: {
      async fetchLatestArticles() {
      try {
        const response = await getLatestArticles("", 1, 5, "");  // Gọi API lấy tin mới nhất
        if (response && response.data) {
          let data = Object.values(response.data)[0]; // Chuyển object sang mảng
          data.forEach(newsItem => {
          newsItem.createdAt = formatDate(newsItem.createdAt); // chuyển định dạng ngày
          // Sử dụng biểu thức chính quy để tìm URL hình ảnh trong content
          const imageUrlMatch = newsItem.content.match(/<img[^>]+src="([^">]+)"/);
      
          // Nếu tìm thấy URL, thêm trường image vào đối tượng
          if (imageUrlMatch && imageUrlMatch[1]) {
              newsItem.image = imageUrlMatch[1]; // thêm trường image
          } else {
              newsItem.image = 'https://cdn.dribbble.com/users/263641/screenshots/4517916/404_not_found_3_dribbble.jpg'; 
          }
          });
          this.news=data;
        }
      } catch (error) {
        console.error("Lỗi lấy tin mới nhất:", error);
      }
     },
    },
    mounted(){
      this.fetchLatestArticles();
    }
  };
  </script>
  