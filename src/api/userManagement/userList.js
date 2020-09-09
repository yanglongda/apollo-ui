import request from '@/utils/request'

export function getList(){
  return request({
    url: '/api/unit/list',
    method: 'get'
  })
}
// 单位列表
export function getPage(form){
    return request({
      url: '/api/person/page',
      method: 'post',
      data:form
    })
}
export function getPage2(form){
  return request({
    url: 'api/dept/page',
    method: 'post',
    data:form
  })
}
export function getPage3(form){
  return request({
    url: '/api/post/page',
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
export function getUnit(unitId){
  return request({
    url:'/api/dept/'+unitId+'/unit',
    method:'get',
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
export function addPerson(form){
  return request({
    url:'/api/person',
    method:'post',
    data:form
  })
}
export function addPerson2(form){
  return request({
    url:'/api/person',
    method:'put',
    data:form
  })
}

// 查询
export function getPerson(id){
  return request({
    url:"/api/person/"+id,
    method:'get',
  })
}
export function deletePerson(id){
    return request({
      url:"/api/person/"+id,
      method:'delete',
    })
  }
  // export function exportPerson(id){
  //   return request({
  //     url:"/api/person/export",
  //     method:'get',
  //   })
  // }
  
  