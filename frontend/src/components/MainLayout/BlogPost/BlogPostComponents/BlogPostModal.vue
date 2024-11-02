<template>
    <div class="tinymce-wrapper">
        <div class="tinymce-header">
            <div class="row position-relative">
                <!-- Chọn loại bài đăng -->
                <div class="col-6 d-flex align-items-center">
                    <label for="postType" class="labelPost">Thể loại:</label>
                    <select v-model="postType" @change="onPostTypeChange" class="form-select">
                        <option value="" disabled selected>Chọn loại bài đăng</option>
                        <option value="room">Cho thuê phòng trọ</option>
                        <option value="apartment">Cho thuê căn hộ</option>
                        <option value="house">Cho thuê nhà</option>
                        <option value="find-roommate">Tìm người ở ghép</option>
                        <option value="news">Đăng tin</option>
                        <option value="owner-review">Review chủ trọ</option>
                        <option value="experience-sharing">Chia sẻ kinh nghiệm</option>
                    </select>
                </div>
    
                <!-- Input để nhập tên chủ trọ nếu loại bài đăng là review -->
                <div v-if="postType === 'owner-review'" class="col-5 user-select-none position-relative d-flex align-items-center">
                    <div v-if="input_select" class="input__select-wrapper">
                        <input type="text" spellcheck="false" class="input-owner" ref="inputOwner" v-model="inputsearchHost"
                            @input="fetchOwnerDetails" placeholder="Nhập tên chủ trọ" />
                        <div class="dropdown search__owner-wrapper ms-0 w-100 mt-1">
                            <div class="dropdown ms-2">
                                <ul class="dropdown-menu location-menu d-block" v-if="inputsearchHost.length > 1">
                                    <template v-if="hostResults.length > 0">
                                        <li v-for="(item, index) in hostResults" :key="index">
                                        <a class="dropdown-item" @click="selectHost(item)">
                                          <img :src="item.profilePicture || 'https://res.cloudinary.com/dlawgdb8h/image/upload/v1730344959/avatars/kn6xdlvb6hivqkhka000.jpg'" class="avatar" alt="Avatar" />
                                          <span>{{ item.fullName }}</span>
                                          <span class="my-1" v-if="item.phone">-</span>
                                          <span>{{ item.phone }}</span>
                                        </a>
                                      </li>
                                    </template>
                                    <!-- Nếu không có kết quả thì hiển thị thông báo -->
                                    <li v-else>
                                        <a class="dropdown-item">Không tìm thấy</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="selected__owner-wrapper" v-if="!input_select">
                        <a class="dropdown-item" @click="this.input_select=true">
                            <img :src="this.ownerAvatar || 'https://res.cloudinary.com/dlawgdb8h/image/upload/v1730344959/avatars/kn6xdlvb6hivqkhka000.jpg'" class="avatar" alt="Avatar" />
                            <span> {{this.ownerName}}</span>
                          </a>
                    </div>
                </div>
                <!-- Nút lưu bài viết -->
                <button @click="savePost" class="savePost position-absolute">Đăng tin</button>
            </div>
    
            <div class="title-wrapper d-flex">
                <label for="" class="labelPost">Tiêu đề:</label>
            </div>
            <textarea spellcheck="false" @input="autoResize($event.target)" class="inputTitle" rows="1"
                placeholder="Nhập tiêu đề ở đây..."></textarea>
        </div>
        <!-- Hiện TinyMCE nếu không phải loại bài đăng là review -->
        <div class="h-100">
            <textarea id="tinymce-editor"></textarea>
        </div>
    </div>
