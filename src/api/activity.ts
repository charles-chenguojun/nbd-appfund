import request from './request';
const baseURL = process.env.NODE_ENV === 'development' ? 'http://www.nbd.cn' : 'http://www.nbd.com.cn';
const baseURL2 = process.env.NODE_ENV === 'development' ? 'http://www.webtest.nbd.com.cn' : 'http://www.nbd.com.cn';
// const baseURL = 'http://www.nbd.com.cn';
// const baseURL2 = 'http://www.nbd.com.cn';
const zgbaseURL = process.env.NODE_ENV === 'development' ? '' : 'https://nbd-zt.nbd.com.cn';
// 首页： 展示最新一期有好文评选结果(9点)的投票日期信息
export function getLastestFinishedRecord(app_user_token: string) {
    return request({
        url: baseURL + `/active_zhw/one_day_records/start_info?app_user_token=${app_user_token}`,
        method: 'get',
        isLoading: false
    });
}
// 往期列表页：往期活动列表 (即日期列表)
export function getone_day_records() {
    return request({
        url: baseURL + `/active_zhw/one_day_records.json`,
        method: 'get'
    });
}
// 往期列表页：往期活动列表 (即日期列表)
export function getRecordInfo(date: string) {
    return request({
        url: baseURL + `/active_zhw/one_day_records/record?date=${date}`,
        method: 'get',
        isLoading: false
    });
}
// 点赞记录页：获取点赞过的文章列表
export function getUser_voted_articles(app_user_token: string) {
    return request({
        url: baseURL + `/active_zhw/zhw_articles/user_voted_articles?app_user_token=${app_user_token}`,
        method: 'get'
    });
}
// 点赞记录页：获取点赞过的文章列表测试
export function getuser_id() {
    return request({
        url: baseURL + `/active_zhw/zhw_articles/user_voted_articles?user_id=2`,
        method: 'get'
    });
}
// 排行榜单
export function getZanRank(app_token: string) {
    return request({
        url: zgbaseURL + `/nbd-app-php-h5/Activity/getZanRank?app_token=${app_token}`,
        method: 'get'
    });
}
// 个人信息排行
export function getMyRank(app_token: string) {
    return request({
        url: zgbaseURL + `/nbd-app-php-h5/Activity/getMyRank?app_token=${app_token}`,
        method: 'get'
    });
}


// 牛股网页初始页面初始请求
export function start_info(app_token: string = 'MjoxNjM3NzQ1MzMwOjE2NjAxMTYyNTk6a0sya3RMd2JscA==') {
    return request({
        url: baseURL2 + `/active_cng/one_day_records/start_info?app_user_token=${app_token}`,
        method: 'get'
    });
}
// export function start_info(user_id: string = '262') {
//     return request({
//         url: baseURL2 + `/active_cng/one_day_records/start_info?user_id=262`,
//         method: 'get'
//     });
// }
// 牛股 历史列表
export function history_records() {
    return request({
        url: baseURL2 + `/active_cng/one_day_records/history_records.json`,
        method: 'get'
    });
}
// 获取当天得详情
export function one_day_record(date: string, app_token: string = 'MjoxNjM3NzQ1MzMwOjE2NjAxMTYyNTk6a0sya3RMd2JscA==') {
    return request({
        url: baseURL2 + `/active_cng/one_day_records/record?date=${date}&app_user_token=${app_token}`,
        method: 'get'
    });
}

// 投票
export function vote(cng_stock_id: number, app_token: string = 'MjoxNjM3NzQ1MzMwOjE2NjAxMTYyNTk6a0sya3RMd2JscA==') {
    return request({
        url: baseURL2 + `/active_cng/cng_stocks/vote?cng_stock_id=${cng_stock_id}&app_user_token=${app_token}`,
        method: 'post'
    });
}
// 获取第一期前十排名
export function getHistoryRank(type:number) {
    return request({
        url: zgbaseURL + `/nbd-app-php-h5/Activity/getZanRank?type=${type}`,
        method: 'get'
    });
}
// 获取用户是否中奖
export function getActive_succ_user_infos(app_user_token: string = 'MjoxNjM3NzQ1MzMwOjE2NjAxMTYyNTk6a0sya3RMd2JscA==') {
    return request({
        url: baseURL2 + `/active_succ_user_infos/start_info?app_user_token=${app_user_token}`,
        method: 'get'
    });
}
// export function getActive_succ_user_infos(app_user_token: string = 'MjoxNjM3NzQ1MzMwOjE2NjAxMTYyNTk6a0sya3RMd2JscA==') {
//     return request({
//         url: 'http://www.nbd.cn/active_succ_user_infos/start_info?user_id=11',
//         method: 'get'
//     });
// }
// 提交中奖用户信息
export function refresh_user_info(data: any) {
    return request({
        url: baseURL2 + `/active_succ_user_infos/refresh_user_info`,
        method: 'POST',
        data
    });
}
// 统计页面访问
export function addUserLog(data: any) {
    return request({
        url: zgbaseURL + `/nbd-app-php-h5/Activity/addUserLog`,
        method: 'post',
        data
    });
}
