const path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir);
}

const baseUrl = `//static.nbd.com.cn/corp${
    resolve("").split("zhuanti")[1]
}/dist`;
module.exports = {
    lintOnSave: false,
    chainWebpack: (config) => {
        config.plugin("html").tap((args) => {
            args[0].title = "测试";
            return args;
        });
    },
    // css: {
    //   // extract: {
    //   //     filename: "/static/css/[name].[hash:8].css",
    //   //     chunkFilename: '/static/css/[id].[hash:8].css'
    //   // },
    //   loaderOptions: {
    //     scss: {
    //       prependData: `@import "~@/base.scss";`
    //     }
    //   }
    // },
    devServer: {
        port: 3001,
        proxy: {
            "/nbd-fund": {
                target: "https://test.hxkjmedia.com/nbd-app-gateway/",
                // target: "https://nbd-app-gateway.nbd.com.cn",
                changeOrigin: true,
                ws: true,
                pathRewrie: {
                    "^/nbd-fund": "",
                },
            },
            "/nbd-app-article-provider": {
                // target: "https://test.hxkjmedia.com/nbd-app-gateway/",
                target: "https://nbd-app-gateway.nbd.com.cn",
                changeOrigin: true,
                ws: true,
                pathRewrie: {
                    "^/nbd-app-article-provider": "",
                },
            },
            "/nbd-app-php-h5/": {
                target: "http://172.19.30.24:8126/",
                changeOrigin: true,
                ws: true,
                pathRewrie: {
                    "^/nbd-app-php-h5": "",
                },
            },
        },
    },
    publicPath: process.env.NODE_ENV === "development" ? "/" : "./",
    productionSourceMap: false,
    outputDir: "dist",
    assetsDir: "static",
};
