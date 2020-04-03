import axios from 'axios'
import Nprogress from 'nprogress'
Nprogress.configure({ showSpinner: false })

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 12000,
  headers: {
    'content-Type': 'application/json',
    Accpet: 'application/json'
  }
})
// 请求拦截器
request.interceptors.request.use(
  (config) => {
    Nprogress.start()
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// 响应拦截器
request.interceptors.response.use(
  (reponse) => {
    Nprogress.done()
    return reponse
  },
  (error) => {
    Nprogress.done()
    return Promise.reject(error)
  }
)
export default request
