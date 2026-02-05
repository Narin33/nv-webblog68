<template>
  <div>
    <h2>Get all users</h2>
    
    <p><button v-on:click="logout">Logout</button></p>

    <p><button v-on:click="navigateTo('/user/create')">สร้างผู้ใช้</button></p>
    <h4>จำนวนผู้ใช้งาน {{users.length}}</h4>
    <div v-for="user in users" v-bind:key="user.id">
      <p>id: {{ user.id }}</p>
      <p>ชื่อ-นามสกุล: {{ user.name }} - {{ user.lastname }}</p>
      <p>email: {{ user.email }}</p>
      <p>password: {{ user.password }}</p>
      <p><button v-on:click="navigateTo('/user/'+user.id)">ดูข้อมูลผู้ใช้</button></p>
      <p><button v-on:click="navigateTo('/user/edit/'+ user.id)">แก้ไขข้อมูล</button></p>
      <p><button v-on:click="deleteUser(user)">ลบข้อมูล</button></p>
      <hr>
    </div>
  </div>
</template>

<script>
import UsersService from '../../services/UsersService'
// 2. นำเข้า Store เพื่อใช้เคลียร์ Token (ใช้ .. สองครั้งเพื่อถอยกลับไปหาโฟลเดอร์ stores)
import { useAuthenStore } from '../../stores/authen'

export default {
    data () {
        return {
            users: []
        }
    },
    async created () {
        try {
            this.users = (await UsersService.index()).data
            console.log(this.users)
        } catch (error) {
            console.log(error)
        }
    },

  methods: {
    // 3. ฟังก์ชันสำหรับออกจากระบบ
    logout() {
      const authenStore = useAuthenStore()
      authenStore.setToken(null) // ล้าง Token
      authenStore.setUser(null)  // ล้างข้อมูล User
      // สั่งให้เปลี่ยนหน้าไปที่ route ชื่อ 'login'
      this.$router.push({ name: 'login' }) 
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteUser(user){
      let result = confirm("คุณต้องการลบข้อมูลใช่หรือไม่?") // เพิ่ม confirm ให้นิดนึงกันพลาดครับ
      if(result){
        try {
            await UsersService.delete(user)
            this.refreshData()
        } catch (err) {
            console.log(err)
        }
      }
    },
    async refreshData(){
      this.users = (await UsersService.index()).data
    }
  },

};
</script>

<style scoped>
/* CSS เฉพาะหน้านี้ */
</style>