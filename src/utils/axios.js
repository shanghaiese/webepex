import axios from "axios";
import store from "@/store";
import {Message} from "element-ui";

// 基础设置
// axios.defaults.timeout = 7000;
axios.defaults.headers.Accept = '*/*';
axios.defaults.headers['Content-Type'] = 'application/json';
// axios.defaults.baseURL = 'http://172.21.51.81:8082/m2vds';
// axios.defaults.baseURL = 'http://172.18.19.179:8082/m2vds';
// axios.defaults.baseURL = 'http://172.21.51.79:8082/m2vds';
// axios.defaults.baseURL = 'http://172.21.51.81:8888/m2vds';
// axios.defaults.baseURL = 'http://20.13.50.115:8088/m2vds';
// axios.defaults.baseURL = 'http://20.13.50.116:8088/m2vds';
// axios.defaults.baseURL = 'http://19.13.50.115:8088/m2vds';
// axios.defaults.baseURL = 'http://19.13.50.116:8088/m2vds';
// axios.defaults.baseURL = 'http://172.21.51.81:8888';
// axios.defaults.baseURL = 'http://172.21.51.81:8888/m2vds';
axios.defaults.baseURL = 'http://172.21.51.82:8888/m2vds';
axios.defaults.withCredentials = true;



// 调用取消token方法
let cancelToken = () => {
    if (typeof store.state.cancelTask.source === 'function') {
        store.state.cancelTask.source('取消上一次请求'); //取消请求
    }
}
// 封装post方法
export function POST(url, data, time) {
    cancelToken();//取消上一次请求；
    let tim = '';
    if(time&&time.timeout) {
        // time不为空，则单独设置超时时间；
        tim = time.timeout;
    }else{
        tim = 10000;
    }
    // 如果不需要被取消掉，则不存储cancelToken;
    let bool = false;
    if(time&&time.notRecord) {
        bool = time.notRecord;
    }
    return new Promise((resolve, reject) => {
        axios
            .post(url, data, {
                timeout: tim,
                cancelToken: new axios.CancelToken(function executor(c) {
                    if(!bool) {
                        store.dispatch('setSourceAsync', c);
                    }
                })
            })
            .then(res => {
                if(res.status===200){
                    resolve(res.data);
                    if(res.data.status!=="0") {
                        // 如果状态不为0，统一提示后台message；
                        Message({
                            message: res.data.message,
                            type: "error"
                        })
                    }
                }               
            })
            .catch(error => {
                if (axios.isCancel(error)) { 
                    return reject("已消上次请求");
                } else {
                    return reject(error);
                }
            })
    })
}
export function GET(url, data, time) {
    cancelToken();//取消上一次请求；
    let tim = '';
    if(time&&time.timeout) {
        // time不为空，则单独设置超时时间；
        tim = time.timeout;
    }else{
        tim = 10000;
    }
    // 如果不需要被取消掉，则不存储cancelToken;
    let bool = false;
    if(time&&time.notRecord) {
        bool = time.notRecord;
    }
    return new Promise((resolve, reject) => {
        axios
            .get(url, { params: data }, {
                timeout: tim,
                cancelToken: new axios.CancelToken(function executor(c) {
                    if(!bool) {
                        store.dispatch('setSourceAsync', c);
                    }
                })
            })
            .then(res => {
                if(res.status===200){
                    resolve(res.data);
                    if(res.data.status!=="0") {
                        // 如果状态不为0，统一提示后台message；
                        Message({
                            message: res.data.message,
                            type: "error"
                        })
                    }
                } 
            })
            .catch(error => {
                if (axios.isCancel(error)) { // 取消请求的情况下，终断Promise调用链
                    // return new Promise(() => {});
                    return reject("取消上次请求");
                } else {
                    return reject(error);
                }
            })
    })
}