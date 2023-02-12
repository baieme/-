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

// 获取全部频道列表
export const allVideo = ()=>{
  return request({
    url:"/v1_0/channels",
    method:'get'
  })
}

// 增加用户频道
export const add = (channel)=>{
  return request({
    url:"v1_0/user/channels",
    method:'PATCH',
    data:{channel}
  })
}


//删除用户频道
export const delChannel=(id)=>{
  return request({
    url:`v1_0/user/channels/${id}`,
    method:'DELETE'
  })
}
