import axios from 'axios';
import qs from 'qs';
import store from '../store/index';
import router from "../router/index";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// import url from './base';

// const env = process.env.NODE_ENV;

// axios 配置
axios.defaults.timeout = 30000;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.baseURL = 'http://192.168.19.53:8080';
// axios.defaults.baseURL = 'http://192.168.19.14:8080';
axios.defaults.withCredentials = 'true';
//POST传参序列化
axios.interceptors.request.use((config) => {
    let res = window.sessionStorage.getItem('token');
    // console.log(res);
    if (typeof res==="string") {
        // console.log(22222222222);
        config.headers.Authorization = `${window.sessionStorage.getItem('token')}`;
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
    return res.status === 200 ? res.data : Promise.reject(res)

}, (error) => {
    switch (error.status) {
        case 403:
            // 返回 403 清除token信息并跳转到登录页面
            store.commit("setLoginToken", ""); //清除token
            store.commit("setLoginInfo", {}); // 清除登录信息
            router.replace({
                path: '/login',
                query: { redirect: router.currentRoute.fullPath }
            });
    }
    return Promise.reject(error);
});

//post方法
export function POST(url, params) {
    return new Promise((resolve, reject) => {
        NProgress.start();
        axios.post(url, params)
            .then(response => {
                resolve(response);
                NProgress.done();
            })
            .catch((error) => {
                reject(error);
                // router.push("/notFound");
                NProgress.done();
            })
    })
}

//get方法
export function GET(url, data) {
    return new Promise((resolve, reject) => {
        NProgress.start();
        axios
            .get(url, { params: data })
            .then(res => {
                resolve(res);
                NProgress.done();

            })
            .catch(error => {
                reject(error);
                // router.push("/notFound");
                NProgress.done();
            })
    })
}