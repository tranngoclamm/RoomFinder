// src/store/index.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    userProfile: null,  // Dữ liệu người dùng sẽ được lưu ở đây
    chatUser: null,      // Dữ liệu người dùng để chat sẽ được lưu ở đây
    isMessageChat: false,
    isMessageDetail: false,
    isConversation: false
  },
  mutations: {
    // Đặt thông tin người dùng hiện tại
    setUserProfile(state, profile) {
      state.userProfile = profile;
    },
    // Đặt thông tin người dùng cần chat
    setChatUser(state, chatUser) {
      state.chatUser = chatUser;
    },
    setMessageDetailState(state, isMessageDetail) {
      state.isMessageDetail = isMessageDetail;
    },
    setMessageChatState(state, isMessageChat) {
      state.isMessageChat = isMessageChat;
    },
    setConversationState(state, isConversation) {
      state.isConversation = isConversation;
    },
  },
  actions: {
    // Gọi khi người dùng click vào icon chat
    openChat({ commit }, chatUser) {
      commit('setChatUser', chatUser);
    },
    openMessageDetail({ commit}){
      commit('setMessageChatState', true),
      commit('setMessageDetailState', true),
      commit('setConversationState', false)
    }
  },
  getters: {
    getUserProfile: (state) => state.userProfile,
    getChatUser: (state) => state.chatUser,
    getMessageChatState: (state) => state.isMessageChat,
    getMessageDetailState: (state) => state.isMessageDetail,
    getConversationState: (state) => state.isConversation,
  }
});

export default store;
