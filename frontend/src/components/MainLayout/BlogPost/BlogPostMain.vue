<template>
  <!-- Khung search -->
  <div class="view-switcher blog-header room-list d-flex align-items-center justify-content-between">
    <div class="breadcrumb-list">
      <router-link to="/">RoomFinder</router-link>
      <span> > </span>
      <a href="">Tin tức</a>
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
      <BlogPostList v-if="!isBlogPostDetail"/>
      <div v-if="isBlogPostDetail" class="col-8 blog-list-wrapper">
        {{ postContent }}
      </div>
      <!-- danh mục bên phải -->
      <div class="blogpage-right col-4">
        <div class="sidebar-box">
          <h3 class="sidebarbox-title">
            Danh mục blog
          </h3>
          <div class="sidebarbox-body">
            <ul class="box-lastnews">
              <li>
                <router-link to="/blog-posts/post">Tin tức</router-link>
              </li>
              <li>
                <router-link to="/blog-posts/owner-review">Review chủ trọ</router-link>
              </li>
              <li>
                <router-link to="/blog-posts/share-experience">Chia sẻ kinh nghiệm</router-link>
              </li>
            </ul>
          </div>
        </div>

        <SuggestedPosts />
      </div>
    </div>
  </div>

  <ul v-show="!loading" role="navigation" class="pagination mb-3">
    <li aria-disabled="true" aria-label="« Previous" class="page-item disabled"><span aria-hidden="true"
        class="page-link">‹</span></li>
    <li aria-current="page" class="page-item active"><span class="page-link">1</span></li>
    <li class="page-item"><a href="/list?page=2" class="page-link">2</a></li>
    <li class="page-item"><a href="/list?page=3" class="page-link">3</a></li>
    <li class="page-item"><a href="/list?page=4" class="page-link">4</a></li>
    <li class="page-item"><a href="/list?page=2" rel="next" aria-label="Next »" class="page-link">›</a></li>
  </ul>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.min.css';
  import '@/assets/css/blogpost.css';
  import BlogPostList from './BlogPostComponents/BlogPostList.vue';
  import SuggestedPosts from './BlogPostComponents/SuggestedPosts.vue';
  export default {
    name: 'BlogPostMain',
    components: {
      BlogPostList,
      SuggestedPosts
    },
    data(){
      return {
        isBlogPostDetail: false,
        postContent: '',
      }
    }
  };
</script>