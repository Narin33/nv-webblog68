<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      
      <router-link v-if="!authenStore.token" to="/login"> Login </router-link>

      <router-link v-if="authenStore.token" to="/users"> Users </router-link>
      <span v-if="authenStore.token"> | </span>
      <a v-if="authenStore.token" @click="logout" href="#"> Logout </a>
    </div>

    <hr>
    <router-view/>
  </div>
</template>

<script>
import { useAuthenStore } from './stores/authen'

export default {
  // ใช้ setup เพื่อดึง Store มาใช้ใน Template ได้ง่ายๆ
  setup() {
    const authenStore = useAuthenStore()
    return { authenStore }
  },
  methods: {
    logout() {
      this.authenStore.setToken(null)
      this.authenStore.setUser(null)
      this.$router.push('/login')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin: 0 10px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>