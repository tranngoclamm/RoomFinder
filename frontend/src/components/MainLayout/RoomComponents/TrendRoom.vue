<!-- TrendRoom.vue -->
<template>
    <div class="trend-room d-flex flex-column justify-content-center align-items-center">
        <!-- trend-room -->
        <div class="trend_location">
            <h2>Khu vực đang thịnh hành</h2>
            <p>Các lựa chọn phổ biến nhất cho khách từ Việt Nam</p>
            <div class="sub_small-form d-flex justify-content-between gap-4 m-0 mt-3 w-100">
                <div class="img_caption p-0">
                    <a href=""><img src="@/assets/images/nha-tro-gac-lung-1-1.jpg" alt="" class="resize-form"></a>
                    <div class="styled_text flex-container">
                        <a href="">Hà Nội</a> 
                        <a href=""><img src="@/assets/images/VN-Vietnam-Flag.svg" alt="" class="resize-form"></a>
                    </div>
                </div>
                <div class="img_caption p-0">
                    <a href=""><img src="@/assets/images/nha-tro-gac-lung-3.jpg" alt="" class="resize-form"></a>
                    <div class="styled_text flex-container">
                        <a href="">Hồ Chí Minh </a> 
                        <a href=""><img src="@/assets/images/VN-Vietnam-Flag.svg" alt="" class="resize-form"></a>
                    </div>
                </div>
                <div class="img_caption p-0">
                    <a href=""><img src="@/assets/images/thiet-ke-phong-tro-dep-63.jpg" alt="" class="resize-form"></a>
                    <div class="styled_text flex-container">
                        <a href="">Đà Lạt</a> 
                        <a href=""><img src="@/assets/images/VN-Vietnam-Flag.svg" alt="" class="resize-form"></a>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
  </template>
  
  <script>
  import 'bootstrap/dist/css/bootstrap.min.css';
  import '@/assets/css/app.css'; 
  import '@/assets/css/room-category.css'; 

  export default {
    name: 'TrendRoom',
  };
  </script>
  
  
