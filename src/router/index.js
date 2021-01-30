import Vue from 'vue'
import Router from 'vue-router'
import MainIndex from '@/views/index/index'
import GoodsDetail from '@/views/goodsDetail'
import Cart from '@/views/cart'
import StoreDetail from '@/views/storeDetail'
import Active from '@/views/active'
import ActiveDetail from '@/views/activeDetail'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    { path: '/', component: MainIndex, hidden: false, name: 'index', meta: {title: '钱塘新区投资之家-资源超市'} }, 
    { path: '/cart', component: Cart, hidden: false, name: 'cart', meta: {title: '钱塘新区投资之家-资源超市'}}, 
    { path: '/goodsDetail/:id', component: GoodsDetail, hidden: false, name: 'goodsDetail', meta: {title: '钱塘新区投资之家-资源超市'}}, 
    { path: '/storeDetail/:id', component: StoreDetail, hidden: false, name: 'storeDetail', meta: {title: '钱塘新区投资之家-资源超市'}}, 
    { path: '/activity', component: Active, hidden: false, name: 'activity', meta: {title: '钱塘新区投资之家-活动安排'}}, 
    { path: '/activityDetail/:id', component: ActiveDetail, hidden: false, name: 'activityDetail', meta: {title: '钱塘新区投资之家-活动详情'}}, 
    { path: '/redirect/:path*',component: () => import('@/views/redirect/index')},
  ]
})

router.beforeEach((to, from, next) => {
	if (to.name) {
    document.title = to.meta.title;
  }else{
    document.title = '杭州钱塘新区投资之家-资源超市'
  }
  next()
})

export default router
