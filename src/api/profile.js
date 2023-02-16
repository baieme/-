import request from '@/utils/request';

//获得用户的个人信息
export const message = ()=>{
  return request({
    url:'/v1_0/user/profile',
    method:'get'
  })
}


//编辑用户个人信息


