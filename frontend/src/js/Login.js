

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      account: '',
      password: '',
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:5000/login', {
          account: this.account,
          password: this.password,
        });

        // Lưu token vào localStorage (hoặc sessionStorage)
        localStorage.setItem('token', response.data.token);
        
        // Chuyển hướng đến trang home
        this.router.push('/home');
      } catch (error) {
        alert(error.response.data.message || 'Đăng nhập thất bại');
      }
    },
  },
};
</script>

