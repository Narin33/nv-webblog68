import axios from 'axios'
import { useAuthenStore } from '../stores/authen' // 1. นำเข้า Store (ใช้ .. แทน @)

export default () => {
  const authenStore = useAuthenStore() // 2. ดึงข้อมูลจาก Store

  return axios.create({
    baseURL: 'http://localhost:8081/',
    headers: {
      // 3. แนบ Token ไปใน Header ชื่อ Authorization
      // รูปแบบคือ "Bearer <token>"
      Authorization: `Bearer ${authenStore.token}`
    }
  })
}