import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    authInfo: window.localStorage.getItem('authInfo') ? JSON.parse(window.localStorage.getItem('authInfo')) : '',
    newsNum: 0
  },
  getters:{
    getAuthInfo (state) {
      return state.authInfo
    },
    getNewsNum (state) {
      return state.newsNum
    }
  },
  actions:{
    setAuthInfo({commit, state}, val){
      commit("setCount", val)
    },
    saveNewsNum({commit, state}, val){
      commit("SaveNewsNum", val)
    }
  },
    mutations: {
      setCount (state, val) {
        state.authInfo = val
      },
      SaveNewsNum (state, val) {
        state.newsNum = val
      }
    }
})
export default store
