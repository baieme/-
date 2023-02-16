import axios from "axios";
import store from "@/store/index.js";
import jsonBig from 'json-bigint'
const request = axios.create({
  baseURL: "http://toutiao.itheima.net/",
  // transformRequest: [
  //   function (data) {
  //     try {
  //       // 如果转换成功则返回转换的数据结果
  //       return jsonBig.parse(data);
  //     } catch (err) {
  //       // 如果转换失败，则包装为统一数据格式并返回
  //       return data
  //     }
  //   },
  // ],
});
request.interceptors.request.use((config) => {
  const { state } = store;
  console.log(state.user, "asdf");
  if (state.user?.token) {
    config.headers.Authorization = `Bearer ${state.user.token}`;
  }
  return config;
});
export default request;
