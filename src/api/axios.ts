import axios from "axios";
import { useStore } from "@/store";
import { Toast } from "vant";

axios.defaults.baseURL =
    process.env.NODE_ENV === "development"
        ? "/"
        : "https://nbd-app-gateway.nbd.com.cn";
axios.defaults.timeout = 200000;

let app_token = "";
const indexStore = useStore();

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

axios.interceptors.request.use(
    (config) => {
        if (config.isLoading !== false) {
            // 如果配置了isLoading: false，则不显示loading
            showFullScreenLoading();
        }
        let app_token = indexStore.app_token;
        if (app_token) {
            (config.headers as any)["app-token"] = app_token;
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

axios.interceptors.response.use(
    (res) => {
        setTimeout(() => {
            hideFullScreenLoading();
        }, 500);
        return res;
    },
    (err) => {
        hideFullScreenLoading();
        // Toast(err.message);
        return Promise.reject(err);
    },
);

export default axios;
