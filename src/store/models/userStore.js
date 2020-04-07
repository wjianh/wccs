
//配置关于user的访问方法
// localStorage u存储方法比cookies 要有优势
// sessionStorage 存储方法比起localStorage 区别在于它存入的数据有时效性，只作用于当前会话，会话结束就清除

import { loginApi, getXtglyApi, AxiosApi} from '../../api/login/loginApi'//引入登录 api 接口

//import '../../utils/auth'//引入cookies,保存登陆状态
 
const user = {
  state: {
    isLogin: '0',
    xtglyObj: {},
    token:sessionStorage.getItem('token') ? sessionStorage.getItem('token'):'',   // token
    menuList: [],
  },
  getters:{    // 监听数据变化的
		getStorage(state){   // 获取本地存储的登录信息
      if(!state.token){
        state.token =JSON.parse(sessionStorage.getItem("token"))//将localStorage存放的String类型的token转为JSON类型
      }
      return state.token
    },
    getIsLogin(state){
      return state.isLogin;
    },

	},
  actions: {
    // 登录
    Login({ commit }, userInfo) { //定义 Login 方法，在组件中使用 this.$store.dispatch("Login") 调用
      const username = userInfo.username;//用户名
      const password = userInfo.password;//密码
      const yzm = userInfo.yzm;//验证码
      return new Promise((resolve, reject) => { //封装一个 Promise
        const response = loginApi(username, password,yzm);//返回一个promise对象
        response.then(res => { //然后将response对象处理找出服务器返回的相应对象
          resolve(res);
        }).catch(error => {
            reject(error);
        })
      });
    },
    getXtgly({ commit },data){//查询获取系统管理员列表
      return new Promise((resolve, reject) => { //封装一个 Promise
        const response = getXtglyApi(data);//返回一个promise对象
        response.then(res => { //然后将response对象处理找出服务器返回的相应对象
          resolve(res);
        }).catch(error => {
            reject(error);
        });
      });
    },
    addXtgly({commit}, data){
      return AxiosApi('/xtgly/addxtgly','post',data);
    },
    updateXtgly({commit}, data){
      return AxiosApi('/xtgly/updatextgly','post',data);
    },
    selectXtglyByPrimery({commit}, data){//查询系统管理员，根据glybh，zzbm 去删除
      return AxiosApi('/xtgly/getxglybypri','post',data);
    },
    removeXtgly({commit}, data){//删除系统管理员
      return AxiosApi('/xtgly/delxtgly','post',data);
    },
    updateXtglyData({commit}, rqData){
      return AxiosApi('/xtgly/upXtglyData','post',rqData);
    },
    resetGlyPassword({commit}, rqData){
      return AxiosApi('/xtgly/resetPassword', 'post', rqData); 
    },
    loadXtglyData({commit}, rqData){
      return AxiosApi('/xtgly/getXglyData', 'post', rqData); 
    }
  },
  mutations: {
    SET_NAME (state, xtglyObj) { //将登陆管理员账号存入localStorage
      window.sessionStorage.setItem('xtglyObj', xtglyObj);
      state.xtglyObj = xtglyObj;
    },
    SET_TOKEN (state, value) {//存放token
      window.sessionStorage.setItem('token', value);
      state.token = value;
    },
    SET_ISLOGIN (state,value){
      window.sessionStorage.setItem("isLogin",value);
      state.isLogin = value;
    },
    RMV_TOKEN (state) { //删除token
      window.sessionStorage.removeItem('isLogin');
      window.sessionStorage.removeItem('token');
      window.sessionStorage.removeItem('xtglyObj');
      state.token = '';
      state.isLogin = '0';
      state.xtglyObj = {};
    },
    
  }
}
export default user
