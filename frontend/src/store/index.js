// src/store/index.js

import { createStore } from 'vuex';

export default createStore({
  state: {
    isProfileModal: false,    // Trạng thái mở modal
    selectedUserProfile: null,     // Dữ liệu người dùng được chọn
  },
  mutations: {
    openProfileModal(state, user) {
      console.log("Mở modal với user:", user); // Kiểm tra thông tin user
      state.isProfileModal = true;
      state.selectedUser = user;
    },
    closeProfileModal(state) {
        console.log("Đóng modal"); // Kiểm tra khi đóng modal
      state.isProfileModal = false;
      state.selectedUser = null;
    }
  },
  actions: {
    openProfileModal({ commit }, user) {
      commit('openProfileModal', user);
    },
    closeProfileModal({ commit }) {
      commit('closeProfileModal');
    }
  },
  getters: {
    isProfileModal: state => state.isProfileModal,
    selectedUser: state => state.selectedUser
  }
});
