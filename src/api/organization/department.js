 import request from '@/utils/request'
import { Form } from 'element-ui'

// 单位列表
export function getList(){
  return request({
    url: '/api/unit/list',
    method: 'get'
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
export function addDept(form){
  return request({
    url:'/api/dept',
    method:'post',
    data:form
  })
}
export function addDept2(form){
  return request({
    url:'/api/dept',
    method:'put',
    data:form
  })
}
// 查询上级部门
export function getParent(unitId){
  return request({
    url:"/api/dept/"+unitId+"/unit",
    method:'get',
  })
}
//详情
export function getDept(id){
  return request({
    url:"/api/dept/"+id,
    method:'get',
  })
}
//删除
export function deleteDept(id){
  return request({
    url:"/api/dept/"+id,
    method:'delete',
  })
}