</template>
<script>
    import {searchOwner, uploadImagePostToCloudinary, createArticle} from '@/services/api'; // Import hàm gọi API từ api.js
    export default {
        name: 'BlogPostModal',
        emits: ['closeModal'] ['closeAll'],
        props: {
            categoryId: {
                type: String,
                required: true, // Hoặc false tùy theo yêu cầu của bạn
            },
        },
        data() {
            return {
                user: '',
                createdByFullName:'',
                createdByAvatar:'',
                createdByUserId:'',
                input_select: true,
                postType: '',
                ownerId: '',
                ownerName: '',
                ownerAvatar: '',
                titlePost:'',
                inputsearchHost: "",
                hostResults: [],
            };
        },
        mounted() {
            if (!this.categoryId) {
                console.warn('categoryId chưa được truyền từ component cha!');
            } else {
                this.handleCategoryChange(this.categoryId);
            }
            // Lấy tên đầy đủ từ localStorage
            this.user = JSON.parse(localStorage.getItem('user'));
            this.createdByFullName = this.user ? this.user.fullName : '';
            this.createdByAvatar = this.user ? this.user.profilePicture : '';
            this.createdByUserId = this.user ? this.user._id : '';
            // Tạo một script tag để thêm TinyMCE từ CDN
            const script = document.createElement('script');
            script.src =
                'https://cdn.tiny.cloud/1/le9qcsu87p04s8v14ytdr1ubsw4t7t4r023xnwemr2dtcxtd/tinymce/6/tinymce.min.js';
            script.referrerpolicy = 'origin';
            script.onload = () => {
                window.tinymce = window.tinymce || {};
                this.initializeTinyMCE();
            };
            document.head.appendChild(script);
        },
        beforeUnmount() {
            const editor = window.tinymce.get('tinymce-editor');
            if (editor) {
                editor.destroy();
            }
        },
        methods: {
            initializeTinyMCE() {
                window.tinymce.init({
                    selector: '#tinymce-editor',
                    plugins: 'lists searchreplace table image preview wordcount',
                    toolbar: 'undo redo | table | searchreplace | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | preview | wordcount ',
                    content_style: `
                        body {
                            font-family: 'Montserrat', sans-serif;
                            font-size: 16px;
                            line-height: 1.8;
                            color: #3d3b40;
                            font-weight: 400;
                            letter-spacing: 0.1px;
                            font-stretch: expanded;
                        }
                        h1{
                            font-size: 32px;
                            font-weight: 600;
                            margin-top: 16px;
                            margin-bottom: 8px;
                            width: 100%;
                            color: #3C70D1;
                            font-family: Helvetica, Arial, Roboto, sans-serif;
                            border: none;
                            outline: none;
                            line-height: 1.2;
                            resize: none;
                            /* height: auto;
                            */
                        }
                        .article-time{
                            margin: 8px 2px;
                        }
                        img{
                            width: 100%;
                            height: auto;
                            -o-object-fit: cover;
                            object-fit: cover;
                            transition: .3s;
                        }
                        .icon-avatar{
                            width: 24px;
                            height: 24px;
                            border-radius: 50%;
                            border: 1px solid #ddd;
                            transform: translateY(-1px);
                            margin-left: 6px;
                            margin-right: 4px;
                        }
                        p {
                            margin-top: 0;
                            margin-bottom: 8px;
                        }
                        .user-name{
                            display: flex;
                            align-items:center;
                        }
                        a{
                            cursor: pointer !important;
                            text-decoration: none;
                            color: #3d3b40;
                        }
                        .mce-content-body [data-mce-selected=inline-boundary] {
                            background-color: transparent !important;
                        }
                        .profile-container{
                            display: flex;
                            justify-content: space-between; 
                            align-items: center;
                        }
                        .created-by-wrapper{
                            float: right;
                        }

                    `,
                     // Cấu hình để cho phép upload ảnh từ thiết bị
                     images_upload_handler: async function (blobInfo, success, failure) {
                        const formData = new FormData();
                        formData.append('file', blobInfo.blob());
                        formData.append('upload_preset', 'post_upload_preset'); // Thay bằng upload preset của bạn
                        try {
                            const response = await uploadImagePostToCloudinary(formData);
                            if (response.data.secure_url) {
                                return response.data.secure_url
                            } else {
                                throw new Error('Cloudinary không trả về URL của ảnh');
                            }
                        } catch (error) {
                            console.error("Upload failed:", error);
                            failure('Ảnh không thể upload: ' + error.message);
                        }
                    },
                    // Thiết lập font formats và font size trong menu
                    font_formats: "Montserrat=Montserrat, sans-serif; Arial=Arial, Helvetica, sans-serif; Times New Roman=Times New Roman, Times, serif;",
                    fontsize_formats: "10px 12px 14.4px 16px 18px 24px 36px",

                    // Cấu hình chiều rộng cho preview
                    preview_styles: false, // Ngăn không áp dụng style mặc định của TinyMCE
                    preview_content_css: false,
                    preview_iframe_css: `
                        body {
                            width: calc(1200px * 8 / 12);
                            font-family: 'Montserrat', sans-serif;
                            letter-spacing: 0.1px;
                            }
                            `,
                    });
            },
            handleCategoryChange(type) {
                // Kiểm tra CategoryId từ props
                this.postType = type;
            },
            autoResize(textarea) {
                this.titlePost = textarea.value;
                // Đặt chiều cao về 'auto' để reset chiều cao và đo lại chính xác
                textarea.style.height = 'auto';

                // Đặt chiều cao dựa trên nội dung (tăng một chút để tránh thanh cuộn dọc nếu có)
                textarea.style.height = `${textarea.scrollHeight}px`;

                // Cập nhật nội dung tiêu đề `h1` trong TinyMCE
                this.titleText = textarea.value;
                const editor = window.tinymce.get('tinymce-editor');
                if (editor) {
                    // Lấy nội dung hiện tại của TinyMCE
                    var currentContent = editor.getContent();

                    // Tạo nội dung tiêu đề
                    const titleHTML = `<h1 class="page-h1 font-merriweather-bold">${this.titleText}</h1>`;

                    // Tạo dấu thời gian
                    const currentDateTime = new Date();
                    const hours = String(currentDateTime.getHours()).padStart(2, '0');
                    const minutes = String(currentDateTime.getMinutes()).padStart(2, '0');
                    const day = String(currentDateTime.getDate()).padStart(2, '0');
                    const month = String(currentDateTime.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
                    const year = currentDateTime.getFullYear();
                    const timeStampHTML =
                        `<div class="d-flex article-time align-items-center flex-wrap mt-0 mb-2"><span class="article-publish">${hours}:${minutes} ${day}/${month}/${year}</span></div>`;

                    // Kiểm tra nếu tiêu đề đã tồn tại
                    if (currentContent.includes('<h1 class="page-h1 font-merriweather-bold">')) {
                        // Thay thế tiêu đề cũ
                        const updatedContent = currentContent.replace(
                            /<h1 class="page-h1 font-merriweather-bold">.*?<\/h1>/, titleHTML);
                        editor.setContent(updatedContent);
                    } else {
                        // Thêm tiêu đề vào đầu
                        editor.setContent(`${titleHTML}${currentContent}`);
                    }

                    // Kiểm tra nếu dấu thời gian đã tồn tại
                    if (currentContent.includes('<span class="article-publish">')) {
                        // Thay thế dấu thời gian cũ
                        const updatedContent = editor.getContent().replace(/<span class="article-publish">.*?<\/span>/,
                            `<span class="article-publish">${hours}:${minutes} ${day}/${month}/${year}</span>`);
                        editor.setContent(updatedContent);
                    } else {
                        editor.setContent(`${titleHTML}${timeStampHTML}${currentContent}`);
                    }
                }
            
            },
            onPostTypeChange() {
                // Kiểm tra nếu không phải loại bài đăng cho phép
                if (!['news', 'owner-review', 'experience-sharing'].includes(this.postType)) {
                    this.$emit('closeModal', this.postType); // Emit sự kiện để ẩn modal
                }
            },
            // Hàm điều hướng
            navigateToProfile(userId) {
                // Sử dụng Vue Router để điều hướng
                window.location.href = `/profile/${userId}`;
            },
            async fetchOwnerDetails() {
                // Gọi API khi input có từ 2 ký tự trở lên
                if (this.inputsearchHost.length > 1) {
                    try {
                        const response = await searchOwner(this.inputsearchHost);
                        this.hostResults = response.data.map(user => ({
                            _id: user._id,
                            fullName: user.fullName,
                            phone: user.phone,
                            profilePicture: user.profilePicture,
                        }));
                    } catch (error) {
                        console.error("Lỗi khi tìm kiếm chủ trọ:", error);
                        this.hostResults = [];
                    }
                } else {
                    this.hostResults = []; // Đặt lại khi xóa input
                }
            },
            selectHost(owner) {
                this.ownerName = owner.fullName;
                this.ownerAvatar = owner.profilePicture;
                this.ownerId = owner._id;
                this.input_select = false;
                this.$refs.inputOwner.blur(); // Loại bỏ focus từ input
            },
            async savePost() {
                const content = window.tinymce.get('tinymce-editor').getContent();
                const postData = {
                    category: this.postType,
                    title: this.titlePost,
                    content: content,
                    landlord: this.ownerId,
                    author: this.createdByUserId,
                };

                try {
                    // Gửi bài viết lên backend và chờ phản hồi
                    const response = await createArticle(postData);
                    // Xử lý phản hồi từ backend, ví dụ: hiển thị thông báo thành công
                    if (response.data && response.status === 201) {
                        alert("Bài viết đã được tạo thành công!");
                        this.$emit('closeAll');
                    } else {
                        alert("Đã xảy ra lỗi khi tạo bài viết.");
                    }
                } catch (error) {
                    console.error("Lỗi khi tạo bài viết:", error);
                } 
            },
        
        watch: {
            categoryId(type) {
                if (!type) {
                    console.warn('categoryId chưa được truyền từ component cha!');
                } else {
                    this.handleCategoryChange(type); // Gọi hàm để xử lý nếu cần
                }
            },
        },
        }
    };
</script>