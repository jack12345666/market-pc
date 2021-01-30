const state = {
    activityDetail: null,
 }
 
 const mutations = {
   changeActivityDetail(state, payload) {
       state.activityDetail = payload
   },
  
 }
 
 export default {
     namespaced: true,
     state,
     mutations
 }