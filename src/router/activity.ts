import { RouteRecordRaw } from "vue-router";

const activityRoute: Array<RouteRecordRaw> = [
    {
        path: "/activityIndex",
        name: "activityIndex",
        component: () =>
            import("../views/activity/index.vue"),
        meta: {
            tree: 0
        }
    },
    {
        path: "/integralRank",
        name: "integralRank",
        component: () =>
            import("../views/activity/integralRank.vue"),
        meta: {
            tree: 0
        }
    },
    {
        path: "/historyList",
        name: "historyList",
        component: () =>
            import("../views/activity/historyList.vue"),
        meta: {
            tree: 0
        }
    },
    {
        path: "/historyDetail",
        name: "historyDetail",
        component: () =>
            import("../views/activity/historyDetail.vue"),
        meta: {
            tree: 0
        }
    },
    {
        path: "/winningList",
        name: "winningList",
        component: () =>
            import("../views/activity/winningList.vue"),
        meta: {
            tree: 0
        }
    },
    {
        path: "/guize",
        name: "guize",
        component: () =>
            import("../views/activity/guize.vue"),
        meta: {
            tree: 0
        }
    },
    {
        path: "/recod",
        name: "recod",
        component: () =>
            import("../views/activity/recod.vue"),
        meta: {
            tree: 0
        }
    },
    {
        path: "/share",
        name: "share",
        component: () =>
            import("../views/activity/share.vue"),
        meta: {
            tree: 0
        }
    },
    {
        path: "/historyRank",
        name: "historyRank",
        component: () =>
            import("../views/activity/historyRank.vue"),
        meta: {
            tree: 0
        }
    },
];
export default activityRoute
