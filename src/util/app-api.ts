function setupWebViewJavascriptBridge(callback: (bridge: any) => void) {
    if (window.WebViewJavascriptBridge) {
        return callback(window.WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    let WVJBIframe = document.createElement("iframe");
    WVJBIframe.style.display = "none";
    WVJBIframe.src = "https://__bridge_loaded__";
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(() => {
        document.documentElement.removeChild(WVJBIframe);
    }, 0);
}

function checkWebViewJavascriptBridge() {
    let timer: any;
    return new Promise((resovle, reject) => {
        if (!window.WebViewJavascriptBridge) {
            timer = setInterval(() => {
                if (window.WebViewJavascriptBridge) {
                    clearInterval(timer);
                    resovle(true);
                }
            }, 50);
        } else {
            resovle(true);
        }
    });
}

class AppApi {
    isAndroidFn() {
        const u = navigator.userAgent;
        const isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1;
        return isAndroid;
    }

    api(iosObj: any, androidObj = iosObj) {
        return new Promise(async (resovle, reject) => {
            if (this.isAndroidFn()) {
                await checkWebViewJavascriptBridge();
                window.WebViewJavascriptBridge.callHandler(
                    "NBDBridge",
                    androidObj,
                    function (res: any) {
                        resovle(res);
                    },
                );
                return;
            }

            setupWebViewJavascriptBridge((bridge) => {
                bridge.callHandler("NBDBridge", iosObj, function (res: any) {
                    resovle(res);
                });
            });
        });
    }

    registerhandler(name: string, callback: any) {
        return new Promise(async (resolve, reject) => {
            if (this.isAndroidFn()) {
                await checkWebViewJavascriptBridge();
                window.WebViewJavascriptBridge.registerHandler(
                    name,
                    function (data: any, responseCallback: any) {
                        callback && callback(data, responseCallback);
                        resolve({ data, responseCallback });
                    },
                );
                return;
            }
            setupWebViewJavascriptBridge((bridge) => {
                bridge.registerHandler(
                    name,
                    function (data: any, responseCallback: any) {
                        callback && callback(data, responseCallback);
                        resolve({ data, responseCallback });
                    },
                );
            });
        });
    }

    // 获取token
    async getToken(isForce = false): Promise<string> {
        let iosObj = { operate: "login", isForce };
        let androidObj = { operate: "login", isForce };
        let res = (await this.api(iosObj, androidObj)) as string;
        return res;
    }

    // 加自选
    async addSelf(codes: string[]) {
        let obj = { operate: "follow_stock", codes: codes };
        let res = await this.api(obj);
        return res;
    }

    // 分享
    async share(shareInfo: ShareInfo) {
        let obj = { operate: "share", ...shareInfo };
        // console.log(obj);
        let res = await this.api(obj);
        return res;
    }

    // 修改分享信息
    async hookShare(shareInfo: ShareInfo) {
        let obj = {
            operate: "hook_share",
            ...shareInfo,
        };
        let res = await this.api(obj);
        return res;
    }

    // 跳转股票详情页
    async goStockDetail(stockInfo: StockInfo) {
        let obj = { operate: "open_stock", ...stockInfo };
        let res = await this.api(obj);
        return res;
    }

    // 打开文章详情页
    async openArticle(articleInfo: ArticleInfo) {
        let obj = { operate: "open_article", ...articleInfo };
        let res = await this.api(obj);
        return res;
    }
    // 跳转页面
    async goAppPage(obj: any) {
        let res = await this.api(obj);
        return res;
    }

    // 视频播放
    async goVideo(videoInfo: VideoInfo) {
        let obj = { operate: "stock_video", ...videoInfo };
        let res = await this.api(obj);
        return res;
    }

    // 打开新窗口
    async openLink(params: LinkInfo) {
        let obj = {
            operate: "open_link",
            ...Object.assign({}, { show_web_title: false }, params),
        };
        let res = await this.api(obj);
        return res;
    }

    // 关闭窗口
    async pop() {
        let obj = {
            operate: "pop",
        };
        let res = await this.api(obj);
        return res;
    }
}

export default new AppApi();

export type LinkInfo = {
    url: string;
    show_title_bar: boolean; // 是否显示状态栏
    show_web_title?: boolean; //  是否动态显示标题
};

export type StockInfo = {
    stock_code: string;
    stock_suffix: string;
    stock_name: string;
    stock_url: string;
};

export type ShareInfo = {
    share_digest: string;
    share_image: string;
    share_title: string;
    share_url: string;
};

export type ArticleInfo = {
    article_id: any;
    url: string;
};

export type VideoInfo = {
    resource_id: any;
};
