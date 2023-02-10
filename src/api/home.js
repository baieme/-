import request from '@/utils/request.js';
//获取用户频道列表
export const channel = ()=>{
  return request({
    url:'v1_0/user/channels',
    method:'get'
  })
}
