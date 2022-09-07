// 下载axios包 yarn add axios
// 引入axios
// 配置 axios
import axios from 'axios'
// 克隆一个axios
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 5000
})
// 暴露克隆的axios
export default request
