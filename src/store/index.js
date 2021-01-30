import Vue from 'vue'
import Vuex from 'vuex'
import market from './modules/market'
import activity from './modules/activity'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
   market,
   activity
  }
})

export default store
