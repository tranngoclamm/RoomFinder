<template>
         <!-- footer -->
      <footer class="footer1 w-100">
          <div class="footer-area">
              <div class="container">
                  <div class="row">
                      <div class="col-md-5 col-sm-5 col-xs-12">
                          <div class="footer-content logo-footer">
                              <div class="footer-head">
                                  <div class="footer-logo">
                                  <a class="footer-black-logo" href="#"><img class="footer-logo" src="@/assets/images/logo_white.svg" alt=""></a>
                                  </div>
                                  <p>
                                      Bạn đang cần tìm phòng trọ chất lượng hay cần tư vấn cho công việc kinh doanh phòng trọ của mình. Hãy đăng ký để nhận tư vấn từ chúng tôi!                                    </p>
                                  <div class="subs-feilds">
                                      <div class="suscribe-input">
                                          <input type="email" class="email form-control width-80" id="sus_email" placeholder="Nhập Email">
                                          <button type="submit" id="sus_submit" class="add-btn">Đăng ký</button>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <!-- end single footer -->
                      <div class="col-md-4 col-sm-3 col-xs-12">
                          <div class="footer-content">
                              <div class="footer-head">
                                  <h4>Về chúng tôi</h4>
                                  <ul class="footer-list ps-0">
                                      <li><a href="#">Giới thiệu</a></li>
                                      <li><a href="#">Quy chế hoạt động </a></li>
                                      <li><a href="#">Chính sách bảo mật</a></li>
                                      <li><a href="#">Quy định sử dụng</a></li>
                                      <li><a href="#">Liên hệ </a></li>
                                  </ul>
                                  <ul class="footer-list hidden-sm ps-1">
                  <li><a href="#">Bảng giá dịch vụ</a></li>
                                      <li><a href="#">Hướng dẫn đăng tin</a></li>
                                      <li><a href="#">Quy định đăng tin</a></li>
                                      <li><a href="#">Khiếu nại</a></li>
                                      <li><a href="#">Tin tức</a></li>
                </ul>
                              </div>
                          </div>
                      </div>
                      <!-- end single footer -->
                      <div class="col-md-3 col-sm-4 col-xs-12">
                          <div class="footer-content last-item">
                              <div class="footer-head">
                                  <!-- <h4>RoomFinder.com</h4>  -->
                                  <h4>Thông tin liên hệ</h4> 
                                  <div class="footer-contacts">
                  <p><span>Địa chỉ :</span> 105 Yên Nghĩa, Hà Đông</p>
                  <p><span>Điện thoại :</span> +038-596-8714</p>
                  <p><span>Email :</span> roomfinder@gmail.com</p>
                </div> 
                                  <div class="footer-icons">
                                      <ul>
                                          <li>
                                              <a href="https://www.facebook.com/profile.php?id=100073032771856">
                                                <i class="fa-brands fa-facebook"></i>                                              </a>
                                          </li>
                                          <li>
                                              <a href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=roomfinder@gmail.com&su=Y%C3%AAu%20c%E1%BA%A7u%20h%E1%BB%97%20tr%E1%BB%A3%20t%E1%BB%AB%20kh%C3%A1ch%20h%C3%A0ng%20-%20[T%C3%AAn%20c%E1%BB%A7a%20b%E1%BA%A1n]&body=T%C3%B4i%20mu%E1%BB%91n%20y%C3%AAu%20c%E1%BA%A7u%20h%E1%BB%97%20tr%E1%BB%A3%20ho%E1%BA%B7c%20th%C3%AAm%20th%C3%B4ng%20tin%20v%E1%BB%81">
                                                  <i class="fa-brands fa-google"></i>
                                              </a>
                                          </li>
                                          <li>
                                              <a href="#">
                                                  <i class="fa-brands fa-pinterest"></i>
                                              </a>
                                          </li>
                                          <li>
                                              <a href="#">
                                                  <i class="fa-brands fa-instagram"></i>
                                              </a>
                                          </li>
                                      </ul>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="footer-area-bottom">
              <div class="container">
                  <div class="row">
                      <div class="col-md-6 col-sm-6 col-xs-12">
                          <div class="copyright">
                              <p>
                                  Copyright © 2024
                                  <a href="#">RoomFinder</a> All Rights Reserved
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </footer>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/css/app.css'; // Nhúng file CSS
import 'bootstrap/dist/js/bootstrap.bundle.js';

export default {
  name: 'FooterRoom',
};
</script>