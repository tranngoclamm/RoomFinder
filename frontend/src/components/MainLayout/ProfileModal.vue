<template>
    <div class="profile-modal-overlay" ></div>
    <div class="row profile-modal py-5 px-4"  @click="closeModal">
        <div class="col-md-5 mx-auto" @click.stop>
            <!-- Profile widget -->
            <div class="bg-white rounded overflow-hidden position-relative" >
                <i class="fa-solid fa-x" @click="closeModal"></i>
                <div class="px-4 pt-0 pb-4 cover">
                    <div class="media align-items-end profile-head">
                        <div class="profile mr-3">
                            <img :src="author.profilePicture || require('@/assets/images/default-user.svg')" alt="..." width="130" class="rounded mb-2 img-thumbnail" />
                            <a href="#" class="btn btn-outline-dark btn-sm btn-block">Edit profile</a>
                        </div>
                        <div class="media-body mb-5 d-flex">
                            <div class="media">
                                <h4 class="mt-0 mb-0 text-white">{{author.fullName}}</h4>
                                <p class="small text-white"><i class="fas fa-map-marker-alt mr-2"></i>New York</p>
                            </div>
                            <div @click="sentDataAndOpenChat(author)" class="chat-icon-wrapper cursor-pointer" v-if="author._id != userId">
                                <i class="fa-brands fa-rocketchat ml-3" style="color: #ffffff;"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-light p-4 d-flex justify-content-end text-center">
                    <ul class="list-inline mb-0 col-5 d-flex justify-content-between">
                        <li class="list-inline-item">
                            <h5 class="font-weight-bold mb-0 d-block">
                                {{ (author.postedRooms ? author.postedRooms.length : 0) + (totalNews ? totalNews : 0) }}
                            </h5>
                            <small class="text-muted"> Posts</small>
                        </li>
                        <li class="list-inline-item">
                            <h5 class="font-weight-bold mb-0 d-block">745</h5>
                            <small class="text-muted"> Views</small>
                        </li>
                        <li class="list-inline-item">
                            <h5 class="font-weight-bold mb-0 d-block">340</h5>
                            <small class="text-muted"> Favorites</small>
                        </li>
                    </ul>
                </div>
                <div class="px-4 py-3">
                    <h5 class="mb-0 about">About</h5>
                    <div class="p-4 rounded shadow-sm bg-light">
                        <p class="font-italic mb-0">Web Developer</p>
                        <p class="font-italic mb-0">Lives in New York</p>
                        <p class="font-italic mb-0">Photographer</p>
                    </div>
                </div>
                <div class="py-4 px-4">
                    <div class="d-flex align-items-center justify-content-between mb-3">
                        <h5 class="mb-0">Recent news</h5>
                        <a href="#" class="btn btn-link text-muted" @click.prevent="toggleShowAll">
                            {{ showAll ? 'Show less' : 'Show all' }}
                        </a>
                    </div>
                    <div class="row">
                        <div v-for="(article, index) in displayedArticles" :key="article._id" class="col-lg-6 mb-2" :class="index % 2 === 0 ? 'pr-lg-1' : 'pl-lg-1'">
                            <a :href="'/blog-posts/' + article.slug" target="_blank">
                                <img :src="article.image" :alt="article.title" :title="article.title + ' '+ article.createdAt" class="img-fluid rounded shadow-sm" />
                            </a>
                        </div>
                        <div v-for="(post, index) in displayedPosts" :key="post._id" class="col-lg-6 mb-2" :class="index % 2 === 0 ? 'pr-lg-1' : 'pl-lg-1'">
                            <a href="" @click.prevent="openDetailRoomModal(post)">
                                <img :src="post.image" :alt="post.title" :title="post.title + ' '+ post.createdAt" class="img-fluid rounded shadow-sm" />
                            </a>
                        </div>
                    </div>
                                      
                </div>
            </div>
        </div>
    </div>
    <DetailRoom v-if="showModal" @close-modal="closeDetailRoomModal" :apartment="apartment" />
</template>
<script>
    import 'bootstrap/dist/css/bootstrap.min.css';
    import '@/assets/css/profile.css';
    import { formatDate } from '@/utils/dateUtils'; 
    import {getArticleByUser, getUserPosts} from '@/services/api'; // Import hàm gọi API từ api.js
    import { mapMutations, mapActions, mapGetters } from 'vuex';
    import DetailRoom from './RoomComponents/DetailRoom.vue'; 

    export default {
        name: 'ProfileModal',
        emits: ['closeModal'],
        props: {
            author: {
                type: Object,
                required: true,
            },
        },
        data(){
            return{
                totalNews: 0,
                articles: [],
                userId: '',
                showAll: false,
                displayedPosts: [],
                showModal: false,
                apartment: null,
            }
        },
        components:{
            DetailRoom
        },
        computed: {
            displayedArticles() {
            return this.showAll ? this.articles : this.articles.slice(0, 4);
            },
            ...mapGetters(['getUserProfile'])
        },
        methods: {
            ...mapMutations(['setChatUser']),
            ...mapActions(['openMessageDetail']),
            toggleShowAll() {
                this.showAll = !this.showAll;
            },
            openDetailRoomModal(post) {
                this.apartment = post; // Cập nhật bài đăng được chọn
                this.showModal = true;    // Hiển thị modal
            },
            closeDetailRoomModal() {
                this.showModal = false;   // Ẩn modal
                this.apartment = null; // Đặt lại bài đăng được chọn
            },
            sentDataAndOpenChat(user){
                this.setChatUser(user)
                this.openMessageDetail()
            },
            closeModal() {
                this.$emit('closeModal'); // Phát ra sự kiện 'closeModal' để cha có thể nghe và xử lý
            },
            async fetchArticlesByUser() {
                try {
                    const response = await getArticleByUser(this.author._id, 1, ''); // Gọi hàm API với page = 1
                    // this.articles = response.data.; 
                    this.totalNews = response.data.total;
                    if (response && response.data.articles) {
                        let postData = response.data.articles
                        postData.forEach(newsItem => {
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
                        this.articles = postData; 
                    }
                } catch (error) {
                    console.error('Error fetching article detail:', error);
                }

                try{
                    const response = await getUserPosts(this.author._id); 
                    // this.articles = response.data.; 
                    if (response && response.data.results.length != 0) {
                        let postData = response.data.results
                        postData.forEach(newsItem => {
                            newsItem.createdAt = formatDate(newsItem.createdAt); // chuyển định dạng ngày
                            // Sử dụng biểu thức chính quy để tìm URL hình ảnh trong content
                            
                            // Nếu tìm thấy URL, thêm trường image vào đối tượng
                            if (newsItem.images.length != 0) {
                                newsItem.image = newsItem.images[0]; // thêm trường image
                            } else {
                                newsItem.image = 'https://cdn.dribbble.com/users/263641/screenshots/4517916/404_not_found_3_dribbble.jpg'; 
                            }
                        },
                        this.displayedPosts = postData,
                    );
                    }
                    
                } catch (error) {
                    console.error('Error fetching article detail:', error);
                }
            },

        },
        mounted(){
            this.userId = JSON.parse(localStorage.getItem('user'))._id;
            this.fetchArticlesByUser();
        }
  }
</script>
