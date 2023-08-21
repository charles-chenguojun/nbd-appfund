import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "lib-flexible/flexible.js";
import "vant/lib/index.css";
import "./assets/reset.css";
import "./base.scss";
import A from "@/util/index";
const a = new A();
const app = createApp(App);
import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css'
a.demo(app);
app.use(router).use(createPinia()).use(Antd).mount("#app");

// function getOSType(): number {
//     if (navigator.userAgent.match(/nbdapp/i)) {
//         return 0;
//     } else {
//         return 2;
//     }
// }
// router.beforeEach((to, form, next) => {
//     if (to.path === '/share') {
//         next();
//         return
//     }
//     if (getOSType() === 2 && process.env.NODE_ENV === 'production') {
//         console.log(1111111);
//         location.href = 'http://www.nbd.com.cn/corp/NBD-fund-app/index.html#/share';
//     } else {
//         next();
//     }
// })
