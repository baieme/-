import request from '@/utils/request.js';
//获取用户频道列表
export const channel = ()=>{
  return request({
    url:'v1_0/user/channels',
    method:'get'
  })
}

//频道新闻推荐
export const recommand = (params)=>{
  return request({
    url:"v1_0/articles",
    method:'get',
    params
  })
}
