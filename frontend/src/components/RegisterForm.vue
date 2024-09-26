<template>
  <div id="main-wrapper" class="oxyy-login-register">
    <div class="hero-wrap">
      <div class="hero-mask opacity-8 bg-dark"></div>
      <div class="hero-bg hero-bg-scroll" :style="{ backgroundImage: `url(${require('@/assets/images/login-bg-4.jpg')})` }"></div>

      <div class="hero-content w-100">
        <div class="container">
          <div class="row g-0">
            <div class="col-lg-11 col-xl-9 mx-auto">
              <div class="row g-0 min-vh-100">
                <!-- Welcome Text -->
                <div class="col-md-6 px-0">
                  <div class="hero-wrap h-100">
                    <div class="hero-mask opacity-5 bg-primary"></div>
                    <div class="hero-bg hero-bg-scroll" :style="{ backgroundImage: `url(${require('@/assets/images/nha-tro-gac-lung-1-1.jpg')})` }"></div>

                    <div class="hero-content w-100 min-vh-100 d-flex flex-column">
                      <div class="row g-0">
                        <div class="col-10 col-lg-9 mx-auto">
                          <div class="logo mt-5 mb-5 mb-md-0">
                            <a class="d-flex" href="index.html" title="RoomFinder">
                              <img src="@/assets/images/logo_white.svg" alt="RoomFinder" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class="row g-0 my-auto">
                        <div class="col-10 col-lg-9 mx-auto">
                          <h1 class="text-10 text-white fw-700 text-uppercase mb-4">
                            Kết nối với mạng lưới tìm phòng trọ lớn nhất
                          </h1>
                          <p class="text-white fw-350 lh-base mb-5">
                            Gia nhập cộng đồng của chúng tôi chỉ trong vài phút! Đăng ký thông tin của bạn để tìm phòng trọ ngay hôm nay.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Welcome Text End -->

                <!-- Register Form -->
                <div class="col-md-6 px-0 d-flex flex-column bg-light shadow-lg">
                  <div class="my-auto py-5">
                    <div class="row g-0">
                      <div class="col-10 col-lg-9 mx-auto">
                        <h3 class="text-6 fw-600">Đăng ký</h3>
                        <p class="text-2 mb-5">Đã có tài khoản? <a href="/login">Đăng nhập</a></p>
                        <form @submit.prevent="handleSubmit" class="form-border">
                          <div class="icon-group icon-group-end mb-3">
                            <input type="text" class="form-control border-dark" v-model="fullName" required placeholder="Họ tên" />
                            <span class="icon-inside"><i class="fas fa-user"></i></span>
                          </div>
                          <div class="icon-group icon-group-end mb-3">
                            <input type="text" class="form-control border-dark" v-model="username" required placeholder="Tên tài khoản" />
                            <span class="icon-inside"><i class="fas fa-user-circle"></i></span>
                          </div>
                          <div class="icon-group icon-group-end mb-3">
                            <input type="email" class="form-control border-dark" v-model="email" required placeholder="Địa chỉ email" />
                            <span class="icon-inside"><i class="fas fa-envelope"></i></span>
                          </div>
                          <div class="icon-group icon-group-end mb-3">
                            <input type="password" class="form-control border-dark" v-model="password" required placeholder="Mật khẩu" />
                            <span class="icon-inside"><i class="fas fa-lock"></i></span>
                          </div>
                          <div class="form-check mt-4">
                            <input id="agree" v-model="agree" class="form-check-input border-dark rounded-0" type="checkbox" />
                            <label class="form-check-label" for="agree">Tôi đồng ý với <a href="#">điều khoản</a> và <a href="#">dịch vụ</a>.</label>
                          </div>
                          <button class="btn btn-primary rounded-0 my-4" type="submit">Tạo tài khoản</button>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div class="pt-2 pb-3">
                    <div class="row">
                      <div class="col-10 col-lg-9 mx-auto">
                        <p class="text-2 text-muted mb-0">Copyright © 2024 <a href="#">RoomFinder</a></p>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Register Form End -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullName: '',
      username: '',
      email: '',
      password: '',
      agree: false,
    };
  },
  methods: {
    handleSubmit() {
      // Xử lý logic đăng ký
      console.log('Đăng ký:', this.fullName, this.username, this.email, this.password);
    },
  },
};
</script>

<style>
/* Nhập các style tùy chỉnh ở đây hoặc import CSS từ các file khác */
@import "@/assets/css/stylesheet.css";
</style>
