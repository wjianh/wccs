import Vue from 'vue';
import App from './App.vue';
import router from './router';//引入路由
import store from './store/index' //引入 Vuex 状态管理
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/';
import axios from 'axios';
//import axiosInit from "./network/user/login";   // 引用axios全局配置

Vue.use(ElementUI);
//Vue.http.options.xhr = { withCredentials: true }
//把axios 作为Vue的原型属性
//Vue.prototype.axios = axiosInit;
//axios.defaults.withCredentials = true;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
