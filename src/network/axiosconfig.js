//对axios的封装,所有关于user的网络请求的axios 模块
import axios from 'axios';


//Vue.prototype.$http = axios;   // 添加原型方法，这样创建的对象就自带该方法了。
axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true;  //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
axios.defaults.headers.common['Authorization'] = ''; // 设置请求头为 Authorization

export default axios;

