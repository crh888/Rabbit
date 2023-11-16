import axios from 'axios'
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user.js'
import router from "@/router";

// axios基础封装
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})


// 请求拦截器
httpInstance.interceptors.request.use(config => {
  const userStore = useUserStore()
  const token = userStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))
//  响应拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  const userStore = useUserStore()
  // 统一错误提示
  ElMessage({
    type: 'error',
    message: e.response.data.message
  })
  // token 401 处理
  if (e.response.status == 401) {
    // 清楚用户数据
    userStore.clearUserInfo()
    // 跳转登录页
    router.replace('/login')
  }
  return Promise.reject(e)
})

export default httpInstance