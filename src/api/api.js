import axios from 'axios';
import qs from 'qs';
import iView from 'iview';
import store from '../store/store';

import router from "../router/index";
import * as types from '../store/types';

import url from './base';

const env = process.env.NODE_ENV;

// axios 配置
axios.defaults.timeout = 30000;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// axios.defaults.url.baseUrl = `${url.baseUrl}`;
axios.defaults.baseURL = '';
axios.defaults.withCredentials = 'true'
//POST传参序列化
axios.interceptors.request.use((config) => {
  if (store.state.loginToken != "") {
    config.headers.Authorization = `${store.state.loginToken}`;
  }

  if (config.method === 'post') {
    config.data = qs.parse(config.data);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) => {
  return res.status == 200 ? res : Promise.reject(res)

}, (error) => {
  switch (error.response.status) {
    case 403:
      // 返回 403 清除token信息并跳转到登录页面
      store.commit(types.SET_LOGIN_TOKEN, "")
      store.commit(types.SET_LOGIN_INFO, {})
      router.replace({
        path: '/login',
        query: {redirect: router.currentRoute.fullPath}
      });
  }
  return Promise.reject(error);
});

//post方法
export function post(url, params) {
  return new Promise((resolve, reject) => {
    iView.LoadingBar.start();
    axios.post(url, params)
      .then(response => {
        resolve(response);
        iView.LoadingBar.finish();
      })
      .catch((error) => {
        reject(error);
      })
  })
}

//get方法
export function get(url, params) {
  return new Promise((resolve, reject) => {
    //console.info(params);
    iView.LoadingBar.start();
    axios.get(url, params)
      .then(response => {
        resolve(response);
        iView.LoadingBar.finish();
      })
      .catch((error) => {
        reject(error);
      })
  })
}