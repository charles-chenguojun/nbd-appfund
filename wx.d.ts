interface ShareParams {
    title: string;
    desc: string;
    link: string;
    imgUrl?: string;
    success: () => void;
    cancel: () => void;
}
declare module 'weixin-js-sdk' {
    export function config(args: {
        debug: boolean;
        appId: string;
        timestamp: number;
        nonceStr: string;
        signature: string;
        jsApiList: string[];
    }): void;
    export function ready(arg: () => void): void;
    export function updateTimelineShareData(args: ShareParams): void;
    export function updateAppMessageShareData(args: ShareParams): void;
    export function onMenuShareTimeline(args: ShareParams): void;
    export function onMenuShareAppMessage(args: ShareParams): void;
    export function onMenuShareQQ(args: ShareParams): void;
    export function onMenuShareQZone(args: ShareParams): void;
    export function error(arg: (res: any) => void): void;
}
