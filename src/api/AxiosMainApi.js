import axios from '../network/axiosconfig';
import router from '../router/index';
import store from '../store/index';
import { message } from '@/utils/message.js'

const MainAxios = axios.create({//关于menu的网络请求axios
  baseURL: 'http://localhost:8080/wccs',
  timeout: '5000',
  responseType: 'json',   // 响应数据格式
  responseEncoding: 'utf8',  // 响应数据编
  // withCredentials: true,
});
MainAxios.interceptors.request.use(
  config => {
    config.responseType='json';  // 响应数据格式
    config.responseEncoding='utf-8';
    const tokenStr = sessionStorage.getItem("token");
    if(tokenStr != null && tokenStr!= undefined){
      config.headers.common['Authorization'] =tokenStr;//将token注入请求头，方便后面可以解析token
    }
    return config;
  },
  error =>{
    return Promise.reject(error);
});
//http reponse响应拦截器
MainAxios.interceptors.response.use(
  response =>{
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error=>{
    if(error.response){
      switch(error.response.status){
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          message(true,'登陆过期，请重新登陆！!','error');
          store.commit('RMV_TOKEN');
          let redirectRoute = router.currentRoute.fullPath;
          router.replace({
            path: '/login',
            query: {redirect: redirectRoute}//登录成功后跳入浏览的当前页面
          })
          break;

        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          message(true,'登录过期，请关闭重新进入!','error');
          store.commit('RMV_TOKEN');
          let redirectRoute2 = router.currentRoute.fullPath;
          router.replace({
            path: '/login',
            query: {redirect: redirectRoute2}//登录成功后跳入浏览的当前页面
          })
          // 清除token
          break;

        // 404请求不存在
        case 404:
          router.replace({
            path: '/notfound',
          });
          message(true,'您访问的网页不存在!','error');
          break;
        // 其他错误，直接抛出错误提示
        case 500:
          message(true,'后台系统错误!','error');
          break;
        default:
          message(true,error.response.data.message,'error');
          break;
      }
      return Promise.reject(error.response);
    }
});

export {MainAxios};