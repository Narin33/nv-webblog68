import { defineStore } from 'pinia'

export const useAuthenStore = defineStore('authen', {
  state: () => ({
    token: null,
    user: null
  }),
  getters: {
    // ฟังก์ชันเช็คสถานะว่าล็อกอินอยู่ไหม (ถ้ามี Token แปลว่าล็อกอินแล้ว)
    isUserLoggedIn: (state) => !!state.token
  },
  actions: {
    setToken(token) {
      this.token = token
    },
    setUser(user) {
      this.user = user
    },
    // ฟังก์ชันล้างค่าสำหรับ Logout
    logout() {
      this.token = null
      this.user = null
    }
  },
  // บันทึกข้อมูลลง LocalStorage อัตโนมัติ (รีเฟรชหน้าเว็บแล้วไม่หลุด)
  persist: true
})