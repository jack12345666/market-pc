import request from '@/utils/request'
import { stringify } from 'qs'

// 获取分类列表
export function getCategoryList() {
  return request({
    url: '/common/treeGoodsCategorys',
    method: 'post'
  })
}

// 获取商品列表
export function getGoodsList(data) {
  return request({
    url: '/goods/list',
    method: 'post',
    data: stringify(data)
  })
}

// 商品详情
export function getGoodsDetail(id) {
  return request({
    url: '/goods/detail',
    method: 'post',
    data: `id=${id}`
  })
}


// 商品直接申请
export function toOrderGoods(data) {
  return request({
    url: '/order/addByGoods',
    method: 'post',
    data: stringify(data)
  })
}

// 店铺详情
export function getStoreDetail(id) {
  return request({
    url: '/store/detail',
    method: 'post',
    data: `id=${id}`
  })
}


// 加入购物车
export function addCart(data) {
  return request({
      url: '/cart/add',
      method: 'post',
      data: stringify(data)
  })
}

// 下单
export function toAddOrder(ids) {
  return request({
      url: '/order/add',
      method: 'post',
      data: `cartIds=${ids}`
  })
}

// 移除购物车商品
export function removeCartGoods(data) {
  return request({
      url: '/cart/remove',
      method: 'post',
      data: stringify(data)
  })
}

// 购物车列表
export function cartList(data) {
  return request({
      url: '/cart/list',
      method: 'post',
      data: stringify(data)
  })
}

// 清空购物车
export function removeAllCart() {
  return request({
      url: '/cart/removeAll',
      method: 'post',
  })
}
