<template>
  <div class="chat-modal-wrapper">
    <div @click='setMessageChatState(true), setMessageDetailState(false), setConversationState(true)'
      v-if="isMessageIcon" class="icon-message-chat">
      <div class="icon_message-wrapper">

        <svg class="icon-chat" width="60px" height="60px" viewBox="0 0 60 60" cursor="pointer"><svg x="0" y="0"
            width="60px" height="60px">
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g>
                <circle fill="#0A7CFF" cx="30" cy="30" r="30"></circle><svg x="10" y="10">
                  <g transform="translate(0.000000, -10.000000)" fill="#FFFFFF">
                    <g id="logo" transform="translate(0.000000, 10.000000)">
                      <path
                        d="M20,0 C31.2666,0 40,8.2528 40,19.4 C40,30.5472 31.2666,38.8 20,38.8 C17.9763,38.8 16.0348,38.5327 14.2106,38.0311 C13.856,37.9335 13.4789,37.9612 13.1424,38.1098 L9.1727,39.8621 C8.1343,40.3205 6.9621,39.5819 6.9273,38.4474 L6.8184,34.8894 C6.805,34.4513 6.6078,34.0414 6.2811,33.7492 C2.3896,30.2691 0,25.2307 0,19.4 C0,8.2528 8.7334,0 20,0 Z M7.99009,25.07344 C7.42629,25.96794 8.52579,26.97594 9.36809,26.33674 L15.67879,21.54734 C16.10569,21.22334 16.69559,21.22164 17.12429,21.54314 L21.79709,25.04774 C23.19919,26.09944 25.20039,25.73014 26.13499,24.24744 L32.00999,14.92654 C32.57369,14.03204 31.47419,13.02404 30.63189,13.66324 L24.32119,18.45264 C23.89429,18.77664 23.30439,18.77834 22.87569,18.45674 L18.20299,14.95224 C16.80079,13.90064 14.79959,14.26984 13.86509,15.75264 L7.99009,25.07344 Z">
                      </path>
                    </g>
                  </g>
                </svg>
              </g>
            </g>
          </svg>
        </svg>
        <span v-if="totalUnreadMessages!=0" class="badge badge-pill badge-danger ks-badge ks-notify">{{totalUnreadMessages}}</span>
      </div>
    </div>
    <div class="container chat-modal" v-if="isMessageChat">

      <div v-if="this.isConversation" class="ks-messenger">
        <div class="ks-discussions h-100">
          <div class="ks-search">
            <div class="input-icon icon-right icon icon-lg icon-color-primary mt-0">
              <input id="input-group-icon-text" type="text" class="form-control" placeholder="Search">
              <i @click="setConversationState(false), isMessageIcon = true"
                class="fa-solid fa-angles-down cursor-pointer"></i>
              <hr>
            </div>
          </div>
          <div class="ks-body ks-scrollable jspScrollable" data-auto-height=""
            style="height: 400px; overflow-y: auto; padding: 0px; width: 339px;" tabindex="0">

            <div class="jspContainer" style="width: 339px; height: 550px;">
              <div class="jspPane" style="padding: 0px; top: 0px; ">
                <ul class="ks-items">
                  <li @click="openMessageDetail(conversation._id, getId(conversation))"
                    v-for="conversation in conversations" :key="conversation._id"
                    :class="{'ks-item': true,'ks-active': activeConversationId === conversation._id, 'ks-unread': hasUnreadMessages(conversation)}">
                    <a href="#">
                      <span class="ks-avatar">
                        <img
                          :src=" getAvatar(conversation)  || 'https://res.cloudinary.com/dlawgdb8h/image/upload/v1730344959/avatars/kn6xdlvb6hivqkhka000.jpg'"
                          width="36" height="36">
                        <span v-if="hasUnreadMessages(conversation)"
                          class="badge badge-pill badge-danger ks-badge ks-notify">
                          {{ unreadMessageCount(conversation) }}
                        </span>
                      </span>
                      <div class="ks-body">
                        <div class="ks-name">
                          {{ getParticipantName(conversation) }}
                          <span class="ks-datetime">{{ getRelativeTime(conversation.lastMessageAt) }}</span>
                        </div>
                        <div class="ks-message">{{ conversation.lastMessage }}</div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="this.isMessageDetail" class="p-0 messenger__messages-wrapper h-100">
        <div class="d-flex justify-content-center h-100" style="width:fit-content;">
          <div class="col-12 p-0 position-relative chat-wrapper">
            <div class="card h-100" id="chat2">
              <div class="card-header d-flex justify-content-between align-items-center p-3">
                <div class="d-flex">
                  <div class="" style="width: 18px">
                    <i v-if="!this.isConversation" @click="setConversationState(true)"
                      class="fa-solid fa-angles-left cursor-pointer"></i>
                  </div>
                  <h5 class="mb-0">Chat</h5>
                </div>
                <!-- <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-sm" data-mdb-ripple-color="dark">
                  Let's Chat App
                </button> -->
                <div class="minus-wrapper" @click.stop="this.setMessageDetailState(false)">
                  <i class="fa-solid fa-minus ml-4 cursor-pointer"></i>
                </div>
              </div>
              <div ref="messagesContainer" @scroll="handleScroll" class="card-body" data-mdb-perfect-scrollbar-init
                style="position: relative; height: 400px; width: 400px">
                <!-- Profile Receiver Information -->
                <div v-if="messages.length == 0"
                  class="profile-receiver d-flex justify-content-center align-items-center flex-column">
                  <img :src="chatUser.profilePicture || defaultProfilePicture" alt="" class="avatar-icon" />
                  <p class="name-user">{{ chatUser.fullName }}</p>
                </div>

                <!-- Messages Content -->
                <template v-else v-for="group in groupedMessages" :key="group.senderId + group.date">
                  <!-- Date Divider for Each Group -->
                  <div class="divider d-flex align-items-center mb-4">
                    <p class="text-center mx-3 mb-0" style="color: #a2aab7;">{{ formatTime(group.origin_date) }}</p>
                  </div>

                  <!-- Messages Group -->
                  <div class="d-flex"
                    :class="{ 'justify-content-end': group.senderId != userProfile._id, 'justify-content-start': group.senderId == userProfile._id }">
                    <!-- Avatar (only displayed once per group) -->
                    <img v-if="group.senderId == userProfile._id" :src="userProfile.profilePicture || defaultProfilePicture"
                      class="rounded-circle" alt="avatar" style="width: 45px; height: 100%;" />

                    <!-- Messages within the group -->
                    <div>
                      <div v-for="(message) in group.messages" :key="message._id">
                        <!-- Sender styling -->
                        <!-- <div>{{group.senderId}}</div>
                         <div>{{userProfile._id}}</div> -->
                        <div v-if="group.senderId !== userProfile._id" class="d-flex flex-row-reverse">
                          <!-- <p>{{group.senderId}}</p> -->
                          <!-- <p>{{userProfile._id}}</p> -->
                          <div class="d-flex flex-column align-items-end">
                            <template v-if="message.text">
                              <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">{{ message.text }}</p>
                            </template>
                            <template v-if="message.attachment">
                              <div class="p-0 m-3">
                                <img :src="message.attachment" alt="" class="chat-image" />
                              </div>
                            </template>
                          </div>
                        </div>

                        <!-- Receiver styling -->
                        <div v-else>
                          <div class="d-flex flex-column align-items-start">
                            <template v-if="message.text">
                              <p class="small p-2 ms-3 mb-1 rounded-3 bg-light">{{ message.text }}</p>
                            </template>
                            <template v-if="message.attachment">
                              <div class="p-0 m-3">
                                <img :src="message.attachment" alt="" class="chat-image" />
                              </div>
                            </template>
                          </div>
                        </div>
                      </div>

                      <!-- Display time only for the last message in the group -->
                      <p v-if="group.messages.length>1" class="small text-muted d-flex"
                        :class="{ 'justify-content-end me-4': group.senderId != userProfile._id, 'justify-content-start ms-4': group.senderId == userProfile._id }">
                        {{ group.messages[group.messages.length - 1].time }}
                      </p>
                      <div v-else class="mt-4"></div>
                    </div>

                    <!-- Avatar for the sender's messages only displayed once per group -->
                    <img v-if="group.senderId !== userProfile._id" :src="group.senderProfilePicture || defaultProfilePicture"
                      class="rounded-circle" alt="avatar" style="width: 45px; height: 100%;" />
                  </div>
                </template>

              </div>

              <div class="card-footer text-muted p-0">
                <div class="d-flex justify-content-start align-items-center p-3">
                  <!-- Kiểm tra nếu có ảnh preview thì hiển thị khung preview ảnh -->
                  <input type="file" ref="fileInput" @change="handleImageUpload" style="display: none;"
                    accept="image/*">
                  <div v-if="imagePreview" class="image__preview-wrapper">
                    <img :src="imagePreview" class="image-preview" alt="">
                    <i class="fa-solid fa-x cursor-pointer" @click="removeImagePreview"></i>
                  </div>

                  <!-- Avatar của người dùng -->
                  <img v-else class="rounded-circle"
                    :src="userProfile.profilePicture || 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp'"
                    alt="avatar" style="width: 40px; height: 100%;">

                  <!-- Input tin nhắn -->
                  <input type="text" spellcheck="false" class="form-control form-control-lg" v-model="message"
                    id="exampleFormControlInput1" placeholder="Type message">
                  <a class="ms-1 text-muted" href="#!" @click="triggerImageUpload"><i class="fas fa-paperclip"></i></a>
                  <a class="ms-3 text-muted" href="#!"><i class="fas fa-smile"></i></a>
                  <a class="ms-3" href="#!" @click="sendMessage()"><i class="fas fa-paper-plane"></i></a>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>

