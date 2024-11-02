import { createApp, ref } from 'vue';
import App from './App.vue';
import router from './router'; // Import router
import store from './store';

const app = createApp(App);
app.use(router); // Sử dụng router
app.use(store);  // Sử dụng store
app.config.globalProperties.$isMessageChat = ref(false);
app.mount('#app');
