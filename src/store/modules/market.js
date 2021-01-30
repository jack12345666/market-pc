const state = {
   serviceFirst: [],
   serviceSecond: [],
   serviceObj: [],
   orgSize: [],
   serviceType: [],
   moneyMode: [],
}

const mutations = {
  changeServiceFirst(state, payload) {
      state.serviceFirst = payload
  },
  changeServiceSecond(state, payload) {
    state.serviceSecond = payload
  },
  changeServiceObj(state, payload) {
    state.serviceObj = payload
  },
  changeOrgSize(state, payload) {
    state.orgSize = payload
  },
  changeServiceType(state, payload) {
    state.serviceType = payload
  },
  changeMoneyMode(state, payload) {
    state.moneyMode = payload
  }
}

export default {
    namespaced: true,
    state,
    mutations
}