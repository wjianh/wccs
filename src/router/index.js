import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import { Message } from 'element-ui'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
   //登录页面
  {
    path: '/login',
    name: '登陆',
    component: () => import('../views/login/Login.vue'),
    query: { redirect: to.fullPath } // 将要跳转路由的path作为参数，传递到登录页面
  },
  {
    path: '/home',
    name: '主页',
    component: () => import('../views/home/Home.vue'),
    meta: {requiresAuth : true},
    children: []
  },
  {
    path: '/aboutMe',
    name: '我的资料',
    component: ()=> import('views/about/AboutMe.vue'),
  },
  {
    path: '*',
    name: '页面404',
    component: () => import('../views/Error404.vue'),
  }
]

//存放路由对象的list可用来做面包屑的路由列表
let routeList = [];

//配置router只有携带token后才能跳转其他页面
const router= new VueRouter({
  routes,
});


router.beforeEach((to, from, next) => {//to要跳转到的页面，from要从那个页面跳转过去，next回调函数
  if(sessionStorage.token && sessionStorage.isLogin){//如果缓存存放的有登陆token，直接加载路由
    if(to.path === '/login'){
      Message({
        showClose: true,
        message: '检测到您已登陆，正在跳转主页面!',
        type: 'success'
      });
      next({path: '/'});
    }else{
      addRouteList(to);//面包屑路由动态添加
      loadFormatList();
      loadRoutes();
      loadXtzzxx();
      next();
    }
  }else{//没有登陆
    if(to.path !== '/login'){//没有登陆情况下跳转其他页面
      Message({
        showClose: true,
        message: '检测到您还没有登陆，请登录!',
        type: 'error'
      });
      next({path: '/login'});
    }else{
      next();
    }

  }
});

//添加动态面包屑路由
export const addRouteList = (to) => {
  if(to.path != '/login' && to.name !='页面404' ){//如果跳转的路由不为login 或者 404页面,那么再执行添加面包屑路由操作
    if(routeList.length != 0){
      let flag = false;//默认是不存在该路由
      routeList.forEach(item => {
        if(item.path === to.path){//证明已经存在该路由了就不用添加了
          flag = true;
          return;//结束循环
        }
      });
      if(flag == false){//说明不存在该路由，直接添加进去
        routeList.push(to);
        store.commit("SET_MBXROUTE", routeList);//设置面包屑路由
      }
    }else{//说明routeList为空，那么直接添加进去
      routeList.push(to);
      store.commit("SET_MBXROUTE", routeList);//设置面包屑路由
    }
  }
}

export const loadRoutes = () => {
  //当组件加载后进行网络请求获取菜单
  if(store.state.xtglStore.xtRouteList.length == 0){//防止第二次请求菜单
    const response = store.dispatch("getMenuItem");//调用store 里面的getMenu方法返回一个promise对象
    response.then(res => {
      if(res.data[1]){
        const routerList = getFormatRoutes(res.data[1]);//格式化router对象
        addMenuRoutes(routerList);//调用该方法将路由对象添加到home下面的children下
      }
    });
  }
  else{//如果store存放的系统菜单路由列表为不为空，直接取出加载路由
    const routerList = getFormatRoutes(store.state.xtglStore.xtRouteList);
    addMenuRoutes(routerList);
  }
}

export const loadFormatList = () => {
  if(JSON.stringify(store.state.xtglStore.formatObj) === '{}' ){//判断格式对象是否为空，如果为空则发送请求
    const response = store.dispatch("getFormatList");//调用store 里面的getMenu方法返回一个promise对象
    response.then(res => {
      //store.commit("SET_FORMARLIST",res.data);//格式化router对象
    });
  }
}


export const getFormatRoutes = (data) => {
  let routerList = [];
  data.forEach(item => {
    if(item.children != null && item.children.length!=0){
      item.children.forEach(item2 => {
        let childRouObj = {
          path: item2.url,
          name: item2.name,
          component: resolve => require([`../views/${item2.zjljdz}.vue`], resolve),
        }
        routerList.push(childRouObj);//将组件链接地址添加到列表里面
      })
    }
  });
  return routerList;
}

//将格式化出来的路由添加进入现有路由/home的下面作为子路由
export const addMenuRoutes = (data) =>{
  if(router.options.routes[2].children.length == 0 ){
    router.options.routes[2].children = data;
    router.addRoutes(router.options.routes);
  }
}

export const loadXtzzxx = () => {
  if(store.state.xtglStore.xtZzxxList.length == 0){//如果系统组织信息列表为空
    const response = store.dispatch("getXtzzxx");//调用store 里面的getMenu方法返回一个promise对象
    response.then(res => {
    });
  }
}

export default router;


