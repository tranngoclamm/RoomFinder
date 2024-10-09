<!-- PostNewModal.vue -->
<template>
    <div @click.self="closeModal" class="modal fade show" style="display: block;" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-scrollable" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Đăng tin</h5>
              <button type="button" class="close" @click="closeModal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">   
                  <div class="newpost-box mt-2">
                    <div class="form-layout detail-section">
                        <div class="form-group detail-section-category w-100">
                            <label>Chuyên mục cho thuê <span>*</span></label>
                            <select v-model="CategoryId" class="form-select" id="ddlPostCate" name="CategoryId" data-val="true" data-val-required="Vui lòng chọn chuyên mục">
                                <option value="" disabled="" selected="">Chọn chuyên mục</option>
                            <option value="room">Cho thuê phòng trọ</option><option value="apartment">Cho thuê căn hộ</option><option value="house">Cho thuê nhà</option><option value="find-roommate">Tìm người ở ghép</option></select>
                            <span class="field-validation-valid text-danger" v-if="errors.CategoryId">{{ errors.CategoryId }}</span>
                          </div>

                        <div class="form-group w-100 has-count js-count-title">
                          <label><div>Tiêu đề <span>*</span> </div></label>
                          <input v-model="Title" spellcheck="false" class="form-control text-box single-line" data-val="true" data-val-maxlength="Tiêu đề tin tối đa là 150 ký tự" data-val-maxlength-max="150" data-val-required="Vui lòng nhập tiêu đề tin" id="Title" maxlength="150" name="Title" type="text" value="">                            
                          <span class="field-validation-valid text-danger" data-valmsg-for="Title" data-valmsg-replace="true"></span>
                      </div>
                      <div class="form-group">
                        <label>Tỉnh/thành phố <span>*</span></label>
                        <select v-model="selectedProvince" @change="onProvinceChange" class="form-select select_city">
                          <option value="">Chọn tỉnh/ Tp</option>
                          <option v-for="province in provinces" :key="province.id" :value="province">
                            {{ province.full_name }}
                          </option>
                        </select>
                      </div>
                      
                      <div class="form-group">
                        <label>Quận/huyện <span>*</span></label>
                        <select v-model="selectedDistrict" class="form-select select_district">
                          <option value="">-- Quận/huyện --</option>
                          <option v-for="district in districts" :key="district.id" :value="district">
                            {{ district.full_name }}
                          </option>
                        </select>
                      </div>
                      
                      
                      <div class="form-group">
                        <label>Phường/xã</label>
                        <select v-model="selectedWard" class="form-select select_ward">
                          <option value="">-- Phường/xã --</option>
                          <option v-for="ward in wards" :key="ward.id" :value="ward">{{ ward.full_name }}</option>
                        </select>
                      </div>
                      
                      <div class="form-group">
                        <label>Đường/phố</label>
                        <input v-model="streetName" spellcheck="false" class="form-control" placeholder="Nhập tên đường" type="text">
                      </div>
                      
                      
                        <div class="form-group w-100">
                          <label>Địa chỉ chính xác</label>
                          <input v-model="exactAddress" spellcheck="false" class="form-control" placeholder="Địa chỉ chính xác" type="text">
                        </div>
                      
                        <div class="form-group detail-section-price">
                            <label>Giá<span>*</span> <span id="lblPrice" style="font-size:13px;"></span></label>
                            <input v-model="Price" class="form-control text-box single-line" data-val="true" data-val-number="Giá nhập không đúng" data-val-required="Vui lòng nhập giá" decimal="true" maxlength="6"  placeholder="Nhập giá (triệu đồng)" type="text" value="">
                          </div>
                        <div class="form-group detail-section-area">
                            <label>Diện tích</label>
                            <input v-model="Area" class="form-control text-box single-line" data-val="true" data-val-number="Diện tích nhập không đúng" data-val-required="Vui lòng nhập diện tích" decimal="true" id="Area" maxlength="6" name="Area" numbersonly="true" placeholder="Nhập diện tích (m2)" type="text" value="">
                        </div>
                    </div>
                </div>
                <div class="newpost-box mt-4">
                  <div class="form-layout detail-section">

                      <div class="form-group w-100 has-count js-count-desc">
                          <label>
                              <div>Mô tả <span>*</span></div>
                          </label>
                          <textarea v-model="Detail" spellcheck="false" class="form-control desc-field" cols="20" data-val="true" data-val-required="Vui lòng nhập nội dung" id="Detail" maxlength="5000" name="Detail" rows="2"></textarea>
                          <span class="field-validation-valid text-danger" data-valmsg-for="Detail" data-valmsg-replace="true"></span>
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
                        <input class="file-input" type="file" name="file" ref="fileInput" hidden multiple @change="handleFileUpload">
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
                            <input v-model="ContactName" spellcheck="false" class="form-control text-box single-line" data-val="true" data-val-required="Vui lòng nhập tên liên hệ" id="ContactName" name="ContactName" type="text">
                            <span class="field-validation-valid text-danger" data-valmsg-for="ContactName" data-valmsg-replace="true"></span>
                        </div>
                        <div class="form-group">
                            <label>Số điện thoại <span>*</span></label>
                            
                            <input v-model="ContactMobile" spellcheck="false" class="form-control text-box single-line" data-val="true" data-val-required="Vui lòng nhập số điện thoại" inputmode="decimal" maxlength="10" numbersonly="true" type="text">
                            <span class="field-validation-valid text-danger" data-valmsg-for="ContactMobile" data-valmsg-replace="true"></span>
          
                        </div>
                        <div class="form-group">
                            <label>Zalo</label>
                            
                            <input value="" v-model="ContactPhone" spellcheck="false" class="form-control text-box single-line" id="ContactPhone" inputmode="decimal" maxlength="10" name="ContactPhone" numbersonly="true" type="text">
                        </div>
                    </div>
                </div>

            </div>

            <div class="modal-footer">
              <button type="button" @click="submitPost" class="btn btn-primary w-100">Đăng tin</button>
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
  import { postNew } from '@/services/api'; // Import hàm gọi API từ api.js


  export default {
  name: 'PostNewModal',
  emits: ['close-modal'],
  data() {
    return {
      selectedImages: [],  // Khai báo mảng lưu trữ ảnh đã chọn
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
      };
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
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

      // Validate Price
      if (!this.Price || isNaN(this.Price)) {
        this.errors.Price = 'Vui lòng nhập giá hợp lệ';
        alert("Vui lòng nhập nhập giá hợp lệ");
        return;
      }

      // Validate ContactName
      if (!this.ContactName) {
        this.errors.ContactName = 'Vui lòng nhập tên liên hệ';
        alert("Vui lòng nhập tên liên hệ");
        return;
      }

      // Validate ContactMobile
      if (!this.ContactMobile) {
        this.errors.ContactMobile = 'Vui lòng nhập số điện thoại hợp lệ';
        alert("Vui lòng nhập số điện thoại hợp lệ");
        return;
      }

      // Return whether the form is valid
      return Object.keys(this.errors).length === 0;
    },

    async submitPost() {
  // Validate form
  if (!this.validateForm()) {
    return;
  }
  const user = JSON.parse(localStorage.getItem('user')); // Get user data from localStorage
    const userId = user ? user._id : null; // Get user ID
 
  const formData = new FormData();

  // Add images to formData
  this.selectedImages.forEach((image) => {
    formData.append('images', image); // Append each selected image
  });

  // Add other fields to formData
  formData.append('category', this.CategoryId);
  formData.append('title', this.Title);
  formData.append('provinceId', this.selectedProvince.id);
  formData.append('districtId', this.selectedDistrict.id);
  formData.append('wardId', this.selectedWard.id);
  formData.append('street', this.streetName);
  formData.append('exactAddress', this.exactAddress);
  formData.append('price', this.Price);
  formData.append('area', this.Area);
  formData.append('details', this.Detail);
  formData.append('contactName', this.ContactName);
  formData.append('contactMobile', this.ContactMobile);
  formData.append('userId', userId);
  console.log("data",this.selectedProvince.id);
  console.log("data2",this.selectedDistrict.id);
  console.log("data3",this.selectedWard.id);

  // Send the formData to the server
  const response = await postNew(formData);

  try {
    if (response && response.data) {
      this.closeModal();
    }
  } catch (error) {
    console.error('Error:', error);
    alert(error.response ? error.response.data.message : 'Đã xảy ra lỗi, vui lòng thử lại.');
  }
},


    async fetchDistricts() {
      if (!this.selectedProvince) return; // Prevent fetching if no province is selected
      try {
        const url = `https://esgoo.net/api-tinhthanh/2/${this.selectedProvince.id}.htm`;
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
        const url = `https://esgoo.net/api-tinhthanh/3/${this.selectedDistrict.id}.htm`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
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

    },

    triggerFileInput() {
      this.$refs.fileInput.click(); // Trigger the hidden file input
    },

    // Handle file selection and store the selected images
    handleFileUpload(event) {
      const files = event.target.files; // Get selected files
      if (files.length) {
        // Clear previously selected images
        this.selectedImages = [];

        // Loop through the selected files and create a preview
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const reader = new FileReader();

          reader.onload = (e) => {
            // Push the image data URL to selectedImages array
            this.selectedImages.push(e.target.result);
          };

          reader.readAsDataURL(file); // Convert file to Data URL
        }
      }
    },

  },
  watch: {
    selectedProvince() {
        // eslint-disable-next-line no-unused-vars
        this.fetchDistricts();
    },
    selectedDistrict() {
        // eslint-disable-next-line no-unused-vars
        this.fetchWards();
    },
    },


  mounted() {
    this.fetchProvinces();
    // Lấy thông tin user từ localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.fullName) {
      // Gán fullName vào ContactName
      this.ContactName = user.fullName;
    }
  },


};

</script>

  
