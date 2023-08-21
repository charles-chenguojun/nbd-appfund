<template>
    <section ref="scroolSection">
        <div ref="myChart" class="myChart"></div>
        <div class="tuxiangBottom">
            <div
                v-for="(item, index) in dateList"
                v-show="index < 5"
                :key="index"
                :class="item == checkedText ? 'bottomChecked' : ''"
                @click="chooseItem(item)"
            >
                {{ item }}
            </div>
            <div v-show="checkedIndex == -1" @click="morePickerShow = true">
                更多
                <van-icon name="arrow-down" />
            </div>
            <div
                v-show="checkedIndex != -1"
                class="bottomChecked"
                @click="morePickerShow = true"
            >
                {{ checkedText }}
                <van-icon name="arrow-down" />
            </div>
        </div>
        <!-- 更多 -->
        <van-overlay :show="morePickerShow" @click="morePickerShow = false">
            <van-picker
                show-toolbar
                :columns="columns2"
                @confirm="onConfirm2"
            />
        </van-overlay>
    </section>
</template>

<script lang="ts" setup>
    import {
        Icon as VanIcon,
        Overlay as VanOverlay,
        Picker as VanPicker,
    } from "vant";
    import { ref, onMounted, watch, markRaw } from "vue";
    import * as echarts from "echarts";
    import { getDate, echartsData } from "@/api";
    import { Debounced } from "@/util/Debounced";
    import { useRoute } from "vue-router";
    // import { lock, unlock } from 'tua-body-scroll-lock';
    const $route = useRoute();
    const dateList = ref<any>([
        "近1周",
        "近1月",
        "近3月",
        "近6月",
        "近1年",
        "近3年",
        "近5年",
        "成立以来",
        "当前基金经理",
    ]);
    const checkedText = ref<any>("近1年");
    const checkedIndex = ref(-1);
    const morePickerShow = ref(false);
    const myChart = ref<HTMLElement>();
    const columns2 = ["近5年", "成立以来", "当前基金经理"];
    const onConfirm2 = (e: any) => {
        checkedIndex.value = 1;
        checkedText.value = e;
    };
    let type = "daily";
    let echartsdom: any;
    // 处理数据

    let data0: any = [];
    function splitData(rawData: (number | string)[][]) {
        const categoryData = [];
        const values = [];
        for (var i = 0; i < rawData.length; i++) {
            categoryData.push(rawData[i].splice(0, 1)[0]);
            values.push(rawData[i]);
        }
        return {
            categoryData: categoryData,
            values: values,
        };
    }
    // 处理echarts数据
    function calculateMA(dayCount: number) {
        var result = [];
        for (var i = 0, len = data0.values.length; i < len; i++) {
            result.push(data0.values[i][dayCount - 1]);
        }
        return result;
    }
    interface option {
        tooltip?: any;
        legend?: any;
        grid?: any;
        xAxis?: any;
        yAxis?: any;
        series?: any;
        dataZoom?: any;
    }
    // 禁止body滚动
    let scrollFn = new Debounced().use(() => {
        document.body.style.position = "initial";
        document.body.style.height = "auto";
        // unlock(document.body);
    }, 500);
    const scroolSection = ref<any>(null);
    // 拖拽echarts时方法
    const formatterFn = (params: any): string => {
        // document.body.style.position = 'fixed';
        // scrollFn()
        console.log(params);
        return "";
    };
    const option: option = {
        dataZoom: {
            // 放大和缩放
            type: "inside",
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross",
                label: { precision: "4", fontSize: 8 },
            },
            showContent: false,
        },
        legend: [],
        grid: {
            left: "6%",
            right: "8%",
            top: "4%",
        },
        xAxis: {
            type: "category",
            data: data0.categoryData,
            boundaryGap: false,
            axisLine: {
                onZero: false,
            },
            splitLine: { show: false },
            axisLabel: {
                interval: data0.values.length - 2,
                textStyle: {
                    // color: "#fff",
                    fontSize: 8,
                },
            },
            min: "dataMin",
            max: "dataMax",
        },
        yAxis: [
            {
                scale: true,
                axisLabel: {
                    textStyle: {
                        fontSize: 8,
                    },
                },
            },
            {
                scale: true,
                axisLabel: {
                    formatter: "{value} %",
                    textStyle: {
                        fontSize: 8,
                    },
                },
            },
        ],
        series: [],
    };
    // echarts坐标数据取整
    function roundFun(value: number, type: string = "max") {
        let num: number = 0;
        if (type === "max") {
            num = Math.floor(value * 100) / 100 + 0.01;
        } else {
            num = Math.floor(value * 100) / 100 - 0.01;
        }
        console.log(value);
        return value;
    }
    let d: any = {};
    let isOnly = false;
    const $emit = defineEmits(["dataChange", "areaDataChange"]);
    // 初始化echarts数据
    const initEcharts = () => {
        echartsData($route.query.id as any, checkedText.value).then(
            (res: any) => {
                if (res) {
                    d = res;
                    $emit("dataChange", res.descriptionList);
                    const obj: any = {
                        height: res[type].markArea[2],
                        low: res[type].markArea[1],
                        middle: res[type].markLine,
                    };
                    $emit("areaDataChange", obj);
                    initEchartsData(type, isOnly);
                }
            },
        );
    };
    const initEchartsData = (
        string: string = "daily",
        only: boolean = false,
    ) => {
        isOnly = only;
        type = string;
        if (isOnly) {
            onlyOneLineEcharts();
            return;
        }
        nomarlLine();
    };
    const markPointFn = (param: any) => {
        return param != null ? param.name : "";
    };

    const nomarlLine = () => {
        data0 = splitData(JSON.parse(JSON.stringify(d[type].data)));
        option.xAxis.data = data0.categoryData;
        option.xAxis.axisLabel.interval = data0.values.length - 2;
        option.series = [
            {
                name: "",
                type: "candlestick",
                data: data0.values,
                itemStyle: {
                    opacity: 0,
                },
                markPoint: {
                    data: d[type].markPoint.filter((item: any) => {
                        if (item.beLatest) {
                            return true;
                        }
                        return false;
                    }),
                },
                markArea: {
                    silent: true,
                    data: [
                        [
                            {
                                yAxis: roundFun(d[type].markArea[3]),
                                itemStyle: {
                                    color: {
                                        type: "linear",
                                        x: 0, //右
                                        y: 1, //下
                                        x2: 0, //左
                                        y2: 0, //上
                                        colorStops: [
                                            {
                                                offset: 0,
                                                color: " #FFF4F4", // 0% 处的颜色
                                            },
                                            {
                                                offset: 1,
                                                color: "#FEC8CB", // 100% 处的颜色
                                            },
                                        ],
                                    },
                                },
                            },
                            {
                                yAxis: d[type].markArea[2],
                            },
                        ],
                        [
                            {
                                yAxis: d[type].markArea[2],
                                itemStyle: {
                                    color: "#FFFADF",
                                },
                            },
                            {
                                yAxis: d[type].markArea[1],
                            },
                        ],
                        [
                            {
                                yAxis: d[type].markArea[1],
                                itemStyle: {
                                    color: {
                                        type: "linear",
                                        x: 0, //右
                                        y: 1, //下
                                        x2: 0, //左
                                        y2: 0, //上
                                        colorStops: [
                                            {
                                                offset: 0,
                                                color: "#CFE5FF",
                                            },
                                            {
                                                offset: 1,
                                                color: "#F2F8FF",
                                            },
                                        ],
                                    },
                                },
                            },
                            {
                                yAxis: roundFun(d[type].markArea[0], "min"),
                            },
                        ],
                    ],
                },
                markLine: {
                    silent: true,
                    symbol: ["none", "none"],
                    data: [
                        // - - - -   净值高位与中位分割线
                        {
                            yAxis: d[type].markArea[
                                d[type].markArea.length - 2
                            ],
                            lineStyle: {
                                color: "#EE2A36",
                            },
                            label: {
                                show: false,
                            },
                        },
                        //- - - -   净值中位
                        {
                            yAxis: d[type].markLine,
                            lineStyle: {
                                color: "#1A75DF",
                            },
                            label: {
                                show: false,
                            },
                        },
                        //- - - -   净值中位与低位分割线
                        {
                            yAxis: d[type].markArea[1],
                            lineStyle: {
                                color: "#FFA54A",
                            },
                            label: {
                                show: false,
                            },
                        },
                    ],
                },
            },
            {
                name: d[type].type[0],
                type: "line",
                data: calculateMA(1),
                color: ["#EE2A36"],
                itemStyle: {
                    normal: {
                        // lineStyle: {
                        //   width: 0.1//设置线条粗细
                        // },
                        opacity: 0,
                    },
                },
                lineStyle: {
                    width: 1, //设置线条粗细
                },
            }, // 复权净值
            {
                name: d[type].type[1],
                type: "line",
                data: calculateMA(2).map((item, index) => {
                    let x = data0.categoryData[index];
                    let point = d[type].markPoint.find((obj: any) => {
                        return obj.coord[0] == x;
                    });
                    let obj: any = {
                        value: item,
                    };
                    if (point) {
                        obj["symbol"] = "circle";
                        obj["symbolSize"] = 7;
                        obj.itemStyle = point.itemStyle;
                    } else {
                        obj["symbolSize"] = 0;
                    }
                    // console.log(item);
                    return obj;
                }),
                color: ["#6C6C6C"],
                itemStyle: {
                    // opacity: 0,
                },
                lineStyle: {
                    width: 1, //设置线条粗细
                },
            }, // MA5
            {
                name: d[type].type[2],
                type: "line",
                data: calculateMA(3),
                color: ["#AD87B6"],
                itemStyle: {
                    opacity: 0,
                },
                lineStyle: {
                    width: 1, //设置线条粗细
                },
            }, //MA10
            {
                name: d[type].type[3],
                type: "line",
                data: calculateMA(4),
                color: ["#E5B77A"],
                itemStyle: {
                    opacity: 0,
                },
                lineStyle: {
                    width: 1, //设置线条粗细
                },
            }, // MA20
            {
                name: d[type].type[4],
                type: "line",
                color: ["#ADC3FF"],
                symbol: "none",
                smooth: true,
                yAxisIndex: 1, //在单个图表实例中存在多个y轴的时候有用
                data: calculateMA(5),
                itemStyle: {
                    opacity: 0,
                },
                lineStyle: {
                    width: 1, //设置线条粗细
                },
            }, //沪深300
            {
                name: d[type].type[5],
                type: "line",
                color: ["#FED0A0"],
                symbol: "none",
                smooth: true,
                yAxisIndex: 1, //在单个图表实例中存在多个y轴的时候有用
                data: calculateMA(6),
                itemStyle: {
                    opacity: 0,
                },
                lineStyle: {
                    width: 1, //设置线条粗细
                },
            }, //业绩比较基准
            {
                name: d[type].type[6],
                type: "line",
                color: ["#D51ACD"],
                symbol: "none",
                smooth: true,
                yAxisIndex: 1, //在单个图表实例中存在多个y轴的时候有用
                data: calculateMA(7),
                itemStyle: {
                    opacity: 0,
                },
                lineStyle: {
                    width: 1, //设置线条粗细
                },
            }, // 复权净值收益率
        ];
        option.yAxis = [
            {
                min: roundFun(d[type].markArea[0], "min"),
                max: roundFun(d[type].markArea[d[type].markArea.length - 1]),
                scale: true,
                axisLabel: {
                    textStyle: {
                        fontSize: 8,
                    },
                },
                splitLine: {
                    show: false,
                },
            },
            {
                scale: true,
                splitLine: {
                    show: false,
                },
                axisLabel: {
                    formatter: "{value} %",
                    textStyle: {
                        fontSize: 8,
                    },
                },
            },
        ];
        option.legend = [
            {
                data: initLegend(d[type].type, 1),
                selectedMode: true,
                bottom: "8%",
                textStyle: {
                    fontSize: 10,
                },
            },
            {
                data: initLegend(d[type].type, 0),
                selectedMode: true,
                bottom: "2%",
                textStyle: {
                    fontSize: 10,
                },
            },
        ];
        option.grid = {
            left: "6%",
            right: "9%",
            top: "4%",
        };
        drawEcharts();
    };
    const onlyOneLineEcharts = () => {
        data0 = splitData(JSON.parse(JSON.stringify(d[type].data)));
        option.xAxis.data = data0.categoryData;
        option.xAxis.axisLabel.interval = data0.values.length - 2;
        option.series = [
            {
                name: "",
                type: "candlestick",
                data: data0.values,
                itemStyle: {
                    opacity: 0,
                },
            },
            {
                name: d[type].type[0],
                type: "line",
                data: calculateMA(1),
                color: ["#EE2A36"],
                itemStyle: {
                    opacity: 0,
                },
            },
        ];
        option.yAxis = {
            scale: true,
            axisLabel: {
                textStyle: {
                    fontSize: 8,
                },
            },
        };
        option.legend = {
            show: false,
        };
        option.grid = {
            bottom: "2%",
            top: "3%",
        };

        drawEcharts();
    };
    // 初始化echartst  Legend
    const initLegend = (arr: any[], type: number) => {
        let arr0: any[] = [],
            arr1: any[] = [];
        arr.forEach((item, index) => {
            if (index < 4) {
                arr0.push(item);
            } else {
                arr1.push(item);
            }
        });
        if (type === 1) {
            return arr0;
        } else {
            return arr1;
        }
    };
    const loading = ref(false);
    onMounted(() => {
        echartsdom = markRaw(echarts.init(myChart.value!));
        initEcharts();
    });

    var option1: any = {};
    const tooltipFn = (params: any) => {
        console.log(params);
        return "1" + "2";
    };
    // 绘制图表
    const drawEcharts = () => {
        option1 = JSON.parse(JSON.stringify(option));
        // option1.series[0].markPoint.data = [{
        //   "name": "金叉",
        //   "coord": ["2021/09/27", "1.3346380029"],
        //   "itemStyle": {
        //     "color": "#1A75DF"
        //   }
        // }];
        console.log(option1);
        echartsdom.on("legendselectchanged", function (params: any) {
            if (
                params.name === "复权净值" ||
                params.name === "MA5" ||
                params.name === "MA10" ||
                params.name === "MA20"
            ) {
                hideEchartsFn(params);
            }
        });
        console.log(option1.legend);
        if (option1.legend.show !== false) {
            option1.legend[1].selected = {
                沪深300: false,
                业绩比较基准: false,
                复权净值收益率: false,
            };
            option1.series[0].markPoint.label = { formatter: markPointFn };
        }

        setTimeout(() => {
            echartsdom && echartsdom.setOption(option1, true);
        }, 10);
    };
    // 隐藏echarts背景图
    const hideEchartsFn = (params: any) => {
        if (
            !params.selected["MA5"] &&
            !params.selected["MA10"] &&
            !params.selected["MA20"] &&
            !params.selected["复权净值"]
        ) {
            option1.series[0] = {
                name: "",
                type: "candlestick",
                data: data0.values,
                itemStyle: {
                    opacity: 0,
                },
            };
            initAllLegend(params);
        } else {
            if (!option1.series[0].markArea) {
                option1 = JSON.parse(JSON.stringify(option));
                option1.tooltip.formatter = formatterFn;
                initAllLegend(params);
            }
        }
    };
    const initAllLegend = (params: any) => {
        option1.legend[0].selected = {
            MA5: params.selected["MA5"],
            MA10: params.selected["MA10"],
            MA20: params.selected["MA20"],
            复权净值: params.selected["复权净值"],
        };
        option1.legend[1].selected = {
            沪深300: params.selected["沪深300"],
            业绩比较基准: params.selected["业绩比较基准"],
            复权净值收益率: params.selected["复权净值收益率"],
        };
        echartsdom && echartsdom.setOption(option1, true);
    };
    // 修改数据时间段
    const chooseItem = (obj: any) => {
        checkedText.value = obj;
        checkedIndex.value = -1;
    };
    watch(checkedText, () => {
        initEcharts();
    });
    defineExpose({ initEchartsData });
</script>

<style lang="scss" scoped>
    :deep() .van-picker {
        bottom: 0;
        position: fixed;
        width: 750px;
        left: 0;
    }

    .bottomChecked {
        background: #e7f1ff;
        border-radius: 10px;
        color: #1a75df;
    }

    .tuxiangBottom {
        padding: 0px 24px;
        display: flex;
        justify-content: space-between;
        font-size: 24px;
        color: #959ca7;
        align-items: center;
        margin-bottom: 20px;

        div {
            white-space: nowrap;
            padding: 18px 20px;
        }
    }
</style>
