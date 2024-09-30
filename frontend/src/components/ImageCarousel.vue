<template>
    <div class="carousel-container">
      <div class="carousel" :style="{ backgroundImage: `url(${images[currentIndex]})` }">
        <!-- Nút mũi tên chuyển ảnh -->
        <button @click="prevImage" class="arrow prev-arrow">&lt;</button>
        <button @click="nextImage" class="arrow next-arrow">&gt;</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentIndex: 0, // Index ảnh hiện tại
        images: [
          // Thêm danh sách các URL ảnh ở đây
          require('@/assets/images/anh-3-phan-loai-theo-cong-nang.jpg'),
          require('@/assets/images/anh-12-thiet-ke-phong-tro-tinh-te-am-cung.png'),
          require('@/assets/images/thiet-ke-phong-tro-dep-63.jpg'),
          require('@/assets/images/thiet-ke-phong-tro-dep-58.jpg'),
        ],
      };
    },
    methods: {
      nextImage() {
        // Chuyển đến ảnh tiếp theo
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
      },
      prevImage() {
        // Quay lại ảnh trước đó
        this.currentIndex =
          (this.currentIndex - 1 + this.images.length) % this.images.length;
      },
    },
  };
  </script>
  
  <style scoped>
  .carousel-container {
    position: relative;
    width: 100%;
    max-width: 800px;
    margin: auto;
    overflow: hidden;
  }
  
  .carousel {
    width: 100%;
    height: 600px;
    background-size: cover;
    background-position: center;
    position: relative;
  }
  
  .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: transparent;
    color: white;
    border: none;
    font-size: 2em;
    padding: 10px;
    cursor: pointer;
  }
  
  .prev-arrow {
    left: 10px;
  }
  
  .next-arrow {
    right: 10px;
  }
  </style>
  