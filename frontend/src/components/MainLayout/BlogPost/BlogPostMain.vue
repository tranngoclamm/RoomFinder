<template>
  <!-- Khung search -->
  <div class="view-switcher blog-header room-list d-flex align-items-center justify-content-between">
    <div class="breadcrumb-list">
      <router-link to="/">RoomFinder</router-link>
      <span> > </span>
      <router-link to="/blog-posts" @click="isBlogPostDetail=false">{{selectedBlogType}}</router-link>
    </div>
    <div class="view-switcher__element"><input type="hidden" value="en">
      <input v-model="searchQuery" type="text" placeholder="Nhập nội dung tìm kiếm" class="form-control">
      <a href="#" @click.prevent="fetchData"><i class="fas fa-search"></i></a>
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
      <BlogPostList v-if="!isBlogPostDetail"  @openDetailPost="handleOpenDetailPost"/>
      <div v-if="isBlogPostDetail" class="col-8 blog-list-wrapper">
        <div v-if="article.content && isContentLoaded" v-html="article.content"></div>
        <img v-if="isError" src="@/assets/images/404-error-with-landscape-concept-illustration_114360-7898.jpg" alt="">
        <div class="mt-1" :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', float: !article.landlord ? 'right' : '' }">
          <div v-if="article.landlord && article.landlord.fullName">
            <a class="user-name" href="/" @click.prevent="openProfileModal(article.landlord)">
              Chủ trọ: 
              <img :src="article.landlord.profilePicture || 'https://res.cloudinary.com/dlawgdb8h/image/upload/v1730344959/avatars/kn6xdlvb6hivqkhka000.jpg'" 
                   alt="" class="icon-avatar" /> 
                  {{ article.landlord?.fullName ?? '?' }}
            </a>
          </div>
          <div v-if="article.author && article.author.fullName" style="text-align: right; float:right">
            <a class="user-name" href="/" @click.prevent="openProfileModal(article.author)">
              Người đăng: 
              <img :src="article.author.profilePicture || 'https://res.cloudinary.com/dlawgdb8h/image/upload/v1730344959/avatars/kn6xdlvb6hivqkhka000.jpg'" 
                   alt="" class="icon-avatar" /> 
              {{ article.author?.fullName ?? '?' }}
            </a>
          </div>
          
        </div>
      </div>
      <!-- danh mục bên phải -->
      <div class="blogpage-right col-4">
        <div class="sidebar-box">
          <h3 class="sidebarbox-title">
            Danh mục blog
          </h3>
          <div class="sidebarbox-body">
            <ul class="box-lastnews">
              <li @click="isBlogPostDetail=false, selectedBlogType='Tin tức'">
                <router-link to="/blog-posts/category/news">Tin tức</router-link>
              </li>
              <li @click="isBlogPostDetail=false, selectedBlogType='Review chủ trọ'">
                <router-link to="/blog-posts/category/owner-review">Review chủ trọ</router-link>
              </li>
              <li @click="isBlogPostDetail=false, selectedBlogType='Chia sẻ kinh nghiệm'">
                <router-link to="/blog-posts/category/experience-sharing">Chia sẻ kinh nghiệm</router-link>
              </li>
            </ul>
          </div>
        </div>

        <ProfileModal v-if="isProfileModal" @closeModal="isProfileModal=false" :author="this.selectedUser"/>
        <SuggestedPosts @openDetailPost="handleOpenDetailPost"/>
      </div>
    </div>
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.min.css';
  import '@/assets/css/blogpost.css';
  import BlogPostList from './BlogPostComponents/BlogPostList.vue';
  import SuggestedPosts from './BlogPostComponents/SuggestedPosts.vue';
  import ProfileModal from '../ProfileModal.vue';
  import {getArticleDetail} from '@/services/api'; // Import hàm gọi API từ api.js

  export default {
    name: 'BlogPostMain',
    components: {
      BlogPostList,
      ProfileModal,
      SuggestedPosts
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
        isContentLoaded: false,
        roomType:'',
        isError:false,
        loading:'',
        searchQuery: '',
        isBlogPostDetail: false,
        postContent: '',
        selectedUser: {},
        selectedBlogType: "Tin tức",
      }
    },
    methods: {
    async fetchArticleDetail(slug) {
      if(this.isBlogPostDetail){
        try {
          // Lấy slug từ URL
          const response = await getArticleDetail(slug); // Gọi hàm API
          this.article = response.data; // Gán dữ liệu bài viết vào state
        } catch (error) {
          this.isError = true;
          console.error('Error fetching article detail:', error);
        } finally{
          this.isContentLoaded = true;
          window.scrollTo(0, 0);
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