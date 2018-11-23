import axios from 'axios';
import { Message } from 'element-ui';
import auth from '$util/auth';
import Router from '../router/index';


export const MOCK_API = 'http://118.190.150.55/file_system';
// export const MOCK_API = 'http://192.168.1.182:8080/file_system';
// export const MOCK_API = ' ';
// export const MOCK_API = 'http://192.168.1.140:8080/file_system';

// create an axios instance
const service = axios.create({
  baseURL: MOCK_API, // api的base_url
  // timeout: 10000, // request timeout
});


service.defaults.withCredentials = true;


// #endregion
// download url
const downloadUrl = (url) => {
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = url;
  iframe.onload = function () {
    document.body.removeChild(iframe);
  };
  document.body.appendChild(iframe);
};
// Add a response interceptor
// service.interceptors.response.use((res) => {
//   // 处理excel文件
//   if (res.headers && (res.headers['content-type'] === 'application/x-msdownload' || res.headers['content-type'] === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
//     downloadUrl(res.request.responseURL);
//   }
// }, error =>
//   // Do something with response error
//   Promise.reject(error.response.data || error.message),
// );


// 发送请求前处理request的数据
service.defaults.transformRequest = [(data) => {
  if (data instanceof FormData) {
    return data;
  } else if (data !== undefined) {
    const newData = new FormData();
    for (const k of Object.keys(data)) {
      newData.append(k, data[k]);
    }
    return newData;
  }
}];

// request interceptor
service.interceptors.request.use((config) => {
  config.headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  config.withCredentials = true;
  // Do something before request is sent
  if (auth.getToken()) {
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers.token = auth.getToken();
  }
  return config;
}, (error) => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
});

// respone interceptor
service.interceptors.response.use(
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过xmlhttprequest来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  (response) => {
    if (response.data.status === 10001) {
      Message({
        message: response.data.desc,
        type: 'error',
        duration: 5 * 1000,
      });
      Promise.reject(`error ${response.data.desc}`);
      setTimeout(() => {
        Router.push(auth.getLoginPath());
        auth.logout();
      }, 1000);
    }
    // else if (response.headers && (response.headers['content-type'] === 'application/x-msdownload;charset=UTF-8'
    //   || response.headers['content-type'] === 'text/html;charset=UTF-8'
    //   || response.headers['content-type'] === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
    //   console.log(response);
    //   downloadUrl(response.request.responseURL);
    // }
    // if (!response.data.code) {
    //   return response.data;
    // }
    else if (response.data.code === '200' || response.data.code === '300') {
      return response.data;
    } else {
      Message({
        message: response.data.data || response.data.message,
        type: 'error',
        duration: 5 * 1000,
      });
      return Promise.reject(`error ${response.data.data}`);
    }
  },
  (error) => {
    console.log(`err${error}`); // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  });

export default service;
