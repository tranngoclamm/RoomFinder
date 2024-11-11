<template>
    <div class="flex payment__success-wrapper flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div class="max-w-md w-full p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div class="flex flex-col items-center justify-center space-y-4">
          <div class="bg-green-500 rounded-full p-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="text-white">
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Thanh toán thành công</h1>
          <p class="text-gray-500 dark:text-gray-400">Thanh toán của bạn đã được xử lý thành công.</p>
        </div>
        <div class="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
          <div class="grid grid-cols-2 gap-4 px-4">
            <div >
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Mã giao dịch</p>
              <p class="text-gray-900 dark:text-gray-100">#{{ txnRef }}</p>
            </div>
            <div class="pl-4">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Tổng số tiền</p>
              <p class="text-gray-900 dark:text-gray-100">{{ formattedAmount  }}</p>
            </div>
            <div >
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Phương thức thanh toán</p>
              <p class="text-gray-900 dark:text-gray-100">{{ paymentMethod }} ({{ bank}})</p>
            </div>
            <div class="pl-4">
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Thời gian</p>
                <p class="text-gray-900 dark:text-gray-100">{{ formattedDate  }}</p>
              </div>
          </div>
        </div>
        <div class="mt-6 flex justify-center">
          <a class="inline-flex items-center justify-center px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
             href="/history">
            Xem lịch sử giao dịch
          </a>
          <router-link to="/" class="inline-flex items-center justify-center px-4 py-2 ml-4 text-gray-900 rounded-md hover:bg-gray-200"
             href="/">
            Quay lại trang chủ
          </router-link>
        </div>
      </div>
    </div>
  </template>

<script>
    import 'bootstrap/dist/css/bootstrap.min.css';

  import '@/assets/css/payment.css'; // Nhúng file CSS

  import {
    mapGetters,
  } from 'vuex';
  import {
    createPayment
  } from '@/services/api'; // Import hàm gọi API từ api.js

  export default {
    name: 'SuccessPaymentPage',
    props: {
      apartment: {
        type: Object,
        required: true,
      },
    },
    data() {
    return {
      txnRef: this.$route.query.txnRef || '',
      amount: this.$route.query.amount || '',
      paymentMethod: this.$route.query.type || '',
      bank: this.$route.query.bank || '',
      date: this.$route.query.date || '',
    };
  },
    computed: {
      ...mapGetters(['getUserProfile']),
      formattedAmount() {
      // Nhân số tiền với 1 triệu và định dạng theo tiền tệ Việt Nam
      const amount = parseFloat(this.amount) * 1_000_000;
      return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
    },
    formattedDate() {
      const date = new Date(this.date);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${hours}:${minutes} ${day}/${month}/${year}`;
    }
    },
    methods: {
      close() {
        this.$emit('close-modal');
      },
      async redirectToVnpay() {
        try {
            const response = await createPayment(this.apartment._id, this.apartment.price, this.getUserProfile._id); 
            console.log(response.data)
            if (response.data) {
              // Chuyển hướng đến VNPAY với URL thanh toán
              // window.location.href = response.data;
              window.open(response.data, '_blank');

            }
          } catch (error) {
            console.error('Lỗi khi tạo giao dịch:', error);

          }
      }
    },
  };
  </script>
  