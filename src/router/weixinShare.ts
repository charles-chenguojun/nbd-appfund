import axios from "axios";
// const wx = require("weixin-js-sdk");
import wx from "weixin-js-sdk";
let cancel: any;
class ShareInfo {
    // constructor() { }
    identify(URL: string) {
        if (cancel) {
            cancel();
        }
        const requestUrl = URL.match("m.nbd.com.cn")
            ? "https://m.nbd.com.cn/get_wechat_signature"
            : "https://www.nbd.com.cn/get_wechat_signature";
        axios({
            method: "post",
            url: requestUrl,
            data: { share_url: URL },
            cancelToken: new axios.CancelToken((c) => (cancel = c)),
        }).then((res: any) => {
            const { data } = res;
            wx.config({
                debug: false,
                appId: data.data.appid,
                timestamp: data.data.timestamp,
                nonceStr: data.data.noncestr,
                signature: data.data.signature,
                jsApiList: [
                    "scanQRCode",
                    "updateAppMessageShareData",
                    "updateTimelineShareData",
                ],
            });
        });
    }
    init(options: {
        img: string;
        title: string;
        desc: string;
        shareURL: string;
    }) {
        this.identify(location.href);
        wx.ready(function () {
            const imageurl = options.img;
            const title = options.title;
            const desc = options.desc;
            const link = options.shareURL;
            // 分享到朋友圈”及“分享到QQ空间”
            wx.updateTimelineShareData({
                title: title, // 分享标题
                desc: desc,
                link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: imageurl, // 分享图标
                success: function () {},
                cancel: function () {},
            });
            // “分享给朋友”及“分享到QQ”
            wx.updateAppMessageShareData({
                title: title, // 分享标题
                desc: desc,
                link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: imageurl, // 分享图标
                success: function () {},
                cancel: function () {},
            });
        });

        wx.error(function (res: any) {
            console.log(res);
        });
    }
}

export default new ShareInfo();
