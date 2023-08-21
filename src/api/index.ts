import request from "./request";
const ls = "https://nbd-fund.test.hxkjmedia.com";
const baseURL =
    process.env.NODE_ENV === "development"
        ? ""
        : "https://nbd-app-gateway.nbd.com.cn";

// 获取折线图时间段
export function getDate(thsFundCode: any = "KF4374") {
    return request({
        url: baseURL + `/nbd-fund/fund/detail/profit/date/${thsFundCode}`,
        method: "get",
    });
}
// 基金均线图形数据,用于绘制折线图
export function echartsData(secCode: string | number, dateInterval: string) {
    return request({
        url:
            baseURL +
            `/nbd-fund/fund/detail/averages/${secCode}/${dateInterval}`,
        method: "get",
    });
}
// AI诊断基金基本信息
export function getAiBasic(secCode: any) {
    return request({
        url: baseURL + `/nbd-fund/fund/detail/averages/basic/${secCode}`,
        method: "get",
    });
}
// 搜索
export function aiSearch(searchKey: any) {
    return request({
        url: baseURL + `/nbd-fund/search/list/${searchKey}`,
        method: "get",
    });
}
// 获取文章
export function getArticle(id: number, params: any) {
    return request({
        url: baseURL + `/nbd-app-article-provider/articles/nbd/${id}`,
        method: "get",
        params,
    });
}
// 获取文章
export function categoryList(isUnderRate: boolean, data: any) {
    return request({
        isLoading: false,
        url: baseURL + `/nbd-fund/fundIndexPage/category/list/${isUnderRate}`,
        method: "post",
        data,
    });
}
// 查询是否关注基金
export function getIsLikeFund(obj: any) {
    return request({
        url:
            baseURL +
            `/nbd-fund/fund/user/code/${obj.code}?app_token=${obj.app_token}`,
        method: "get",
    });
}
// 喜欢或删除基金
export function likeFund(data: any) {
    return request({
        url:
            baseURL +
            `${
                data.method === "post"
                    ? "/nbd-fund/fund/user/fundCode"
                    : "/nbd-fund/fund/user/fundCode/remove"
            }/${data.code}?app_token=${data.app_token}`,
        method: "post",
    });
}
// 榜单各级标签搜索基金经理
export function tagForManager(params: any) {
    return request({
        url: baseURL + `/nbd-fund/fundManager`,
        method: "get",
        params,
    });
}
// 见机行事列表
export function tagForJJXSList(params: any) {
    return request({
        url: baseURL + `/nbd-fund/fundIndexPage/jjxs/list`,
        method: "get",
        params,
    });
}
