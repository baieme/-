import request from '@/utils/request';

//获取文章详情
export const getDetail = (id)=>{
    return request({
      url:`/v1_0/articles/${id}`,
      method:'get'
    })
}


//收藏文章
export const article = id=>{
  return request({
    url:'/v1_0/article/collections',
    method:'post',
    data:id
  })
}


//取消收藏文章
export const cancalArticle = id=>{
  return request({
    url:`/v1_0/article/collections/${id}`,
    method:'DELETE',
  })
}


//获得文章评论
export const comment = id=>{
  return request({
    url:'/v1_0/comments',
    method:'get',
    params:id
  })
}


//对文章进行评论
export const getComment = data => {
  return request({
    url:"/v1_0/comments",
    method:'post',
    data
  })
}


