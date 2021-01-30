import request from '@/utils/request';
import { stringify } from 'qs';

// 活动列表
export function getActivityList(data) {
  return request({
    url: '/activity/listOnlyPass',
    method: 'post',
    data: stringify(data)
  });
}

// 活动详情
export function getActivityDetail(id) {
  return request({
    url: '/activity/detail',
    method: 'post',
    data: `id=${id}`
  });
}

// 活动报名
export function enrollActivity(data) {
  return request({
    url: '/activity/enroll',
    headers: { 'Content-Type': 'application/json' },
    method: 'post',
    data: data
  });
}

// 获取个人信息
export function getMyInfo() {
  return request({
    url: '/companyHome/getMyCenterInfo',
    method: 'post'
  });
}

// 活动报名详情
export function getEnrollDetail(data) {
  return request({
    url: '/activity/listMyEnroll',
    method: 'post',
    data: stringify(data)
  });
}

// 活动报名具体人员详情
export function getEnrollMemberInfo(id) {
  return request({
    url: '/activity/enrollDetail',
    method: 'post',
    data: `id=${id}`
  });
}

// 获取我的公司
export function getMyCompanys(data) {
  return request({
    url: '/companyHome/getMyCompanys',
    method: 'post',
    data: stringify(data)
  });
}
