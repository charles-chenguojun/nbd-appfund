declare const window: Window & { WebViewJavascriptBridge: any, WVJBCallbacks: any };
function setupWebViewJavascriptBridge(callback: any) {
    if (window.WebViewJavascriptBridge) {
        return callback(window.WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    let WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(() => {
        document.documentElement.removeChild(WVJBIframe);
    }, 0);
}
interface ShareInfo {
    share_digest: string;
    share_image: string;
    share_title: string;
    share_url: string;
};
export default {
    api(iosObj: any, androidObj = iosObj) {
        return new Promise((resovle, reject) => {
            if (this.isAndroidFn()) {
                window.WebViewJavascriptBridge.callHandler(
                    "NBDBridge",
                    androidObj,
                    function (res: any) {
                        return res
                        resovle(res);
                    },
                );
                return;
            }

            setupWebViewJavascriptBridge((bridge: any) => {
                bridge.callHandler("NBDBridge", iosObj, function (res: any) {
                    return res
                    resovle(res);
                });
            });
        });
    },
    // 获取token
    async getToken(isForce = false) {
        let obj = { operate: "login", isForce };
        let res = await this.api(obj);
        return res as string;
    },
    //APP登陆认证
    isappLogon(callback: any) {
        return new Promise(resolve => {
            window.WebViewJavascriptBridge.callHandler('NBDBridge', { operate: 'login' }, function (responseData: any) {
                callback(responseData);
            });
        });
    },
    concatApp(data: any, responseCallback: any) {
        window.WebViewJavascriptBridge.registerHandler('functionInJs', function (data: any, responseCallback: any) {
            (document.getElementById('show') as any).innerHTML = 'data from Java: = ' + data;
            var responseData = 'Javascript Says Right back aka!';
            console.log(`~~~~~~安卓回调` + responseData);
            responseCallback(responseData);
        });
    },
    // IOS方法
    callhandler(name: any, data: any, callback: any) {
        setupWebViewJavascriptBridge(function (bridge: any) {
            bridge.callHandler(name, data, callback);
        });
    },
    registerhandler(name: any, callback: any) {
        setupWebViewJavascriptBridge(function (bridge: any) {
            bridge.registerHandler(name, function (data: any, responseCallback: any) {
                callback(data, responseCallback);
            });
        });
    },
    androidTopage(obj: any) {
        window.WebViewJavascriptBridge.callHandler('NBDBridge', obj, function (d: any) { });
    },
    isAndroidFn() {
        const u = navigator.userAgent;
        const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
        return isAndroid;
    },
    //APP跳转页面
    appToPage(obj: any) {
        if (this.isAndroidFn()) {
            this.androidTopage(obj);
            return;
        }
        this.callhandler('NBDBridge', obj, function (d: any) { });
    },
    //APP关闭当前页
    closeCurrentPage() {
        if (this.isAndroidFn()) {
            this.androidTopage({ operate: 'pop' });
            return;
        }

        this.callhandler('NBDBridge', { operate: 'pop' }, function (d: any) { });
    },
}
