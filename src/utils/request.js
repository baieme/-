import axios from 'axios';
import store from '@/store/index.js'
const request = axios.create({
  baseURL:"http://toutiao.itheima.net/",
})
request.interceptors.request.use(config=>{
  const {state} =  store;
  console.log(state.user,'asdf')
  if(state.user?.token){
    config.headers.Authorization = `Bearer ${state.user.token}`
  }
  return config
})
export default request;
