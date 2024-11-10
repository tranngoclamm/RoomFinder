<template>
    <div class="content user-wrapper">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12 p-0">
            <div class="card bootstrap-table">
              <div class="card-body p-0 table-full-width">
                <div class="bootstrap-table">
                  <div class="fixed-table-container" style="padding-bottom: 0px;">
                    <div class="fixed-table-body">
                      <table id="bootstrap-table" class="table table-hover">
                        <thead class="pt-2">
                          <tr>
                            <th class="text-center">
                              Mã GD
                            </th>
                            <th class="text-center">Ảnh</th>
                            <th class="text-center">Tiêu đề</th>
                            <th class="text-center">Địa chỉ</th>
                            <th>Diện tích</th>
                            <th>Giá</th>
                            <th>Trạng thái</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(history, index) in filteredHistories" :key="index">
                            <td class="text-center">{{ history.txnRef }}</td>
                            <td class="image-wrapper p-0">
                              <img class="image-modify" :src="history.itemId.images[0] || 'https://cdn.dribbble.com/users/263641/screenshots/4517916/404_not_found_3_dribbble.jpg'" alt="">
                            </td>
                            <td class="text-center">{{ history.itemId.title }}</td>
                            <td>{{ history.itemId.exactAddress }}, {{ history.itemId.street }}, {{ history.itemId.ward.name }}, {{ history.itemId.district.name }}, {{ history.itemId.province.name }} </td>
                            <td class="pl-4">{{ history.itemId.area }}m²</td>
                            <td>{{ history.itemId.price }}tr</td>
                            <td>
                              <span v-if="history.itemId.status === 'sold' && history.status === 'success' && this.getUserProfile._id === history.buyUser._id">
                                Đã bán
                              </span>
                              <span v-else-if="history.itemId.status === 'sold' && history.status === 'success' && this.getUserProfile._id !== history.buyUser._id">
                                Đã mua
                              </span>
                              <span v-else>
                                {{ history.itemId.status }}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ul role="navigation" class="pagination mb-3 mt-4 d-flex align-items-center justify-content-center">
      <li :class="['page-item', currentPage === 1 ? 'disabled' : '']">
        <a @click.prevent="changePage(currentPage - 1)" href="#" aria-label="« Previous" class="page-link">‹</a>
      </li>
    
      <li v-for="page in totalPages" :key="page" :class="['page-item', currentPage === page ? 'active' : '']">
        <a @click.prevent="changePage(page)" href="#" class="page-link">{{ page }}</a>
      </li>
    
      <li :class="['page-item', currentPage === totalPages ? 'disabled' : '']">
        <a @click.prevent="changePage(currentPage + 1)" href="#" aria-label="Next »" class="page-link">›</a>
      </li>
    </ul>
    
  </template>
  
  <script>
  import {getHistories} from '@/services/api'; // Import hàm gọi API từ api.js
  import {
    mapGetters,
  } from 'vuex';

  export default {
    name:'HistoryList',
    computed: {
      ...mapGetters([ 'getUserProfile',]),
      filteredHistories() {
    const query = this.searchQuery.toLowerCase();
    return this.histories.filter((history) => {
      const isMatch = 
        history.txnRef.toLowerCase().includes(query) ||
        history.itemId.title.toLowerCase().includes(query) ||
        history.itemId.exactAddress.toLowerCase().includes(query) ||
        history.itemId.ward.name.toLowerCase().includes(query) ||
        history.itemId.district.name.toLowerCase().includes(query) ||
        history.itemId.province.name.toLowerCase().includes(query) ||
        history.itemId.street.toLowerCase().includes(query);

      const isBuyer = this.filterType === 'buyer' && history.buyUser?._id === this.getUserProfile._id;
      const isSeller = this.filterType === 'seller' && history.itemId?.userId._id === this.getUserProfile._id;

      return isMatch && (this.filterType === 'all' || isBuyer || isSeller);
    });
  },
    },
    props: {
      searchQuery: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        filterType: 'all',
        currentPage: 1,
        pageSize: 10,
        totalPages: 1,
        totalRecords: 0,
        histories: [],
      };
    },
    mounted() {
      this.fetchHistories();
    },
    methods: {
      async fetchHistories(page = 1) {
        try {
          const response = await getHistories(this.getUserProfile._id, page, this.pageSize);  // Gọi API lấy tin mới nhất
          if (response && response.data) {
            console.log(response.data.payments)
            this.histories = response.data.payments;
            this.currentPage = response.data.currentPage;
            this.pageSize = response.data.pageSize;
            this.totalPages = response.data.totalPages;
            this.totalRecords = response.data.totalRecords;
          }
        } catch (error) {
          console.error("Lỗi lấy tin mới nhất:", error);
        }
     },
     changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.fetchHistories(page);
      }
    },
    },
  };
  </script>
        
