<!-- PostNewModal.vue -->
<template>
  <div @click.self="closeModal" class="post__new-modal modal fade show" style="display: block;" tabindex="-1" role="dialog">
    <div v-if="!isBlogPostModal" class="modal-dialog modal-dialog-scrollable" role="document">
      <div class="modal-content">
        <div class="modal-header post-modal-header">
          <h5 class="modal-title">Đăng tin</h5>
          <button type="button" class="close" @click="closeModal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <div class="newpost-box mt-2">
            <div class="form-layout detail-section">
              <div class="form-group detail-section-category w-100">
                <label>Chuyên mục cho thuê <span>*</span></label>
                <select v-model="CategoryId" @change="handleCategoryChange" class="form-select" id="ddlPostCate"
                  name="CategoryId" data-val="true" data-val-required="Vui lòng chọn chuyên mục">
                  <option value="" selected >Chọn chuyên mục</option>
                  <option value="room">Cho thuê phòng trọ</option>
                  <option value="apartment">Cho thuê căn hộ</option>
                  <option value="house">Cho thuê nhà</option>
                  <option value="find-roommate">Tìm người ở ghép</option>
                </select>
                <span class="field-validation-valid text-danger" v-if="errors.CategoryId">{{ errors.CategoryId }}</span>
              </div>

              <div class="form-group w-100 has-count js-count-title">
                <label>
                  <div>Tiêu đề <span>*</span> </div>
                </label>
                <input v-model="Title" spellcheck="false" class="form-control text-box single-line" data-val="true"
                  data-val-maxlength="Tiêu đề tin tối đa là 150 ký tự" data-val-maxlength-max="150"
                  data-val-required="Vui lòng nhập tiêu đề tin" id="Title" maxlength="150" name="Title" type="text"
                  value="">
                <span class="field-validation-valid text-danger" data-valmsg-for="Title"
                  data-valmsg-replace="true"></span>
              </div>
              <div class="form-group">
                <label>Tỉnh/thành phố <span>*</span></label>
                <select v-model="selectedProvince" @change="onProvinceChange" class="form-select select_city">
                  <option value="">Chọn tỉnh/ Tp</option>
                  <option v-for="province in provinces" :key="province.id" :value="province.id">
                    {{ province.full_name }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label>Quận/huyện <span>*</span></label>
                <select v-model="selectedDistrict" class="form-select select_district">
                  <option value="">-- Quận/huyện --</option>
                  <option v-for="district in districts" :key="district.id" :value="district.id">
                    {{ district.full_name }}
                  </option>
                </select>
              </div>


              <div class="form-group">
                <label>Phường/xã</label>
                <select v-model="selectedWard" class="form-select select_ward">
                  <option value="">-- Phường/xã --</option>
                  <option v-for="ward in wards" :key="ward.id" :value="ward.id">{{ ward.full_name }}</option>
                </select>
              </div>

              <div class="form-group">
                <label>Đường/phố</label>
                <input v-model="streetName" spellcheck="false" class="form-control" placeholder="Nhập tên đường"
                  type="text">
              </div>


              <div class="form-group w-100">
                <label>Địa chỉ chính xác</label>
                <input v-model="exactAddress" spellcheck="false" class="form-control" placeholder="Địa chỉ chính xác"
                  type="text">
              </div>

              <div class="form-group detail-section-price">
                <label>Giá<span>*</span> <span id="lblPrice" style="font-size:13px;"></span></label>
                <input v-model="Price" class="form-control text-box single-line" data-val="true"
                  data-val-number="Giá nhập không đúng" data-val-required="Vui lòng nhập giá" decimal="true"
                  maxlength="6" placeholder="Nhập giá (triệu đồng)" type="text" value="">
              </div>
              <div class="form-group detail-section-area">
                <label>Diện tích</label>
                <input v-model="Area" class="form-control text-box single-line" data-val="true"
                  data-val-number="Diện tích nhập không đúng" data-val-required="Vui lòng nhập diện tích" decimal="true"
                  id="Area" maxlength="6" name="Area" numbersonly="true" placeholder="Nhập diện tích (m2)" type="text"
                  value="">
              </div>
            </div>
          </div>
          <div class="newpost-box mt-4">
            <div class="form-layout detail-section">

              <div class="form-group w-100 has-count js-count-desc">
                <label>
                  <div>Mô tả <span>*</span></div>
                </label>
                <textarea v-model="Detail" spellcheck="false" class="form-control desc-field" cols="20" data-val="true"
                  data-val-required="Vui lòng nhập nội dung" id="Detail" maxlength="5000" name="Detail"
                  rows="2"></textarea>
                <span class="field-validation-valid text-danger" data-valmsg-for="Detail"
                  data-valmsg-replace="true"></span>
              </div>
            </div>
          </div>




          <div class="newpost-box mt-4">
            <div class="form-layout">
              <div class="form-group w-100">
                <label>
                  <div>Hình ảnh / Video <span></span></div>
                </label>

                <!-- Upload area wrapper -->
                <div class="wrapper upload-image-area w-100" @click="triggerFileInput">
                  <form action="#" class="w-100">
                    <!-- Hidden input for selecting multiple files -->
                    <input class="file-input" type="file" name="file" ref="fileInput" hidden multiple
                      @change="handleFileUpload">
                    <i class="fas fa-cloud-upload-alt"></i>
                    <p>Browse File to Upload</p>
                  </form>
                </div>

                <!-- Display selected images -->
                <div v-if="selectedImages.length > 0" class="image-preview">
                  <label>
                    <div>Selected Images:</div>
                  </label>
                  <div class="image-list">
                    <img v-for="(image, index) in selectedImages" :src="image" :key="index" class="preview-img" />
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="newpost-box mt-4">
            <h4 class="box-title">Liên hệ</h4>
            <div class="form-layout contact-section">
              <div class="form-group">
                <label>Tên <span>*</span></label>
                <input v-model="ContactName" spellcheck="false" class="form-control text-box single-line"
                  data-val="true" data-val-required="Vui lòng nhập tên liên hệ" id="ContactName" name="ContactName"
                  type="text">
                <span class="field-validation-valid text-danger" data-valmsg-for="ContactName"
                  data-valmsg-replace="true"></span>
              </div>
              <div class="form-group">
                <label>Số điện thoại <span>*</span></label>

                <input v-model="ContactMobile" spellcheck="false" class="form-control text-box single-line"
                  data-val="true" data-val-required="Vui lòng nhập số điện thoại" inputmode="decimal" maxlength="10"
                  numbersonly="true" type="text">
                <span class="field-validation-valid text-danger" data-valmsg-for="ContactMobile"
                  data-valmsg-replace="true"></span>

              </div>
              <div class="form-group">
                <label>Zalo</label>

                <input value="" v-model="ContactPhone" spellcheck="false" class="form-control text-box single-line"
                  id="ContactPhone" inputmode="decimal" maxlength="10" name="ContactPhone" numbersonly="true"
                  type="text">
              </div>
            </div>
          </div>

        </div>

        <div class="modal-footer">
          <button type="button" @click="submitUpdate" class="btn btn-primary bg-green w-100">Cập nhật

          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Overlay mờ phía sau modal -->
  <div class="modal-backdrop fade show"></div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.min.css';
  import '@/assets/css/room-category.css';
  import '@/assets/css/app.css';
  import {
    mapGetters
  } from 'vuex';
  import {
    postUpdate
  } from '@/services/api'; // Import hàm gọi API từ api.js


  export default {
    name: 'PostUpdateModal',
    emits: ['close-modal'],
    props: {
      selectedPost: {
        type: Object, // Kiểu dữ liệu của prop
        required: true, // Bắt buộc phải truyền prop này
      },
    },
    computed: {
      ...mapGetters(['getUserProfile']),
    },
    data() {
      return {
        isInitialLoad: true,
        isBlogPostModal: false,
        selectedImages: [], // Khai báo mảng lưu trữ ảnh đã chọn
        CategoryId: '', // Đảm bảo rằng thuộc tính này đã được khai báo
        Title: '',
        Price: '',
        Detail: '',
        ContactName: '',
        ContactMobile: '',
        ContactPhone: '',
        streetName: '',
        exactAddress: '',
        Area: '',
        errors: {},
        provinces: [],
        districts: [],
        wards: [],
        streets: [],
        selectedProvince: '',
        selectedDistrict: '',
        selectedWard: '',
        selectedStreet: '',
        selectedProvinceName: '',
        selectedDistrictName: '',
        selectedWardName: '',
        localPost: { ...this.selectedPost }, // Bản sao của selectedPost
      };
    },
    methods: {
      closeModal() {
        this.$emit('close-modal');
      },
      handleCategoryChange() {
        if (['news', 'owner-review', 'experience-sharing'].includes(this.CategoryId)) {
          this.isBlogPostModal = true;
        }
      },
      closeBlogPostModal(postType) {
        this.isBlogPostModal = false;
        this.CategoryId = postType;
      },
      async fetchProvinces() {
        try {
          const response = await fetch('https://esgoo.net/api-tinhthanh/1/0.htm');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();

          // Access the provinces from the response
          if (data.error === 0) {
            this.provinces = data.data; // Set the provinces data
          } else {
            console.error(data.error_text);
            alert('Could not load provinces: ' + data.error_text);
          }
        } catch (error) {
          console.error('Failed to fetch provinces:', error);
          alert('Could not load provinces. Please check your network connection or API URL.');
        }
      },

      async fetchDistricts() {
        if (!this.selectedProvince) return; // Prevent fetching if no province is selected
        try {
          const url = `https://esgoo.net/api-tinhthanh/2/${this.selectedProvince}.htm`;
          const response = await fetch(url);

          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

          const data = await response.json();

          // Assuming the districts are in data.data
          this.districts = data.data; // Set the districts from API response
          this.selectedDistrict = ''; // Reset district selection
          this.wards = []; // Reset wards
          this.selectedWard = ''; // Reset ward selection
        } catch (error) {
          console.error('Failed to fetch districts:', error);
          alert('Could not load districts. Please check your network connection or API URL.');
        }
      },


      async fetchWards() {
        if (!this.selectedDistrict) return; // Prevent fetching if no district is selected
        try {
          const url = `https://esgoo.net/api-tinhthanh/3/${this.selectedDistrict}.htm`;
          const response = await fetch(url);
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          const data = await response.json();
          console.log("wward: ", data)
          // Assuming the districts are in data.data
          this.wards = data.data; // Set the districts from API response
          this.selectedWard = ''; // Reset district selection
          this.streets = []; // Reset wards
          this.selectedStreet = ''; // Reset ward selection
        } catch (error) {
          console.error('Failed to fetch wards:', error);
          alert('Could not load wards. Please check your network connection or API URL.');
        }
      },

      onProvinceChange() {
        this.fetchDistricts(); // Call to fetch districts based on selected province
        console.log("selecttedPro: ", this.selectedProvince)

      },

      triggerFileInput() {
        this.$refs.fileInput.click(); // Trigger the hidden file input
      },

      // Handle file selection and store the selected images
      handleFileUpload(event) {
        const files = event.target.files; // Lấy các file đã chọn
        if (files.length) {
          this.selectedImages = []; // Xóa các ảnh đã chọn trước đó

          // Lưu trữ URL của ảnh để hiển thị
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const imageUrl = URL.createObjectURL(file); // Tạo URL từ file ảnh
            this.selectedImages.push(imageUrl); // Lưu URL thay vì lưu trực tiếp File object
          }
        }
      },
      validateForm() {
        this.errors = {}; // Clear previous errors

        // Validate CategoryId
        if (!this.CategoryId) {
          alert("Vui lòng nhập chuyên mục");
          return;
        }

        // Validate Title
        if (!this.Title) {
          alert("Vui lòng nhập tiêu đề");
          return;
        }

        // Validate Province
        if (!this.selectedProvince) {
          this.errors.ProvinceId = 'Vui lòng chọn tỉnh/thành phố';
          alert("Vui lòng nhập  tỉnh/thành phố");
          return;

        }

        // Validate District
        if (!this.selectedDistrict) {
          this.errors.DistrictId = 'Vui lòng chọn quận/huyện';
          alert("Vui lòng nhập quận/huyện");
          return;

        }
        // Validate Ward
        if (!this.selectedWard) {
          this.errors.WardId = 'Vui lòng chọn phường/xã';
          alert("Vui lòng nhập phường/xã");
          return;

        }
        // Validate Address
        if (!this.streetName) {
          this.errors.StreetId = 'Vui lòng chọn đường phố';
          alert("Vui lòng nhập đường phố");
          return;

        }

        // Validate exactAdress
        if (!this.exactAddress) {
          this.errors.exactAddressId = 'Vui lòng chọn địa chỉ chính xác';
          alert("Vui lòng nhập địa chỉ chính xác");
          return;

        }

        // Validate detail
        if (!this.Detail) {
          this.errors.DetailId = 'Vui lòng nhập mô tả';
          alert("Vui lòng nhập mô tả");
          return;

        }

        // Validate Price
        if (!this.Price || isNaN(this.Price)) {
          this.errors.Price = 'Vui lòng nhập giá hợp lệ';
          alert("Vui lòng nhập nhập giá hợp lệ");
          return;
        }

        // Validate Area
        if (!this.Area || isNaN(this.Area)) {
          this.errors.Area = 'Vui lòng nhập diện tích hợp lệ';
          alert("Vui lòng nhập nhập diện tích hợp lệ");
          return;
        }

        // Validate ContactName
        if (!this.ContactName) {
          this.errors.ContactName = 'Vui lòng nhập tên liên hệ';
          alert("Vui lòng nhập tên liên hệ");
          return;
        }

        // Validate ContactMobile
        if (!this.ContactMobile || isNaN(this.ContactMobile)) {
          this.errors.ContactMobile = 'Vui lòng nhập số điện thoại hợp lệ';
          alert("Vui lòng nhập số điện thoại hợp lệ");
          return;
        }
        // Validate ContactMobile
        if (!this.ContactPhone || isNaN(this.ContactPhone)) {
          this.errors.ContactMobile = 'Vui lòng nhập số điện thoại hợp lệ';
          alert("Vui lòng nhập số điện thoại hợp lệ");
          return;
        }

        // Return whether the form is valid
        return Object.keys(this.errors).length === 0;
      },


      async submitUpdate() {
        // Validate form
        if (!this.validateForm()) {
          return;
        }
        const user = this.getUserProfile; // Get user data from localStorage
        const userId = user ? user._id : null; // Get user ID
        const formData = new FormData();

        // Đưa ảnh gốc vào formData
        for (let i = 0; i < this.selectedImages.length; i++) {
          const file = await blobToFile(this.selectedImages[i], `image-${i}.jpg`);
          formData.append('images', file);
        }
        // Add other fields to formData
        formData.append('category', this.CategoryId);
        formData.append('title', this.Title);
        formData.append('provinceId', this.selectedProvince);
        formData.append('districtId', this.selectedDistrict);
        formData.append('wardId', this.selectedWard);
        formData.append('street', this.streetName);
        formData.append('exactAddress', this.exactAddress);
        formData.append('price', this.Price);
        formData.append('area', this.Area);
        formData.append('details', this.Detail);
        formData.append('contactName', this.ContactName);
        formData.append('contactMobile', this.ContactMobile);
        formData.append('userId', userId);

        try {
          // Gửi formData tới server
          console.log("category: ", this.CategoryId)
          const response = await postUpdate(formData, this.selectedPost._id);
          if (response.data) {
            // Xử lý phản hồi thành công
            alert('Bài đăng đã được update thành công!');
          }
        } catch (error) {
          console.error('Error:', error);
          alert(error.response ? error.response.data.message : 'Đã xảy ra lỗi, vui lòng thử lại.');
        }finally{
          this.closeModal(); // Đóng modal nếu gửi thành công
          window.location.href = this.$route.fullPath;
        }
        async function blobToFile(blobUrl, fileName) {
          const response = await fetch(blobUrl);
          const blob = await response.blob();
          return new File([blob], fileName, {
            type: blob.type
          });
        }
      },
      async assignAddress() {
  try {
    // Bước 1: Lấy danh sách tỉnh
    await this.fetchProvinces();
    this.selectedProvince = this.selectedPost.province.id;

    // Bước 2: Lấy danh sách quận/huyện dựa trên tỉnh đã chọn
    const districtUrl = `https://esgoo.net/api-tinhthanh/2/${this.selectedProvince}.htm`;
    const districtResponse = await fetch(districtUrl);

    if (!districtResponse.ok) {
      throw new Error(`Failed to fetch districts. Status: ${districtResponse.status}`);
    }

    const districtData = await districtResponse.json();
    this.districts = districtData.data;

    // Gán quận/huyện được chọn từ bài viết
    this.selectedDistrict = this.selectedPost.district.id;

    // Bước 3: Lấy danh sách xã/phường dựa trên quận/huyện đã chọn
    const wardUrl = `https://esgoo.net/api-tinhthanh/3/${this.selectedDistrict}.htm`;
    const wardResponse = await fetch(wardUrl);

    if (!wardResponse.ok) {
      throw new Error(`Failed to fetch wards. Status: ${wardResponse.status}`);
    }

    const wardData = await wardResponse.json();
    this.wards = wardData.data;

    // Gán xã/phường được chọn từ bài viết
    this.selectedWard = this.selectedPost.ward.id;
    this.isInitialLoad = false

    console.log('Address data assigned successfully!');
  } catch (error) {
    console.error('Error in assignAddress:', error.message);
  }
}



    },
    watch: {
      selectedProvince() {
        if (!this.isInitialLoad) {
          this.fetchDistricts();
        }
      },
      selectedDistrict() {
        if (!this.isInitialLoad) {
          console.log("byhvt")
          this.fetchWards();
        }
      },
      selectedPost: {
        immediate: true,
        handler(newValue) {
          this.localPost = { ...newValue }; // Đồng bộ khi selectedPost thay đổi
        },
      },
    },


    mounted() {
      this.assignAddress();
      // Lấy thông tin user từ localStorage
      const user = this.getUserProfile

      if (user && user.fullName) {
        // Gán fullName vào ContactName
        this.ContactName = user.fullName;
      }
      // this.CategoryId = this.selectedPost._id;
      this.Title = this.selectedPost.title;
      this.streetName = this.selectedPost.street;
      this.exactAddress = this.selectedPost.exactAddress;
      this.Price = this.selectedPost.price;
      this.Area = this.selectedPost.area;
      this.Detail = this.selectedPost.details;
      this.ContactName = this.selectedPost.contactName;
      this.ContactMobile = this.selectedPost.contactMobile;
      this.ContactPhone = this.selectedPost.contactMobile;
      this.selectedImages = this.selectedPost.images
  },


  };
</script>