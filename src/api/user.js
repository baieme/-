import request from '@/utils/request.js'
//进行登录的验证
export const getSubmit = (data)=>{
  return request({
    url:"/v1_0/authorizations",
    method:'post',
    data
  })
}
//获取验证码
export const getMessage = (mobile)=>{
  return request({
    url:`/v1_0/sms/codes/${mobile}`,
    method:'get',
  })
}

//获得登录人的信息
export const getImformation = ()=>{
  return request({
    url:'v1_0/user',
    method:'get'
  })
}