</template>
<script>
  import 'bootstrap/dist/css/bootstrap.min.css';
  import '@/assets/css/chat.css'; // Nhúng file CSS
  // import { formatDate } from '@/utils/dateUtils'; 
  import {
    mapGetters,
    mapMutations
  } from 'vuex';
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  // import socket from '../../../socket';
  import {
    io
  } from 'socket.io-client';

  dayjs.extend(relativeTime);

  import {
    createConversation,
    getUserConversations,
    sendMessage,
    getMessages,
    getUserProfileById,
    uploadImagePostToCloudinary,
    resetUnreadMessages
  } from '@/services/api'; // Import hàm gọi API từ api.js


  export default {
    name: 'ChatModal',
    computed: {
      ...mapGetters(['getChatUser', 'getUserProfile', 'getMessageChatState', 'getMessageDetailState',
        'getConversationState'
      ]),
      chatUser() {
        return this.getChatUser;
      },
      isMessageDetail() {
        return this.getMessageDetailState;
      },
      isMessageChat() {
        return this.getMessageChatState;
      },
      isConversation() {
        return this.getConversationState;
      },
      // Đảo danh sách tin nhắn từ cũ lên mới
      reversedMessages() {
        return [...this.messages].reverse();
      },

      // Nhóm các tin nhắn
      groupedMessages() {
        const grouped = [];
        let currentGroup = null;
        let currentDate = null;

        this.reversedMessages.forEach((message) => {
          const date = this.formatTime(message.createdAt, 'DD-MM-YYYY');
          const time = this.formatTime(message.createdAt, 'HH:MM');
          // Tạo nhóm mới nếu:
          // - currentGroup chưa có
          // - Người gửi thay đổi
          // - Ngày thay đổi
          if (!currentGroup || currentGroup.senderId !== message.sender._id || currentDate !== date) {
            currentGroup = {
              senderId: message.sender._id,
              messages: [],
              origin_date: message.createdAt,
              date, // Ngày hiện tại cho nhóm
              senderProfilePicture: message.sender.profilePicture,
            };
            grouped.push(currentGroup);
            currentDate = date;
          }

          // Thêm tin nhắn và thời gian vào nhóm hiện tại
          currentGroup.messages.push({
            ...message,
            time
          });
        });

        return grouped;
      },
      defaultProfilePicture() {
        return 'https://res.cloudinary.com/dlawgdb8h/image/upload/v1730344959/avatars/kn6xdlvb6hivqkhka000.jpg';
      },
    },
    data() {
      return {
        socket: null,
        totalUnreadMessages: 0,
        page: 1,
        isFetching: false,
        isMessageIcon: true,
        currentScrollHeight: 0,
        activeConversationId: null,
        conversations: {},
        messages: [],
        userProfile: [],
        message: "", // Nội dung tin nhắn văn bản
        imagePreview: "", // URL ảnh preview để hiển thị
        imageFile: null, // File ảnh đã chọn để upload
      }
    },
    methods: {
      ...mapMutations(['setUserProfile', 'setChatUser', 'setMessageDetailState', 'setMessageChatState',
        'setConversationState'
      ]),
      async fetchConversations() {
        if (this.userProfile && this.userProfile._id) {
          this.totalUnreadMessages = 0;
          try {
            const response = await getUserConversations(this.userProfile._id, 1, ''); // Gọi hàm API với page = 1
            if (response && response.data.conversations) {
              let conversations = response.data.conversations
              conversations.forEach(newsItem => {
                this.totalUnreadMessages += this.unreadMessageCount(newsItem);
                const messageDate = dayjs(newsItem.lastMessageAt);
                newsItem.relativeTime = messageDate; // chuyển định dạng ngày
              });
              this.conversations = conversations;
            }
          } catch (error) {
            console.error('Error fetching article detail:', error);
          }
        }
      },
      triggerImageUpload() {
        // Kích hoạt input để chọn ảnh
        this.$refs.fileInput.click();
      },
      handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
          // Tạo URL để hiển thị preview ảnh
          this.imagePreview = URL.createObjectURL(file);
          // Lưu file để sử dụng khi tải lên Cloudinary
          this.imageFile = file;
        }
      },
      removeImagePreview() {
        // Xóa ảnh preview
        this.imagePreview = "";
        // this.$refs.fileInput.value = "";  // Đặt lại input file
      },
      async fetchMessageDetail() {
        // Lưu vị trí cuộn hiện tại
        const container = this.$refs.messagesContainer;
        try {

          this.isFetching = true;
          const response = await getMessages(this.activeConversationId, this.page,''); // Gọi hàm API với page hiện tại
          if (response && response.data.messages) {
            let newMessages = response.data.messages.map((message) => {
              const messageDate = dayjs(message.lastMessageAt);
              message.relativeTime = messageDate; // chuyển định dạng ngày
              return message;
            });
            // Kết hợp tin nhắn mới vào đầu danh sách tin nhắn hiện tại
            this.messages = [...this.messages, ...newMessages];
            await this.$nextTick();
            const newScrollHeight = container.scrollHeight;
            container.scrollTop = newScrollHeight - this.currentScrollHeight;
          }
        } catch (error) {
          console.error('Error fetching article detail:', error);
        } finally {
          this.isFetching = false;
          // if (this.getMessageDetailState == true ) {
          //   // await resetUnreadMessages(this.activeConversationId, this.userProfile._id)
          //   // this.messages = [],
          //   this.fetchMessageDetail();
          //   this.fetchConversations();
          // }
        }
      },
      formatTime(date, format) {
        const d = new Date(date);
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0 nên cần +1
        const day = String(d.getDate()).padStart(2, '0');

        // Xử lý định dạng theo yêu cầu
        if (format === 'YYYY-MM-DD') {
          return `${year}-${month}-${day}`;
        } else if (format === 'DD-MM-YYYY') {
          return `${day}-${month}-${year}`;
        } else if (format === 'MM-DD-YYYY') {
          return `${month}-${day}-${year}`;
        } else if (format === 'HH:MM') {
          return `${hours}:${minutes}`;
        }
        // Nếu không có định dạng nào khớp, trả về mặc định là 'YYYY-MM-DD'
        return `${hours}:${minutes} ${day}/${month}/${year}`;
      },
      async openMessageDetail(conversationId, chatUserId) {
        this.page = 1;
        this.messages = [];
        this.activeConversationId = conversationId;
        this.fetchMessageDetail()
        try {
          const response = await getUserProfileById(chatUserId);
          if (response && response.data) {
            this.setChatUser(response.data)
          }
        } catch (error) {
          console.error('Error fetching chatUserProfile:', error);
        }
        this.setMessageDetailState(true)
        await this.$nextTick();

        this.scrollToBottom("messagesContainer");

        await resetUnreadMessages(this.activeConversationId, this.userProfile._id)
        this.fetchConversations();
      },
      async sendMessage() {
        const participants = [this.userProfile._id, this.chatUser._id];
        try {
          const conversation = await createConversation({
            participants
          }); // Truyền đúng cấu trúc dữ liệu
          let messageData = {
            conversationId: conversation.data._id,
            sender: this.userProfile._id,
            text: this.message,
          };
          if (this.imageFile) {
            const imageUrl = await this.images_upload_handler();
            messageData.attachment = imageUrl;
          }
          const response = await sendMessage(messageData);
          // Gửi tin nhắn thông qua socket tới server
          this.socket.emit('sendMessage', messageData, this.chatUser._id);
          await this.$nextTick();
          this.activeConversationId = response.data.conversationId;
          this.page = 1;
          this.message = '';
          this.messages = [];
          this.imageFile = null;
          this.imagePreview = "";
          await this.fetchMessageDetail();
          await this.fetchConversations();
          await this.scrollToBottom("messagesContainer");
        } catch (error) {
          console.error('Error sending message:', error);
        }

      },
      async images_upload_handler() {
        const formData = new FormData();
        formData.append('file', this.imageFile);
        formData.append('upload_preset', 'message_upload_preset');
        try {
          const response = await uploadImagePostToCloudinary(formData);
          if (response.data.secure_url) {
            return response.data.secure_url
          } else {
            throw new Error('Cloudinary không trả về URL của ảnh');
          }
        } catch (error) {
          console.error("Upload failed:", error);
        }
      },
      hasUnreadMessages(conversation) {
        // Kiểm tra xem userProfile._id có tin nhắn chưa đọc trong unreadMessages không
        return (
          conversation.unreadMessages &&
          conversation.unreadMessages[this.userProfile._id] > 0
        );
      },
      unreadMessageCount(conversation) {
        // Trả về số tin nhắn chưa đọc cho userProfile._id
        return conversation.unreadMessages[this.userProfile._id] || 0;
      },
      getId(conversation) {
        // Lấy tên người tham gia không phải là user hiện tại
        const otherParticipant = conversation.participants.find(
          (p) => p._id !== this.userProfile._id
        );
        return otherParticipant ? otherParticipant._id : 'Unknown';
      },
      getParticipantName(conversation) {
        // Lấy tên người tham gia không phải là user hiện tại
        const otherParticipant = conversation.participants.find(
          (p) => p._id !== this.userProfile._id
        );
        return otherParticipant ? otherParticipant.fullName : 'Unknown';
      },
      getAvatar(conversation) {
        // Lấy tên người tham gia không phải là user hiện tại
        const otherParticipant = conversation.participants.find(
          (p) => p._id !== this.userProfile._id
        );
        return otherParticipant ? otherParticipant.profilePicture :
          'https://res.cloudinary.com/dlawgdb8h/image/upload/v1730344959/avatars/kn6xdlvb6hivqkhka000.jpg';
      },
      getRelativeTime(timestamp) {
        // Sử dụng dayjs để hiển thị thời gian tương đối
        return dayjs(timestamp).fromNow();
      },
      scrollToBottom(refName) {
        this.$nextTick(() => {
          const container = this.$refs[refName];
          if (container) {
            container.scrollTop = container.scrollHeight;
          }
        });
      },

      handleScroll() {
        const container = this.$refs.messagesContainer;
        // Kiểm tra nếu người dùng đã cuộn lên đầu và không đang tải dữ liệu
        if (container.scrollTop === 0 && !this.isFetching) {
          this.currentScrollHeight = container.scrollHeight;
          this.page += 1; // Tăng trang
          this.fetchMessageDetail(); // Tải thêm dữ liệu
        }
      },

      // Cập nhật UI với socket
      handleIncomingMessage(messageData, receivedId) {
        // Thêm tin nhắn vào danh sách
        this.messages.push(messageData);
        console.log(receivedId)
        this.scrollToBottom('messagesContainer'); // Cuộn xuống cuối cùng nếu cần
      }

    },
    async mounted() {
      const user = JSON.parse(localStorage.getItem('user'));
      this.setUserProfile(user);
      this.userProfile = this.getUserProfile;
      this.fetchConversations();
      // Kết nối tới server socket.io
      this.socket = io('http://localhost:3000', {
        withCredentials: true
      });

      // Đăng ký người dùng sau khi kết nối
      this.socket.emit('registerUser', this.userProfile._id);

      // Lắng nghe sự kiện nhận tin nhắn từ server
      this.socket.on('receiveMessage', async (messageData) => {
        console.log('New message received:', messageData);
        let oldActiveConversationId = this.activeConversationId;
        // if(this.activeConversationId == messageData.conversationId){
        // }
        if(oldActiveConversationId == messageData.conversationId && this.getMessageDetailState == true){
          this.messages = [];
          this.activeConversationId = messageData.conversationId;
          this.fetchMessageDetail();
          await resetUnreadMessages(messageData.conversationId, this.userProfile._id)
        }
        await this.fetchConversations();

        // this.activeConversationId = oldActiveConversationId;
        // this.activeConversationId = oldActive;
        // this.scrollToBottom();
      });
    },

  }
</script>