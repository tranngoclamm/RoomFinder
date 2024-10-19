import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Authentication/LoginForm.vue';
import Register from '../components/Authentication/RegisterForm.vue';
import HomePage from '../components/MainLayout/HomePage.vue';
import MainRoomInline from '../components/MainLayout/MainRoomInline.vue';

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
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  mode: 'history',
  routes,
});

export default router;
