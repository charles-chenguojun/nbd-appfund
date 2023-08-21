/*
 * @desc:
 * @author: dyl
 * @version: 1.0
 * @Date: 2022-06-21 16:18:06
 */
import axios from "axios";
import Vue from "vue";
import { Toast } from "vant";
import { useStore } from "@/store";

// import store from '@/store'
let loading: any;
let needLoadingRequestCount = 0;
function startLoading() {
    loading = Toast.loading({
        message: "加载中...",
        forbidClick: false,
        duration: 0,
        // overlay:true
    });
}
function endLoading() {
    loading.clear();
}
function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading();
    }
    needLoadingRequestCount++;
}
function hideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return;
    needLoadingRequestCount--;
    if (needLoadingRequestCount === 0) {
        endLoading();
    }
}
const service = axios.create({
    baseURL: "",
    timeout: 200000, // request timeout
});
(service.defaults.headers as any)["Content-Type"] =
    "application/json;charset=UTF-8";

const indexStore = useStore();

// request interceptor
service.interceptors.request.use(
    (config: any) => {
        // do something before request is sent
        // if (store.getters.token) {
        //   // let each request carry token
        //   // ['X-Token'] is a custom headers key
        //   // please modify it according to the actual situation
        //   config.headers['X-Token'] = getToken()
        // }
        if (config.isLoading !== false) {
            // 如果配置了isLoading: false，则不显示loading
            showFullScreenLoading();
        }
        let app_token = indexStore.app_token;
        if (app_token) {
            config.headers["app-token"] = app_token;
        }
        return config;
    },
    (error: any) => {
        // do something with request error
        console.log(error); // for debug
        hideFullScreenLoading();

        return Promise.reject(error);
    },
);

service.interceptors.response.use(
    (response): any => {
        setTimeout(() => {
            hideFullScreenLoading();
        }, 500);
        if (response.status === 200) {
            return response.data;
        } else {
            return false;
        }
    },
    (error: any) => {
        console.log("err" + error); // for debug
        hideFullScreenLoading();

        Toast(error.message);
        return Promise.reject(error);
    },
);

export default service;
