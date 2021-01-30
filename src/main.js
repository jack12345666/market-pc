import Vue from 'vue'
import CommonLayout from '@/components/commonLayout'
import 'normalize.css/normalize.css' 
import ElementUI from 'element-ui'
import '@/styles/element-ui.scss'
import App from './App.vue'
import router from './router'
import store from './store'
import * as filters from './utils/filters'
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})


Vue.use(ElementUI)
Vue.component('common-layout',CommonLayout)



Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
