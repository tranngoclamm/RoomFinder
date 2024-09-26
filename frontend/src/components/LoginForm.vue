<template> 
  <div id="main-wrapper" class="oxyy-login-register"> 
    <div class="hero-wrap">
      <div class="hero-mask opacity-8 bg-dark"></div>
      <div class="hero-bg hero-bg-scroll" :style="{ backgroundImage: `url(${require('@/assets/images/login-bg-4.jpg')})` }"></div>

      <div class="hero-content w-100">
        <div class="container">
          <div class="row g-0 min-vh-100 py-4 py-md-5">
            <!-- Welcome Text -->
            <div class="col-lg-7 px-0 bg-primary" :style="{ backgroundImage: 'url(@/assets/images/login-bg-4.jpg)' }">
              <div class="hero-wrap d-flex align-items-center rounded-3 rounded-end-0 h-100">
                <div class="hero-mask opacity-2 bg-primary"></div>
                <div class="hero-bg hero-bg-scroll" :style="{ backgroundImage: `url(${require('@/assets/images/anh-13-mau-nha-tro-dep.jpg')})` }"></div>

                <div class="hero-content mx-auto w-100 h-100 d-flex flex-column">
                  <div class="row g-0">
                    <div class="col-12 col-lg-12 ms-5">
                      <div class="mt-4 mb-2 mb-lg-0">
                        <a href="index.html" title="RoomFinder">
                          <img src="@/assets/images/logo_white.svg" alt="Oxyy" style="height: 55px;" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="row g-0 my-auto">
                    <div class="col-11 col-lg-10 mx-auto">
                      <h1 class="text-11 text-white mb-3">Chào mừng bạn!</h1>
                      <p class="text-5 text-white lh-base mb-4">
                        Đăng nhập để đăng bài, xem danh sách yêu thích và hơn thế nữa.
                      </p>
                      <a class="btn btn-dark rounded-pill shadow-none video-btn py-1 px-3 d-inline-flex align-items-center mb-5" href="#" data-bs-toggle="modal" data-bs-target="#videoModal">
                        <span class="me-2 text-7"><i class="fas fa-play-circle"></i></span>Watch demo
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Welcome Text End -->

            <!-- Login Form -->
            <div data-bs-theme="dark" class="col-lg-5 px-0 shadow-lg d-flex align-items-center rounded-3 rounded-start-0 bg-dark">
              <div class="container my-auto py-5">
                <div class="row">
                  <div class="col-11 col-lg-10 mx-auto">
                    <h3 class="text-white text-center mb-4">Đăng nhập</h3>
                    <form @submit.prevent="login">
                      <div class="mb-3">
                        <label class="form-label text-light" for="account">Tài khoản</label>
                        <input v-model="account" type="text" class="form-control" id="account" required placeholder="Nhập tài khoản" />
                      </div>
                      <div class="mb-3">
                        <label class="form-label text-light" for="password">Mật khẩu</label>
                        <input v-model="password" type="password" class="form-control" id="password" required placeholder="Nhập mật khẩu" />
                      </div>
                      <div class="row mt-4">
                        <div class="col">
                          <div class="form-check text-2">
                            <input id="remember-me" name="remember" class="form-check-input" type="checkbox" />
                            <label class="form-check-label text-light" for="remember-me">Ghi nhớ đăng nhập</label>
                          </div>
                        </div>
                        <div class="col-sm text-2 text-end">
                          <a href="forgot-password-2.html">Quên mật khẩu ?</a>
                        </div>
                      </div>
                      <div class="d-grid my-4">
                        <button class="btn btn-primary" type="submit">Đăng nhập</button>
                      </div>
                    </form>
                    <div class="d-flex align-items-center my-3">
                      <hr class="flex-grow-1 border-secondary" />
                      <span class="mx-2 text-2 text-white-50">Hoặc</span>
                      <hr class="flex-grow-1 border-secondary" />
                    </div>
                    <div class="d-flex flex-column align-items-center mb-4">
                      <button class="d-flex align-items-center justify-content-center w-100 login-register btn login-google">
                        <span class="social-logo-wrapper pt-1">
                          <img class="social-logo" src="@/assets/images/google-logo.svg" alt="Logo Google" />
                        </span>
                        <span class="social-text ms-2">Tiếp tục với Google</span>
                      </button>
                    </div>
                    <p class="text-2 text-center text-light mb-0">Chưa có tài khoản? <a href="/register">Đăng ký</a></p>
                  </div>
                </div>
              </div>
            </div>
            <!-- Login Form End -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@/assets/css/app.css'; // Nhúng file CSS
import '@/assets/css/stylesheet.css'; // Nhúng file CSS

export default {
  data() {
    return {
      account: '',
      password: '',
    };
  },
  methods: {
    login() {
      // Thực hiện logic đăng nhập
      console.log('Logging in:', this.account, this.password);
      // Reset form sau khi đăng nhập
      this.account = '';
      this.password = '';
    },
  },
};
</script>
