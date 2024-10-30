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
            <router-link :to="{ path: '/blog-posts/' + post.blogType + '/' + post.url }" v-for="(post, index) in news.slice(0, 2)" :key="index" class="img_caption p-0">
              <img :src="post.image" alt="" class="resize-form" />
              <aside class="news-aside">
                <span class="news-publish">
                  <img src="/img/time-svgrepo-com.4b9896ae.svg" alt="" class="icon-time" />
                  {{ post.publishTime }}
                </span>
                <h3 class="news-title">{{ post.title }}</h3>
              </aside>
            </router-link>
            <!-- Ba tin cuối -->
            <div class="img_caption no-filter p-0">
              <router-link :to="{ path: '/blog-posts/' + post.blogType + '/' + post.url }" v-for="(post, index) in news.slice(2, 5)" :key="index">
                <a class="news-item filter-bright d-flex w-100">
                  <aside class="news-aside margin-right-10">
                    <span class="news-publish">
                      <img src="/img/time-svgrepo-com.4b9896ae.svg" alt="" class="icon-time" />
                      {{ post.publishTime }}
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
  
  export default {
    name: 'BlogHomePage',
    data() {
      return {
        news: [
          {
            blogType:'kinh-nghiem',
            title: 'Nhà thuê TP.HCM giảm giá 2-3 triệu đồng/tháng',
            image: 'https://img.thuephongtro.com/images/uploads/20200531080439-2fupv.jpg',
            publishTime: '5:24 09/03/2020',
            url: 'nha-thue-tphcm-giam-gia.html'
          },
          {
            blogType:'kinh-nghiem',
            title: 'Top 10 website đăng tin cho thuê phòng trọ, nhà trọ hiệu quả nhất 2020',
            image: 'https://img.thuephongtro.com/images/uploads/20200309135926-xinj2.jpg',
            publishTime: '5:24 09/03/2020',
            url: 'top-10-website-cho-thue-phong.html'
          },
          {
            blogType:'kinh-nghiem',
            title: 'Chủ nhà có phải chịu trách nhiệm khi người thuê phòng trọ sử dụng chất ma túy không?',
            image: 'https://img.thuephongtro.com/images/uploads/20200309131415-dvtub.jpg',
            publishTime: '5:24 09/03/2020',
            url: 'chu-nha-trach-nhiem-ma-tuy.html'
          },
          {
            blogType:'kinh-nghiem',
            title: 'Mẫu nội quy cho thuê phòng trọ, nhà trọ mới nhất 2020',
            image: 'https://img.thuephongtro.com/images/uploads/20200309125312-o0ty2.jpg',
            publishTime: '5:24 09/03/2020',
            url: 'noi-quy-cho-thue-phong.html'
          },
          {
            blogType:'kinh-nghiem',
            title: 'Bộ Công thương đề xuất giá điện sinh hoạt 5 bậc',
            image: 'https://img.thuephongtro.com/images/uploads/20200309121311-d4ek3.jpg',
            publishTime: '5:24 09/03/2020',
            url: 'de-xuat-gia-dien-5-bac.html'
          }
        ]
      };
    }
  };
  </script>
  