
import {MainAxios} from '../AxiosMainApi';

const loginApi = function (username, password,yzm) { //登录接口
  return MainAxios({ //使用封装好的 axios 进行网络请求。返回一个promise对象倒是调用函数后直接可以使用then回调
    url: '/xtgly/login',
    method: 'post',
    data: { //提交的数据
      "username":username,
      "password":password,
      "yzm":yzm
    }
  });
}

const getXtglyApi = function (data){
  return MainAxios({
    url: '/xtgly/getxtgly',
    method: 'post',
    data: data,
  });
}

const AxiosApi = function (url,meth,rqdata){
  let response = null;
  if(rqdata == null){//如果参数为空，则不传入参数
    response = MainAxios({//axois请求返回一个promise对象
      url: url,
      method: meth,
    });
    
  }else{//如果参数不为空，那么传入参数
    response = MainAxios({
      url: url,
      method: meth,
      data: rqdata,
    });
  }
  return response;
 
}

export {loginApi,getXtglyApi,AxiosApi}