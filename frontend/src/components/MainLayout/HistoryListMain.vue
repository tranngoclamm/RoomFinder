<template>

  <HeaderRoom class="header--small" @search="handleSearch"  @scroll-to-title="scrollToPostTitle" />  
<div class="d-flex flex-column align-items-center">
  <!-- Khung search -->
  <div class="view-switcher blog-header room-list d-flex align-items-center justify-content-between">
    <div class="breadcrumb-list">
      <router-link to="/">RoomFinder</router-link>
      <span> > </span>
      <router-link to="/blog-posts" @click="isBlogPostDetail=false">Lịch sử</router-link>
    </div>
    <div class="search-wrapper d-flex">
      <input type="hidden" value="en">
      <input v-model="searchQuery" type="text" placeholder="Nhập nội dung tìm kiếm" spellcheck="false" class="form-control">
      <a href="#" @click.prevent="fetchData" class="search-icon"><i class="fas fa-search"></i></a>
    </div>
    <div class="view-switcher__element">
      <a href="#" style="display: none;"></a>
      <a class="active" v-if="this.roomType !='favorites'">
        <i class="fas fa-th-large"></i>
      </a>
      <a v-if="this.roomType !='favorites'">
        <i class="fas fa-list-ul"></i>
      </a>
    </div>
  </div>

  <!-- Danh sách bài đăng -->
  <div class="apartment__inline post__inline">
    <div class="row">
      <!-- Danh sách tin tức -->
      <HistoryList :searchQuery="searchQuery" />

      <!-- danh mục bên phải -->
      <!-- <div class="blogpage-right col-4">
        <div class="sidebar-box">
          <h3 class="sidebarbox-title">
            Danh mục blog
          </h3>
          <div class="sidebarbox-body">
            <ul class="box-lastnews">
              <li @click="isBlogPostDetail=false">
                <router-link to="/blog-posts/category/news">Tin tức</router-link>
              </li>
              <li @click="isBlogPostDetail=false">
                <router-link to="/blog-posts/category/owner-review">Review chủ trọ</router-link>
              </li>
              <li @click="isBlogPostDetail=false">
                <router-link to="/blog-posts/category/experience-sharing">Chia sẻ kinh nghiệm</router-link>
              </li>
            </ul>
          </div>
        </div>

      </div> -->
      <ProfileModal v-if="isProfileModal" @closeModal="isProfileModal=false" :author="this.selectedUser"/>
      <!-- <SuggestedPosts @openDetailPost="handleOpenDetailPost"/> -->
    </div>
  </div>


</div>

  <FooterRoom />  
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.min.css';
  import '@/assets/css/blogpost.css';
  import '@/assets/css/history.css';
  import HistoryList from './RoomComponents/HistoryList.vue';
  // import SuggestedPosts from './BlogPost/BlogPostComponents/SuggestedPosts.vue';
  import HeaderRoom from './HeaderRoom.vue';
  import FooterRoom from './FooterRoom.vue';
  import ProfileModal from './ProfileModal.vue';
  import {getArticleDetail} from '@/services/api'; // Import hàm gọi API từ api.js

  export default {
    name: 'BlogPostMain',
    components: {
      HeaderRoom,
      ProfileModal,
      // SuggestedPosts,
      HistoryList,
      FooterRoom
    },
    props: {
      slug: {
        type: String,
        default: null
      }
    },
    data(){
      return {
        isProfileModal: false,
        article: {},
        roomType:'',
        loading:'',
        searchQuery: '',
        isBlogPostDetail: false,
        postContent: '',
        selectedUser: {},
      }
    },
    methods: {
    async fetchArticleDetail(slug) {
      if(this.isBlogPostDetail){
        try {
          // Lấy slug từ URL
          const response = await getArticleDetail(slug); // Gọi hàm API
          this.article = response.data; // Gán dữ liệu bài viết vào state
          window.scrollTo(0, 0);
        } catch (error) {
          console.error('Error fetching article detail:', error);
        }
      }
    },
    openProfileModal(user) {
      this.selectedUser = user;
      this.isProfileModal=true;
  },
    handleOpenDetailPost(slug) {
      this.isBlogPostDetail = true;
      // Gọi hàm lấy nội dung bài viết dựa trên slug
      this.fetchArticleDetail(slug);
    },

  },
  mounted() {
    if (this.slug) {
      // Thực hiện xử lý nếu slug có giá trị
      this.fetchArticleDetail(this.slug);
      this.isBlogPostDetail = true;
    } else{
      this.isBlogPostDetail = false;
    }
    if(this.isBlogPostDetail == true){
      this.fetchArticleDetail(this.slug)
    }
  },

  };
</script>