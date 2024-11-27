<template>
    <div class="content user-wrapper">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12 p-0">
            <div class="card bootstrap-table">
              <div class="card-body p-0 table-full-width">
                <div class="bootstrap-table">
                  <div class="fixed-table-container" style="padding-bottom: 0px;">
                    <div class="fixed-table-body">
                      <table id="bootstrap-table" class="table table-hover">
                        <thead class="pt-2">
                          <tr>
                            <th class="text-center" style="width:60px">Ảnh</th>
                            <th class="text-center" style="width:240px">Tiêu đề</th>
                            <th class="text-center">Nội dung</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(post, index) in filteredposts" :key="index">
                            <td class="image-wrapper p-0">
                              <img class="image-modify" :src="post.image || 'https://cdn.dribbble.com/users/263641/screenshots/4517916/404_not_found_3_dribbble.jpg'" alt="">
                            </td>
                            <td class="text-center line-clamp-2">{{ post.title }}</td>
                            <td class="line-clamp-2b">{{ post.description }}</td>
                            <td>
                              <a href="" @click.prevent="openUpdateModal(post)" class="mr-4">Sửa</a>
                              <a href="" @click.prevent="handledeleteArticle(post._id)" class="text-danger mr-4">Xóa</a>
                              <a href="" v-if="post.status === 'visible' || !post.status" @click.prevent="updateArticleStatus(post._id, 'hidden')" class="text-secondary">Ẩn</a>
                              <a href="" v-else @click.prevent="updateArticleStatus(post._id, 'visible')" class="text-secondary">Hiện</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ul role="navigation" v-if="filteredposts.length != 0" class="pagination mb-3 mt-4 d-flex align-items-center justify-content-center">
      <li :class="['page-item', currentPage === 1 ? 'disabled' : '']">
        <a @click.prevent="changePage(currentPage - 1)" href="#" aria-label="« Previous" class="page-link">‹</a>
      </li>
    
      <li v-for="page in totalPages" :key="page" :class="['page-item', currentPage === page ? 'active' : '']">
        <a @click.prevent="changePage(page)" href="#" class="page-link">{{ page }}</a>
      </li>
    
      <li :class="['page-item', currentPage === totalPages ? 'disabled' : '']">
        <a @click.prevent="changePage(currentPage + 1)" href="#" aria-label="Next »" class="page-link">›</a>
      </li>
    </ul>
    
    <div id="popup-modal" v-if="isDeletePopup" tabindex="-1" class="hidden delete-popup overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative fixed px-0 py-0 w-full max-w-md max-h-full">
          <div class="relative bg-white px-0 rounded-lg shadow dark:bg-gray-700 overflow-hidden">
              <button type="button " @click.prevent="isDeletePopup = false" class="absolute outline-none top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                  <svg class="w-3 h-3 close-btn" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span class="sr-only">Close modal</span>
              </button>
              <div class="px-4 py-4 md:p-5 text-center">
                  <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                  </svg>
                  <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this news?</h3>
                  <div class="d-flex justify-content-between px-4 button-wrapper">
                    <button data-modal-hide="popup-modal" @click.prevent="deleteArticle" type="button" class="text-white nowrap px-4 py-8 outline-none bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center text-center">
                        Yes, I'm sure
                    </button>
                    <button data-modal-hide="popup-modal" @click.prevent="isDeletePopup = false" type="button" class="py-2.5 nowrap px-4 py-8 outline-none ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                </div>
                  </div>
          </div>
      </div>
  </div>
  <BlogPostUpdateModal v-if="showBlogPostUpdate" :selected-article="selectedArticle"  @close-modal="closeArticleModal" />

  </template>
  
  <script>
  import {getLatestPosts, getUserPosts, deleteArticle, getLatestArticles, updateArticleStatus, getArticleByUser} from '@/services/api'; // Import hàm gọi API từ api.js
  import BlogPostUpdateModal from '../BlogPost/BlogPostComponents/BlogPostUpdateModal.vue';
  import { formatDate } from '@/utils/dateUtils'; 
  import {
    mapGetters,
  } from 'vuex';

  export default {
    name:'PostList',
    computed: {
      ...mapGetters([ 'getUserProfile',]),
      filteredposts() {
    const query = this.searchQuery.toLowerCase();
    return this.blogPosts.filter((post) => {
      const isMatch = 
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.author.email.toLowerCase().includes(query) ||
        post.author.fullName.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) 


      return isMatch;
    });
  },
    },
    components:{
      BlogPostUpdateModal,
    },
    props: {
      searchQuery: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        filterType: 'all',
        currentPage: 1,
        pageSize: 10,
        totalPages: 1,
        totalRecords: 0,
        blogPosts: [],
        isDeletePopup: false,
        selectedArticle:'',
        showBlogPostUpdate: false, 
      };
    },
    mounted() {
      this.fetchLatestArticles();
    },
    methods: {
      async fetchLatestArticles() {
        var response;
      try {
        if(this.getUserProfile.role == 'admin'){
          response = await getLatestArticles("", this.currentPage, 9, this.category);  // Gọi API lấy tin mới nhất
        } else {
          response = await getArticleByUser(this.getUserProfile._id, this.currentPage, 9);  // Gọi API lấy tin mới nhất

        }
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
          const description = words.slice(0, 40).join(' '); // Lấy 100 từ đầu tiên
          newsItem.description = description; // Thêm trường description đã lấy được nội dung
          this.blogPosts= postData.data
          this.totalPages = postData.totalPages
          });
        }
      } catch (error) {
        console.error("Lỗi lấy tin mới nhất:", error);
      }
     },
     closeArticleModal(){
       this.showBlogPostUpdate = false;
       this.fetchLatestArticles();
     },
      async fetchRoomList() {
        try {
          var response;
          let query = {
            page: this.currentPage
          }
          if(this.getUserProfile.role == 'admin'){
            response = await getLatestPosts(query);  // Gọi API lấy tin mới nhất
            this.totalPages = response.data.totalPages;
          } else {
            response = await getUserPosts(this.getUserProfile._id);  // Gọi API lấy tin mới nhất
          }
          if (response && response.data) {
            this.posts = response.data.results;
          }
        } catch (error) {
          console.error("Lỗi lấy tin mới nhất:", error);
        }
     },
     openUpdateModal(post) {
      this.selectedArticle = post; // Gán post vào biến selectedArticle
      this.showBlogPostUpdate = true; // Hiển thị modal
    },
    async updateArticleStatus(id, state){
      try {
          let response = await updateArticleStatus(id, state);  // Gọi API lấy tin mới nhất
          if (response.status == 200) {
            this.fetchLatestArticles();            
          }
        } catch (error) {
          console.error("Lỗi xóa tin:", error);
        }
     },
     handledeleteArticle(id){
       this.selectedArticle = id;
       this.isDeletePopup = true;
      },
      async deleteArticle(){
      try {
          let response = await deleteArticle(this.selectedArticle);  // Gọi API lấy tin mới nhất
          if (response.status == 200) {
            this.isDeletePopup = false;
            this.fetchLatestArticles();            
          }
        } catch (error) {
          console.error("Lỗi xóa tin:", error);
        }
     },
     changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
        this.fetchLatestArticles();
      }
    },
    },
  };
  </script>
        
