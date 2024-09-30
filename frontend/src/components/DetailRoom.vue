<template>
    <div data-v-99bc96fa="" class="modal-mask" @click.self="close">
        <div data-v-99bc96fa="" class="modal-page col-sm-8 col-md-12 col-lg-9 col-12">
            <div data-v-99bc96fa="" class="close"  @click="close"></div>
            <div data-v-524c0c0c="" data-v-99bc96fa="">
                <div data-v-524c0c0c="" class="contacte">
                    <div data-v-524c0c0c="" class="contacte__wrap">
                        <div data-v-524c0c0c="" id="cmap" class="map image-room">
                            
                            <ImageCarousel />
                        
                        </div>
                <div data-v-524c0c0c="" class="info">
                    <div data-v-524c0c0c="" class="row  mt-4">
                        <div data-v-524c0c0c="" class="col-6 text-right"><span data-v-524c0c0c="" class="info__menu">Địa chỉ</span></div>
                        <div data-v-524c0c0c="" class="col-6 text-left"><span data-v-524c0c0c="" class="info__menu active">THÔNG TIN</span></div>
                    </div>
                    <div data-v-524c0c0c="" class="info__details">
                        <div data-v-524c0c0c="" class="info__details__list " @click="close">
                            <h6 data-v-524c0c0c="">Tiêu đề:</h6>
                            <p data-v-524c0c0c="">
                                Gấp: nhà cho thuê tại phường Trường Thọ, 14tr/tháng, 1 Trệt 2 Lầu, 4PN, 4WC, đường oto vào tận nơi, cách Đặng Văn Bi chỉ 500m
                            </p>
                        </div>
                        <div data-v-524c0c0c="" class="info__details__list">
                            <h6 data-v-524c0c0c="">Địa chỉ</h6>
                            <p data-v-524c0c0c="">1632/11/16 Đường Huỳnh Tấn Phát, Thị trấn Nhà Bè, Nhà Bè, Hồ Chí Minh </p>
                        </div>
                        <div data-v-524c0c0c="" class="info__details__list row">
                            <div class="col-6 d-flex">
                                <h6 data-v-524c0c0c="" class="m-0">Giá:</h6>
                                <p class="p-0 ms-2" data-v-524c0c0c="">2,500,000đ</p>
                            </div>
                            <div class="col-6 d-flex align-items-center">
                                <h6 data-v-524c0c0c="" class="m-0">Diện tích: </h6>
                                <p data-v-524c0c0c="" class="ms-2">25m2</p>
                            </div>

                        </div>
                        <div data-v-524c0c0c="" class="info__details__list">
                            <h6 data-v-524c0c0c="">Mô tả</h6>
                            <p data-v-524c0c0c="">1632/11/16 Đường Huỳnh Tấn Phát, Thị trấn Nhà Bè, Nhà Bè, Hồ Chí Minh tại phường Trường Thọ, 14tr/tháng, 1 Trệt 2 Lầu, 4PN, 4WC, đường oto vào tận nơi, cách Đặng Văn Bi chỉ 500m</p>
                        </div>
                        <div data-v-524c0c0c="" class="info__details__list d-flex align-items-center">
                            <h6 data-v-524c0c0c="" class="m-0">Liên hệ: Trần Thị Thùy </h6>
                            <p class="m-0 ps-2"> (+0377 683 1352)</p>
                            <div data-v-524c0c0c="" class="list-inline info__details__social d-flex align-items-center">
                                <a data-v-524c0c0c="" class="list-inline-item">
                                    <p data-v-524c0c0c="" href="https://www.facebook.com/rentroom.md/" target="_blank">Zalo</p>
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
      apartment: Object
    },
    methods: {
      close() {
        this.$emit('close-modal');
      }
    },
    components: {
    ImageCarousel, // Đăng ký component
  },
  };
  </script>
  
  