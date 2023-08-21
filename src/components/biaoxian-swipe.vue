<template>
    <template v-if="data && data.length > 0">
        <h1 class="niushibiaoxian">{{ title }}</h1>
        <van-swipe class="swipe">
            <van-swipe-item
                v-for="(item, index) in data"
                :autoplay="3000"
                :key="index"
            >
                <section class="biaoxianDesc">
                    {{ item.text }}
                </section>
                <section
                    :ref="(el) => initCharts(el, index)"
                    class="chart"
                    :class="`c${index}`"
                ></section>
            </van-swipe-item>
        </van-swipe>
    </template>
</template>

<script lang="ts" setup>
    import { Swipe as VanSwipe, SwipeItem as VanSwipeItem } from "vant";
    import * as echarts from "echarts";
    import { onUpdated, ref, toRefs } from "vue";
    import { Market } from "@/type/diagnosticBasis.type";

    const props = withDefaults(
        defineProps<{ title: string; data: Market[] }>(),
        {
            title: "",
            data: () => [],
        },
    );
    const { title, data } = toRefs(props);

    function getInfoByValue(val: number, index: number) {
        let y = val > 0 ? 0 : 1;
        let y1 = val > 0 ? 1 : 0;
        let colors = [
            new echarts.graphic.LinearGradient(0, y, 0, y1, [
                { offset: 1, color: "rgba(70,99,193,0.7)" },
                { offset: 0, color: "rgba(70,99,193,1)" },
            ]),
            new echarts.graphic.LinearGradient(0, y, 0, y1, [
                { offset: 1, color: "rgba(200,200,200,0.7)" },
                { offset: 0, color: "rgba(200,200,200,1)" },
            ]),
            new echarts.graphic.LinearGradient(0, y, 0, y1, [
                { offset: 1, color: "rgba(188,212,244,0.7)" },
                { offset: 0, color: "rgba(188,212,244,1)" },
            ]),
        ];
        let borderRadiusArr = [
            [5, 5, 0, 0],
            [0, 0, 5, 5],
        ];

        return {
            color: colors[index],
            borderRadius: val > 0 ? borderRadiusArr[0] : borderRadiusArr[1],
        };
    }

    function createOption(): echarts.EChartsOption {
        return {
            legend: [
                {
                    formatter: (name) => {
                        return name;
                    },
                    icon: "circle",
                    itemWidth: 15,
                    textStyle: {
                        color: "#666666",
                        fontSize: 12,
                        lineHeight: 14,
                    },
                    itemGap: 25,
                },
            ],
            grid: {
                top: 60,
                bottom: 30,
                left: 0,
                right: 0,
            },
            xAxis: {
                type: "category",
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    fontSize: 12,
                    color: "#333",
                    fontWeight: "bold",
                },
                data: [],
                offset: 10,
            },
            yAxis: {
                type: "value",
                show: false,
            },
            series: [
                {
                    name: "本基金的\r\n牛市表现",
                    data: [],
                    // itemStyle: getInfoByValue(0, 0),
                    type: "bar",
                    barWidth: 35,
                    label: {
                        show: true,
                        position: "outside",
                        color: "#999",
                        formatter: "{c}%",
                    },
                },
                {
                    name: "同类基金的\r\n牛市表现",
                    data: [],
                    // itemStyle: getInfoByValue(-83.94, 1),
                    type: "bar",
                    barWidth: 35,
                    label: {
                        show: true,
                        position: "outside",
                        color: "#999",
                        formatter: "{c}%",
                    },
                },
                {
                    name: "同期沪深300的\r\n牛市表现",
                    data: [],
                    // itemStyle: getInfoByValue(95.67, 2),
                    type: "bar",
                    barWidth: 35,
                    barGap: "40%",
                    label: {
                        show: true,
                        position: "outside",
                        color: "#999",
                        formatter: "{c}%",
                    },
                },
            ],
        };
    }
    const charts = ref<HTMLElement[]>([]);
    const initCharts = (el: any, index: number) => {
        if (!charts.value[index] && el) {
            charts.value[index] = el;
        }
    };
    onUpdated(() => {
        if (data.value) {
            setTimeout(() => {
                data.value.forEach((item, index) => {
                    let chart = charts.value[index];
                    var myChart = echarts.init(chart);
                    let option = createOption();

                    (option.xAxis as echarts.XAXisOptionExtand).data = [item.x];
                    item.y.forEach((val, i) => {
                        (option.series as echarts.BarSeriesOption[])[i].data = [
                            val,
                        ];
                        (option.series as echarts.BarSeriesOption[])[
                            i
                        ].itemStyle = getInfoByValue(val, i);
                    });
                    myChart.setOption(option);
                });
            }, 25);
        }
    });
</script>

<style lang="scss">
    .van-swipe {
        padding-bottom: 45px;
        &__indicator {
            background: #999;
            opacity: 0.7 !important;
            &--active {
                opacity: 1 !important;
                background: rgb(25, 137, 250);
            }
        }
    }

    .biaoxianCont {
        padding: 24px;
        border-bottom: 10px solid #f3f4f8;
    }

    .niushibiaoxian {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 24px;
    }

    .biaoxianDesc {
        color: #666;
        font-size: 24px;
        line-height: 45px;
        background: #f3f7fc;
        margin-bottom: 16px;
        border-radius: 10px;
        padding: 24px;
    }
    .chart {
        width: 100%;
        height: 500px;
    }
</style>
1023815968
