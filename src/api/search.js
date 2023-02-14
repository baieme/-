import request from '@/utils/request.js';


//联想建议
export const suggesstion = (params)=>{
  return request({
    url:'/v1_0/suggestion',
    method:'get',
    params
  })
}

//获得搜索结果
export const result = (params)=>{
  return request({
    url:"/v1_0/search",
    method:'get',
    params,
  })
}

//获得用户搜索历史
export const history = ()=>{
  return request({
    url:'/v1_0/search/histories',
    method:"get"
  })
}
