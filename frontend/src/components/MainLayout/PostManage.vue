<template>

  <HeaderRoom class="header--small" @search="handleSearch"  @scroll-to-title="scrollToPostTitle" />  
<div class="d-flex flex-column align-items-center">
  <!-- Khung search -->
  <div class="view-switcher blog-header room-list d-flex align-items-center justify-content-between">
    <div class="breadcrumb-list">
      <router-link to="/">RoomFinder</router-link>
      <span> > </span>
      <router-link to="/post-management" @click="isPostManagement=false">Quản lý tin</router-link>
    </div>
    <div class="search-wrapper d-flex">
      <input type="hidden" value="en">
      <input v-model="searchQuery" type="text" placeholder="Nhập nội dung tìm kiếm" spellcheck="false" class="form-control">
      <a href="#" @click.prevent="fetchData" class="search-icon"><i class="fas fa-search"></i></a>
    </div>
    <div class="view-switcher__element">
      <select name="" id="" class="outline-none" v-model="type">
        <option value="posts">Bài đăng</option>
        <option value="news">Tin đăng</option>
      </select>
    </div>
  </div>

  <!-- Danh sách bài đăng -->
  <div class="apartment__inline post__inline">
    <div class="row">
      <PostList v-if="type=='posts'" :searchQuery="searchQuery" />
      <NewsList v-if="type=='news'" :searchQuery="searchQuery" />
      

      <!-- danh mục bên phải -->
      <!-- <div class="blogpage-right col-4">
        <div class="sidebar-box">
          <h3 class="sidebarbox-title">
            Danh mục blog
          </h3>
          <div class="sidebarbox-body">
            <ul class="box-lastnews">
              <li @click="isPostManagement=false">
                <router-link to="/blog-posts/category/news">Tin tức</router-link>
              </li>
              <li @click="isPostManagement=false">
                <router-link to="/blog-posts/category/owner-review">Review chủ trọ</router-link>
              </li>
              <li @click="isPostManagement=false">
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
  import PostList from './RoomComponents/PostList.vue';
  import NewsList from './RoomComponents/NewsList.vue';

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
      NewsList,
      // SuggestedPosts,
      PostList,
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
        isPostManagement: false,
        postContent: '',
        selectedUser: {},
        type:'posts',
      }
    },
    methods: {
    async fetchArticleDetail(slug) {
      if(this.isPostManagement){
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
      this.isPostManagement = true;
      // Gọi hàm lấy nội dung bài viết dựa trên slug
      this.fetchArticleDetail(slug);
    },

  },
  mounted() {
    if (this.slug) {
      // Thực hiện xử lý nếu slug có giá trị
      this.fetchArticleDetail(this.slug);
      this.isPostManagement = true;
    } else{
      this.isPostManagement = false;
    }
    if(this.isPostManagement == true){
      this.fetchArticleDetail(this.slug)
    }
  },

  };
</script>