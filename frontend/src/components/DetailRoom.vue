<template>
    <div data-v-99bc96fa="" class="modal-mask" @click.self="close">
      <div data-v-99bc96fa="" class="modal-page col-sm-8 col-md-12 col-lg-9 col-12">
        <div data-v-99bc96fa="" class="close" @click="close"></div>
        <div data-v-524c0c0c="" data-v-99bc96fa="">
          <div data-v-524c0c0c="" class="contacte">
            <div data-v-524c0c0c="" class="contacte__wrap">
              <div data-v-524c0c0c="" id="cmap" class="map image-room">
                <ImageCarousel :images="apartment.images" /> <!-- Giả sử apartment.images là một mảng hình ảnh -->
              </div>
              <p hidden>{{ apartment._id }}</p>
              <div data-v-524c0c0c="" class="info">
                <div data-v-524c0c0c="" class="row mt-4">
                  <div data-v-524c0c0c="" class="col-6 text-right">
                    <span data-v-524c0c0c="" class="info__menu">Địa chỉ</span>
                  </div>
                  <div data-v-524c0c0c="" class="col-6 text-left">
                    <span data-v-524c0c0c="" class="info__menu active">THÔNG TIN</span>
                  </div>
                </div>
                <div data-v-524c0c0c="" class="info__details">
                  <div data-v-524c0c0c="" class="info__details__list" @click="close">
                    <h6 data-v-524c0c0c="">Tiêu đề:</h6>
                    <p data-v-524c0c0c="" style="height:60px">{{ apartment.title }}</p> <!-- Sử dụng giá trị động từ apartment -->
                  </div>
                  <div data-v-524c0c0c="" class="info__details__list">
                    <h6 data-v-524c0c0c="">Địa chỉ</h6>
                    <p data-v-524c0c0c="" style="height:40px">
                      {{ apartment.exactAddress && apartment.exactAddress ? apartment.exactAddress + ',' : '' }}
                      {{ apartment.street && apartment.street ? apartment.street + ',' : '' }}
                      {{ apartment.ward && apartment.ward.full_name ? apartment.ward.full_name + ',' : '' }}
                      {{ apartment.district && apartment.district.full_name ? apartment.district.full_name + ',' : '' }}
                      {{ apartment.province && apartment.province.full_name ? apartment.province.full_name : '' }}
                    </p> <!-- Sử dụng giá trị động từ apartment -->
                  </div>
                  <div data-v-524c0c0c="" class="info__details__list row">
                    <div class="col-6 d-flex">
                      <h6 data-v-524c0c0c="" class="m-0">Giá:</h6>
                      <p class="p-0 ms-2" data-v-524c0c0c="">{{ apartment.price }}tr/ tháng</p> <!-- Sử dụng giá trị động từ apartment -->
                    </div>
                    <div class="col-6 d-flex align-items-center">
                      <h6 data-v-524c0c0c="" class="m-0">Diện tích:</h6>
                      <p class="ms-2 mb-0">{{ apartment.area }}m2</p> <!-- Sử dụng giá trị động từ apartment -->
                    </div>
                  </div>
                  <div data-v-524c0c0c="" class="info__details__list">
                    <h6 data-v-524c0c0c="">Mô tả</h6>
                    <p data-v-524c0c0c="" style="min-height:100px">{{ apartment.details }}</p> <!-- Sử dụng giá trị động từ apartment -->
                  </div>
                  <div data-v-524c0c0c="" class="info__details__list d-flex align-items-center position-relative">
                    <h6 data-v-524c0c0c="" class="m-0">Liên hệ: {{ apartment.contactName }}</h6> <!-- Sử dụng giá trị động từ apartment -->
                    <p class="m-0 ps-2"> (+{{ apartment.contactMobile }})</p> <!-- Sử dụng giá trị động từ apartment -->
                    <div data-v-524c0c0c="" style="right: -8%" class="position-absolute top-50 translate-middle hover list-inline info__details__social d-flex align-items-center">
                      <a data-v-524c0c0c="" class="list-inline-item">
                        <p data-v-524c0c0c="" href="https://www.facebook.com/rentroom.md/" target="_blank">Đặt cọc</p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ImageCarousel from './ImageCarousel.vue'; // Import component carousel
  
  export default {
    props: {
      apartment: {
        type: Object,
        required: true,
      },
    },
    methods: {
      close() {
        this.$emit('close-modal');
      },
    },
    components: {
      ImageCarousel, // Đăng ký component
    },
  };
  </script>
  