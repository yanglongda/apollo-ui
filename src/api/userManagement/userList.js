import request from '@/utils/request'

// 单位列表
export function getPage(form){
    return request({
      url: '/api/person/page',
      method: 'post',
      data:form
    })
}
//部门列表
export function handleQuery(form){
  
  return request({
    url:'/api/dept/page',
    method:'post',
    data:form
  })
}
//部门层级列表
export function levels(){
  
  return request({
    url:'/api/dept/levels',
    method:'get',
  })
}
//新增
export function addPost(form){
  return request({
    url:'/api/post',
    method:'post',
    data:form
  })
}
export function addPost2(form){
  return request({
    url:'/api/post',
    method:'put',
    data:form
  })
}
// 查询
export function getPost(id){
  return request({
    url:"/api/post/"+id,
    method:'get',
  })
}
export function deletePost(id){
    return request({
      url:"/api/post/"+id,
      method:'delete',
    })
  }
