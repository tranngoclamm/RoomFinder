<!-- Preloader.vue -->
<template>
    <div v-if="isLoading" class="preloader">
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </template>
  
  <script>
  import '@/assets/css/stylesheet.css'; 

  export default {
    props: {
      isLoading: {
        type: Boolean,
        default: true,
      },
    },
  };
  </script>
  