import axios from 'axios';
import { Message, MessageBox, Loading } from 'element-ui';
import { getCookieToken } from './utils';
import { BASEURL, BASELOGINURL } from './config';

let loading;
let reqConfig;

const errorHandle = status => {
  // 判断状态码
  switch (status) {
    case 500:
      Message({
        message: '找不到此服务，可能是在路上~',
        type: 'error',
        duration: 3 * 1000
      });
      break;
    case 503:
      Message({
        message: '服务器开小差了~请稍后',
        type: 'error',
        duration: 3 * 1000
      });
      break;
    default:
      Message({
        message: '网络错误',
        type: 'error',
        duration: 3 * 1000
      });
  }

  return { data: '' };
};

const service = axios.create({
  baseURL: BASEURL,
  timeout: 50000,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  withCredentials: true
});

/**
 *  code：’0’：请求成功；
    code：’10’：无权限，需要登录，将页面跳转至登录页；
 */

// request拦截器
service.interceptors.request.use(
  config => {
    reqConfig = config;
    if (config.url === '/companyHome/getMyCenterInfo' || config.url === '/companyHome/getMyCompanys') {
      config.baseURL = BASELOGINURL;
    }
    loading = Loading.service({
      lock: true,
      text: '加载中......',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    // config.headers['Authorization'] = encodeURIComponent(getCookieToken());
    config.headers['Authorization'] = 'TNA5UAgSS%2FkKw8d45RcoONS5dduywYxfXT8diDnatAoE5%2F4To09L1OTmLf3mKFBMTKjCgtY296QniVMFvBDqE0DtPWiME%2Bc%2FL0a3pjMiikEdquNymf26bwQbmGRDAmzK';
    return config;
  },
  error => {
    console.error(error);
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  // 请求成功
  res => {
    loading.close();
    if (res.data.code == '10') {
      MessageBox.confirm(
        '无权限，需要登录，将页面跳转至登录页',
        {
          confirmButtonText: '登录',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }
      ).then(() => {
        location.href = BASELOGINURL + '/user/login.html?redirect=' + encodeURIComponent(location.href);
      });
    } else if (res.data.code != '0') {
      Message({
        message: res.data.msg || '操作失败',
        type: 'error',
        duration: 3 * 1000
      });
    }
    if (reqConfig.method === 'put') {
      return Promise.resolve(res);
    }
    return Promise.resolve(res.data);
  },
  err => {
    loading.close();
    const { response } = err;
    if (response) {
      errorHandle(response.status, response.data);
      return Promise.reject(response.data);
    }
    return { data: '' };
  }
);

export default service;
