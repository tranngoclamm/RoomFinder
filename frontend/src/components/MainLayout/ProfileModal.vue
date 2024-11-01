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
                            <img :src="user.profilePicture || require('@/assets/images/default-user.svg')" alt="..." width="130" class="rounded mb-2 img-thumbnail" />
                            <a href="#" class="btn btn-outline-dark btn-sm btn-block">Edit profile</a>
                        </div>
                        <div class="media-body mb-5 d-flex">
                            <div class="media">
                                <h4 class="mt-0 mb-0 text-white">{{user.fullName}}</h4>
                                <p class="small text-white"><i class="fas fa-map-marker-alt mr-2"></i>New York</p>
                            </div>
                            <i class="fa-brands fa-rocketchat ml-3" style="color: #ffffff;"></i>
                        </div>
                    </div>
                </div>
                <div class="bg-light p-4 d-flex justify-content-end text-center">
                    <ul class="list-inline mb-0 col-5 d-flex justify-content-between">
                        <li class="list-inline-item">
                            <h5 class="font-weight-bold mb-0 d-block">215</h5>
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
                        <a href="#" class="btn btn-link text-muted">Show all</a>
                    </div>
                    <div class="row">
                        <div class="col-lg-6 mb-2 pr-lg-1">
                            <img src="https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="" class="img-fluid rounded shadow-sm" />
                        </div>
                        <div class="col-lg-6 mb-2 pl-lg-1">
                            <img src="https://images.unsplash.com/photo-1493571716545-b559a19edd14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="" class="img-fluid rounded shadow-sm" />
                        </div>
                        <div class="col-lg-6 pr-lg-1 mb-2">
                            <img src="https://images.unsplash.com/photo-1453791052107-5c843da62d97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" alt="" class="img-fluid rounded shadow-sm" />
                        </div>
                        <div class="col-lg-6 pl-lg-1">
                            <img src="https://images.unsplash.com/photo-1475724017904-b712052c192a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="" class="img-fluid rounded shadow-sm" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>
<script>
    import 'bootstrap/dist/css/bootstrap.min.css';
    import '@/assets/css/profile.css';

    export default {
        name: 'ProfileModal',
        emits: ['closeModal'],
        data(){
            return{
                user:{},
            }
        },
        methods: {
            closeModal() {
                this.$emit('closeModal'); // Phát ra sự kiện 'closeModal' để cha có thể nghe và xử lý
            },
            getProfile(){
                const userProfile = JSON.parse(localStorage.getItem('user'));
                if (!userProfile || !userProfile._id) {
                    console.error("Người dùng không hợp lệ.");
                    return;
                }else{
                    this.user=userProfile;
                    console.log(this.user)
                }
            } 

        },
        mounted(){
            this.getProfile();
        }
  }
</script>
