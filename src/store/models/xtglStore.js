import {AxiosApi}from '../../api/xtgl/xtglApi.js';

const xtzzxx = {
  state: {
    formatObj: {},//存放格式化的对象
    xtMenuList: [],//存放系统菜单的集合
    xtRouteList: [],//存放系统菜单路由的集合
    xtZzxxList: [],//存放系统组织还有管理员的集合
    xtZzList: [],//存放系统组织的集合
    mbxRouteList: [],//存放面包屑路由集合
  },
  actions: {
     // 获取菜单list
    getMenuItem({ commit }) { //定义 Login 方法，在组件中使用 this.$store.dispatch("Login") 调用
      return new Promise((resolve, reject) => { //封装一个 Promise
        const response = AxiosApi('/xtgl/getxtgnxx','get');//返回一个promise对象
        response.then(res => { //然后将response对象处理找出服务器返回的相应对象
          const data = res.data;
          if(data[0]){
            commit('SET_MENULIST',data[0]); //提交一个 mutation，通知状态改变
          }else{
            commit('SET_MENULIST',[]); //提交一个 mutation，通知状态改变
          }
          if(data[1]){
            commit('SET_ROUTELIST',data[1]); //提交一个 mutation，通知状态改变
          }else{
            commit('SET_ROUTELIST',[]); //提交一个 mutation，通知状态改变
          }
          resolve(res);
        }).catch(error => {
            reject(error);
        })
      });
    },
    // 系统组织
    getXtzzxx({ commit }) { //
      return new Promise((resolve, reject) => { //封装一个 Promise
        const response = AxiosApi('/xtgl/getxtzzgly','get');//返回一个promise对象
        response.then(res => { //然后将response对象处理找出服务器返回的相应对象
          const data = res.data;
          commit('SET_XTZZXX',data); //提交一个 mutation，通知状态改变
          resolve(res);
        }).catch(error => {
            reject(error);
        })
      });
    },
    getXtAllGn({commit},glybh) {//获取分配给该角色未分配的所有功能
      return AxiosApi('/xtgl/getxtallgnxx','post',{"glybh": glybh});
    },

    addXtGn({commit},data) {//提交新增的功能
      return new Promise((resolve,reject) => {
        const response = AxiosApi('/xtgl/updateXtgnQx','post',data);
        response.then(res => {
          resolve(res);
        }).catch(error => {
          reject(error);
        })
      });
    },
    getXtZz({commit}){
      return new Promise((resolve,reject) => {
        const response = AxiosApi('/xtgl/getxtzzxx','get');
        response.then(res => {
          commit('SET_XTZZ',res.data); 
          resolve(res);
        }).catch(error => {
          reject(error);
        })
      });
    },
    getXtdm({commit},rqData){
      return new Promise((resolve,reject) => {
        const response = AxiosApi('/xtgl/getxtdm','post',rqData);
        response.then(res => {
          resolve(res);
        }).catch(error => {
          reject(error);
        })
      });
    },
    deleteXtdm({commit},rqData){
      return new Promise((resolve,reject) => {
        const response = AxiosApi('/xtgl/deleteXtdm','post',rqData);
        response.then(res => {
          resolve(res);
        }).catch(error => {
          reject(error);
        })
      });
    },
    delSelectXtdm({commit},rqData){
      return new Promise((resolve,reject) => {
        const response = AxiosApi('/xtgl/delSelectXtdm','post',rqData);
        response.then(res => {
          resolve(res);
        }).catch(error => {
          reject(error);
        })
      });
    },
    getFormatList({commit}){
      return new Promise((resolve,reject) => {
        const response = AxiosApi('/xtgl/getformater','get');
        response.then(res => {
          commit('SET_FORMARLIST',res.data); //提交一个 mutation，通知状态改变
          resolve(res);
        }).catch(error => {
          reject(error);
        })
      });
    },
    addXtdm({commit},rqData){
      return new Promise((resolve,reject) => {
        const response = AxiosApi('/xtgl/addXtdm','post',rqData);
        response.then(res => {
          resolve(res);
        }).catch(error => {
          reject(error);
        })
      }); 
    },
    loadXtdmChild({commit},rqData){
      return new Promise((resolve,reject) => {
        const response = AxiosApi('/xtgl/loadXtdmChilds','post',rqData);
        response.then(res => {
          resolve(res);
        }).catch(error => {
          reject(error);
        })
      }); 
    },
    updateXtdm({commit},rqData){
      return new Promise((resolve,reject) => {
        const response = AxiosApi('/xtgl/updateXtdm','post',rqData);
        response.then(res => {
          resolve(res);
        }).catch(error => {
          reject(error);
        })
      }); 
    },
    delCheckXtglys({commit},rqData){
      return new Promise((resolve,reject) => {
        const response = AxiosApi('/xtgly/delxtglys','post',rqData);
        response.then(res => {
          resolve(res);
        }).catch(error => {
          reject(error);
        })
      }); 
    }
  },
  mutations: {
    SET_MENULIST (state, value) { //将菜单列表存入localStorage
      state.xtMenuList = value;
    },
    SET_ROUTELIST (state, value) { //将菜单路由存入localStorage
      state.xtRouteList = value;
    },
    SET_XTZZXX (state, value){//同步系统组织信息列表里面包括管理员
      state.xtZzxxList = value;
    },
    SET_XTZZ (state, value){//同步系统组织，
      state.xtZzList = value;
    },
    SET_MBXROUTE (state, value){
      state.mbxRouteList = value;
    },
    SET_FORMARLIST (state, value) { //将登陆管理员账号存入localStorage
      state.formatObj = value;
    },
  },
}
export default xtzzxx;