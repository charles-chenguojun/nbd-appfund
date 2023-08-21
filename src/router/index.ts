import {
    createRouter,
    createWebHashHistory,
    RouteRecordRaw,
    createWebHistory,
} from "vue-router";
import Home from "../views/Home.vue";
import activityRoute from "./activity";
const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            tree: 0,
        },
    },
    {
        path: "/about",
        name: "About",
        component: () => import("../views/About.vue"),
    },
    {
        path: "/decisiveVictory",
        name: "decisiveVictory",
        component: () => import("../views/decisiveVictory.vue"),
        meta: {
            tree: 0,
        },
    },
    {
        path: "/strategy",
        name: "strategy",
        component: () => import("../views/strategy.vue"),
        meta: {
            tree: 0,
        },
    },
    {
        path: "/history",
        name: "history",
        component: () => import("../views/history.vue"),
        meta: {
            tree: 0,
        },
    },
    {
        path: "/underestimate",
        name: "underestimate",
        component: () => import("../views/underestimate.vue"),
        meta: {
            tree: 0,
        },
    },
    {
        path: "/diagnosticBasis",
        name: "diagnosticBasis",
        component: () => import("../views/diagnosticBasis.vue"),
        meta: {
            tree: 1,
        },
    },
    {
        path: "/aiSearch",
        name: "aiSearch",
        component: () => import("../views/aiSearch2.vue"),
        meta: {
            tree: 1,
        },
    },
    {
        path: "/fundChooseList",
        name: "fundChooseList",
        component: () => import("../views/fundChooseList.vue"),
        meta: {
            tree: 1,
        },
    },
    {
        path: "/managerChooseList",
        name: "managerChooseList",
        component: () => import("../views/managerChooseList.vue"),
        meta: {
            tree: 1,
        },
    },
    {
        path: "/fundClass",
        name: "fundClass",
        component: () => import("../views/fundClass.vue"),
        meta: {
            tree: 1,
        },
    },
    {
        path: "/chooseResult",
        name: "chooseResult",
        component: () => import("../views/chooseResult.vue"),
        meta: {
            tree: 1,
        },
    },
    {
        path: "/areaResult",
        name: "areaResult",
        component: () => import("../views/areaResult.vue"),
        meta: {
            tree: 1,
        },
    },
    {
        path: "/etfDetail/:code",
        component: () => import("../views/etfDetail/etfDetail.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: [...activityRoute, ...routes],
});
export default router;
