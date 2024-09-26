<script>
import axios from 'axios';
import { BModal } from 'bootstrap-vue';

export default {
  components: {
    BModal,
  },
  data() {
    return {
      fullName: '',
      username: '',
      email: '',
      password: '',
      agree: false,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post('http://localhost:5000/register', {
          fullName: this.fullName,
          username: this.username,
          email: this.email,
          password: this.password,
          agree: this.agree,
        });
        
        if (response.status === 201) {
          this.$bvModal.show('successModal'); // Hiển thị modal thông báo thành công
          // Reset form sau khi thành công
          this.fullName = '';
          this.username = '';
          this.email = '';
          this.password = '';
          this.agree = false;
        }
      } catch (error) {
        alert(error.response.data.message || 'Đăng ký thất bại');
      }
    },
  },
};
</script>
