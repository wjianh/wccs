//对调用store中action中请求的封装
import store from '../store/index';

//接收两个参数，第一个是action方法名称，第二个是传入数据
const useStoreAc =function(actionName,data){
  let response = null;
  if(data == null){//如果传入的数据为空，那么不用给下一步传入参数
    response = store.dispatch(actionName);//调用store中的网络请求方法,不给后台传参
  }else{
    response = store.dispatch(actionName,data);//调用store中的网络请求，给后台传入参数
  }
  response.then(res => {
    return res;
  }).catch(error => {
    return error;
  });
}

export {useStoreAc};