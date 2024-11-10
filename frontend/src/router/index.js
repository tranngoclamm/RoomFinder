import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Authentication/LoginForm.vue';
import Register from '../components/Authentication/RegisterForm.vue';
import HomePage from '../components/MainLayout/HomePage.vue';
import MainRoomInline from '../components/MainLayout/MainRoomInline.vue';
import SuccessPaymentPage from '@/components/Notification/SuccessPaymentPage.vue';
import HistoryListMain from '@/components/MainLayout/HistoryListMain.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/rent-room',
    name: 'RentRoom',
    component: MainRoomInline,
    meta: { type: 'rooms' }, // Thêm meta để nhận biết loại phòng
  },
  {
    path: '/rent-house',
    name: 'RentHouse',
    component: MainRoomInline,
    meta: { type: 'houses' }, // Thêm meta để nhận biết loại nhà
  },
  {
    path: '/rent-apartment',
    name: 'RentApartment',
    component: MainRoomInline,
    meta: { type: 'apartments' }, // Thêm meta cho căn hộ
  },
  {
    path: '/find-roommate',
    name: 'FindRoommate',
    component: MainRoomInline,
    meta: { type: 'find-roommates' }, // Thêm meta cho tìm người ở ghép
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: MainRoomInline,
    meta: { type: 'favorites' }, // Thêm meta cho danh sách yêu thích
  },
  {
    path: '/blog-posts',
    name: 'BlogPost',
    component: MainRoomInline,
  },
  {
    path: '/blog-posts/category/:category',
    name: 'BlogPostCategory',
    component: MainRoomInline,
  },
  {
    path: '/blog-posts/:slug',
    name: 'BlogPostDetail',
    component: MainRoomInline,
  },
  {
    path: '/payment/success',
    name: 'SuccessPaymentPage',
    component: SuccessPaymentPage,
  },
  {
    path: '/history',
    name: 'HistoryList',
    component: HistoryListMain,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Nếu vị trí cuộn trước đó được lưu (như khi dùng nút quay lại), Vue Router sẽ cuộn về vị trí đó.
    if (savedPosition) {
      return savedPosition
    } else {
      // Mặc định luôn cuộn lên đầu trang khi chuyển trang
      return { top: 0 }
    }
  },
});

export default router;
