import {MainAxios} from '../AxiosMainApi';

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

export {
  AxiosApi,
}