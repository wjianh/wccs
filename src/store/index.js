import Vue from 'vue' //引入 Vue
import Vuex from 'vuex' //引入 Vuex
import userStore from './models/userStore.js' //引入 user module
import xtglStore from './models/xtglStore.js' //引入 menu module
 
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    userStore, //使用 user.js 中的 action
    xtglStore,
  },
})
 
export default store