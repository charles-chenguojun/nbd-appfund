// store.js
import appApi from "@/util/app-api";
import { defineStore } from "pinia";

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useStore = defineStore({
    // id: 必须的，在所有 Store 中唯一
    id: "myGlobalState",
    // state: 返回对象的函数
    state: () => ({
        count: 1,
        // app_token: 'ODoxNjM5NDcxNzUwOjE2NTY2NTY3MjY6Q0h6VHpuVm1yOQ=='
        app_token: "",
        zanList: [],
        selfInfo: <any>{},
        getCount: 0,
        morenUrl: require("@/assets/activity/morentouxiang.png"),
        goodArticle: <any>[],
        day_date_str_short: "",
        zanRecode: <any>[],
        day_date_str: "",
        voted_one_day_record_count: "",
        userInfo: <any>{},
        winDialogShow: false,
        tabType: 1,
        niuguInfo: <any>{
            cur_record: <any>{
                record: <any>{},
            },
            latest_voted_users: <any>[],
        },
        historyNiuguInfo: <any>{
            record: <any>{
                stocks: <any>[],
                succ_users: <any>[],
                top_stocks: <any>[],
            },
        },
        niuguShow: false,
    }),
    actions: {
        async getToken(isForce = false) {
            if (this.app_token) {
                return this.app_token;
            }

            let env = process.env.NODE_ENV;
            if (env === "development") {
                if (navigator.userAgent.includes("nbdapp")) {
                    this.app_token = await appApi.getToken(isForce);
                } else {
                    this.app_token =
                        "eyJhbGciOiJIUzUxMiJ9.eyJkYXRhIjp7InVzZXJfaW5mbyI6eyJ1c2VyX2lkIjoxMywicGhvbmVfbm8iOiIxODYyODE4ODc1OCIsImF2YXRhciI6IiIsIm5pY2tuYW1lIjoi5q-P57uP572R5Y-LMTMifX0sImV4cCI6MTY3OTk5NzYwMCwiaWF0IjoxNjc4NzAxNjAwLCJqdGkiOiJkYTMxMmU5NTZmZjc5NTkzOWJlYzVjZmIyZDk1ODg2NCJ9.swsutk4zdsA8VBimZKBXG1FEDF582B8J8Ia2S1AEd52uZJQBjnEStJscYYnZEIyKStJTT6Wg1sxO-KCB1hPFuw";
                }
            } else {
                if (navigator.userAgent.includes("nbdapp")) {
                    this.app_token = await appApi.getToken(isForce);
                } else {
                    this.app_token = "noApp";
                }
            }
            return this.app_token;
        },
    },
});
