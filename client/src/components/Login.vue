<template>
  <div>
    <h1>Login</h1>
    <form v-on:submit.prevent="onLogin">
      <p>Username: <input type="email" v-model="email" /></p>
      <p>Password: <input type="password" v-model="password" /></p>
      <p>
        <button type="submit">Login</button>
        <button v-on:click.prevent="navigateTo('/user/create')">Create User</button>
      </p>
    </form>
    <div class="error" v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import AuthenService from '../services/AuthenService'
import { useAuthenStore } from '../stores/authen'

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async onLogin() {
      try {
        const response = await AuthenService.login({
          email: this.email,
          password: this.password
        })

        const authenStore = useAuthenStore()
        authenStore.setToken(response.data.token)
        authenStore.setUser(response.data.user)

        this.$router.push({
          name: 'users'
        })

      } catch (error) {
        console.log(error)
        this.error = error.response.data.error
      }
    },
    // เพิ่มฟังก์ชันสำหรับเปลี่ยนหน้า
    navigateTo(route) {
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}
/* เพิ่มระยะห่างระหว่างปุ่มหน่อยครับ */
button {
    margin: 0 5px;
}
</style>