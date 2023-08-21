<template>
    <section>
        <div @click="toVideDetail" class="AIVIDEO">
            <img src="../assets/AIVIDEO.png" alt="" />
        </div>
        <div class="AIhead">
            <div class="AIheadBg">
                <div>
                    <img class="zoushi" src="../assets/zoushi.png" alt="" />
                    所选基金
                </div>
                <div>
                    <span>
                        {{ fundInfo.fund && fundInfo.fund.fundName }}
                    </span>
                    <span @click="changeFund"
                        >更换基金<img src="../assets/you.png" alt=""
                    /></span>
                </div>
                <div>
                    {{ fundInfo.fund && fundInfo.fund.secCode }}
                </div>
            </div>
        </div>
        <section style="border: 0; padding-bottom: 0" class="itemCont">
            <div class="typeTitle">择时 <span>基金净值位置</span></div>
            <div
                v-if="
                    (zeshiText.length >= 2 && zeshiText[0] !== '') ||
                    zeshiText[0] !== ''
                "
                class="textCont firstItem"
            >
                <div v-for="(item, index) in zeshiText[0].split('：')">
                    {{ item }} {{ index === 0 && item !== "" ? "：" : ""
                    }}<img
                        v-if="index === 0 && item !== ''"
                        class="wenhao"
                        @click="ToastFn(6)"
                        src="../assets/wenhao.png"
                        alt=""
                    />
                </div>
                <div v-if="zeshiText[1] !== ''">{{ zeshiText[1] }}</div>
            </div>
            <div class="chooseType">
                <div
                    v-for="(item, index) in echartsType"
                    :class="echartsTypeIndex === index ? 'checked' : ''"
                    @click="echartsTypeIndex = index"
                >
                    {{ item }}
                </div>
            </div>
            <div class="echartsTem">
                <div>
                    <p class="leftP">
                        <span></span>高净值区<img
                            class="wenhao"
                            @click="ToastFn(0)"
                            src="../assets/wenhao.png"
                            alt=""
                        />
                    </p>
                    <p style="color: #ee2a36">
                        - - - - 净值高中位分割线：{{
                            toLength(areaDataInfo.height)
                        }}<img
                            class="wenhao"
                            @click="ToastFn(1)"
                            src="../assets/wenhao.png"
                            alt=""
                        />
                    </p>
                </div>
                <div>
                    <p class="leftP">
                        <span style="background: #ffd7ae"></span>中净值区<img
                            class="wenhao"
                            @click="ToastFn(2)"
                            src="../assets/wenhao.png"
                            alt=""
                        />
                    </p>
                    <p style="color: #ffa54a">
                        - - - - 净值中低位分割线：{{ toLength(areaDataInfo.low)
                        }}<img
                            class="wenhao"
                            @click="ToastFn(3)"
                            src="../assets/wenhao.png"
                            alt=""
                        />
                    </p>
                </div>
                <div style="margin-bottom: 0">
                    <p class="leftP">
                        <span style="background: #97c6ff"></span>低净值区<img
                            class="wenhao"
                            @click="ToastFn(4)"
                            src="../assets/wenhao.png"
                            alt=""
                        />
                    </p>
                    <p style="color: #1a75df">
                        - - - - 净值中位：{{ toLength(areaDataInfo.middle)
                        }}<img
                            class="wenhao"
                            @click="ToastFn(5)"
                            src="../assets/wenhao.png"
                            alt=""
                        />
                    </p>
                </div>
            </div>
            <div class="switch">
                <van-checkbox icon-size="12px" v-model="checked"
                    >仅展示净值走势</van-checkbox
                >
            </div>
        </section>
        <DetailEcharts
            ref="childRef"
            @dataChange="dataChange"
            @areaDataChange="areaDataChange"
        />
        <section style="padding-top: 0; border-bottom: 0" class="itemCont">
            <div class="jingaotishi">
                <img
                    src="../assets/gantanhao.png"
                    alt=""
                />结果仅供参考，不构成投资建议。市场有风险，操作需谨慎。
            </div>
        </section>
        <!-- 表现 -->
        <Biaoxian />
        <!-- 择基 -->
        <section v-if="fundInfo.fund" class="itemCont">
            <div class="typeTitle">择基 <span>基金核心特征</span></div>
            <div class="textCont secendItem">
                <div
                    v-if="fundInfo.fund && fundInfo.fund.fundTagList.length > 0"
                >
                    独家标签:
                    <div class="scroolCont">
                        <span
                            class=""
                            v-for="item in fundInfo.fund.fundTagList"
                            >{{ item }}</span
                        >
                    </div>
                </div>
                <div>基金类型：{{ fundInfo.fund.fundInvestType }}</div>
                <div>基金风险：{{ fundInfo.fund.fundRiskType }}</div>
                <div class="zhishu" v-if="fundInfo.fund.followIndexInfo">
                    跟踪指数：{{
                        fundInfo.fund.followIndexInfo &&
                        fundInfo.fund.followIndexInfo.indexName
                    }}
                    <p
                        @click="
                            toPath(
                                fundInfo.fund.followIndexInfo.detailUrl,
                                fundInfo.fund.followIndexInfo.thscode,
                                fundInfo.fund.followIndexInfo.indexName,
                            )
                        "
                    >
                        指数详情<img src="@/assets/youed.png" alt="" />
                    </p>
                </div>
                <!-- <div v-if="fundInfo.fund.fundBenchmarkInfoList && fundInfo.fund.fundBenchmarkInfoList.length > 0">跟踪指数：<a
            :href="fundInfo.fund.fundBenchmarkInfoList[0].detailUrl" target="_blank">{{
                fundInfo.fund.fundBenchmarkInfoList[0].indexName
            }}</a></div> -->
            </div>
        </section>
        <!-- 择人 -->
        <section v-if="fundInfo.managers" class="itemCont">
            <div class="typeTitle">择人 <span>基金经理分析</span></div>
            <div v-for="item in fundInfo.managers" class="textCont secendItem">
                <div style="font-weight: 600">
                    {{ item.managerName }}
                </div>
                <section class="info">
                    <div>
                        <h4
                            :style="{
                                color: getColor(item.managerLastYearEarn),
                            }"
                        >
                            {{
                                (item.managerLastYearEarn &&
                                    item.managerLastYearEarn + "%") ||
                                "-"
                            }}
                        </h4>
                        <h4>近1年收益</h4>
                    </div>
                    <div>
                        <h4 :style="{ color: getColor(item.yearEarn) }">
                            {{ item.yearEarn }}%
                        </h4>
                        <h4>年化收益</h4>
                    </div>
                    <div>
                        <h4>{{ item.cumulativeTime }}</h4>
                        <h4>从业年限</h4>
                    </div>
                    <div>
                        <h4>{{ item.maxReturn }}%</h4>
                        <h4>从业最大回撤</h4>
                    </div>
                    <div>
                        <h4>{{ item.totalScale }}</h4>
                        <h4>管理规模</h4>
                    </div>
                </section>
                <div
                    v-if="item.managerTags && item.managerTags.length > 0"
                    class="tagsItem"
                >
                    基金经理独家标签：
                    <div class="scroolCont">
                        <span class="" v-for="item1 in item.managerTags">{{
                            item1
                        }}</span>
                    </div>
                </div>
                <p @click="toDetail(item.appManagerDetailUrl)">
                    详情<img src="@/assets/youed.png" alt="" />
                </p>
            </div>
        </section>
        <!-- 问答 -->
        <section
            class="itemCont"
            v-if="
                fundInfo.questionAnswers && fundInfo.questionAnswers.length > 0
            "
            style="padding-bottom: 0; border: 0"
        >
            <div class="typeTitle">问答</div>
            <div
                v-if="fundInfo.questionAnswers"
                v-for="(item, index) in fundInfo.questionAnswers"
                v-show="index < count"
                class="qsItem"
            >
                <div>请问此基抗涨跌的能力如何？</div>
                <div>2个回答</div>
            </div>
            <p
                v-if="
                    fundInfo.questionAnswers &&
                    fundInfo.questionAnswers.length > 2
                "
                class="showAll"
                @click="count = 100"
            >
                展开全部
            </p>
        </section>
        <div class="jingaotishi lastBottom">
            <img
                src="../assets/gantanhao.png"
                alt=""
            />结果仅供参考，不构成投资建议。市场有风险，操作需谨慎。
        </div>
        <Tabbar :info="fundInfo.fund || {}" />
        <van-popup round v-model:show="show">
            <div class="prpupCont">
                <div>{{ showText }}</div>
                <div @click="show = false">我知道了</div>
            </div>
        </van-popup>
    </section>
</template>
<script lang="ts" setup>
    import { ref, watch, onMounted } from "vue";
    import { useRouter, useRoute } from "vue-router";
    import { Toast, Checkbox as VanCheckbox, Popup as VanPopup } from "vant";
    import DetailEcharts from "@/components/detailEcharts.vue";
    import Tabbar from "@/components/tabbr.vue";
    import { getAiBasic } from "@/api";
    import { getColor } from "@/util/Debounced";
    import concatApp from "@/util/concatApp";
    import Biaoxian from "@/components/biaoxian.vue";

    Toast.setDefaultOptions({ duration: 0, closeOnClick: true });

    const toVideDetail = () => {
        location.href = `http://nbd-luyan-1252627319.cos.ap-shanghai.myqcloud.com/nbd-console/d04f2392fe9fc58211a588a0308c5bc6.mp4`;
    };
    const toPath = (url: string, code: string, name: string) => {
        if (url) {
            concatApp.appToPage({
                operate: "open_stock",
                stock_suffix: code,
                stock_name: name,
                stock_url: url,
            });
        }
    };
    const toDetail = (url: string) => {
        location.href = url;
    };
    const show = ref(false);
    const count = ref(2);
    const $router = useRouter();
    const $route = useRoute();
    const fundInfo = ref<any>({});
    interface areaDataInfo {
        height?: string;
        low?: string;
        middle?: string;
    }
    const areaDataInfo = ref<areaDataInfo>({});
    const areaDataChange = (obj: areaDataInfo) => {
        areaDataInfo.value = obj;
    };
    onMounted(() => {
        getAiBasic($route.query.id).then((d: any) => {
            console.log(d);
            if (d) fundInfo.value = d;
        });
    });
    const toLength = (str: string | undefined) => {
        if (str) return str.substring(0, 6);
    };
    const checked = ref(false);
    const echartsType = ["按日", "按周"];
    const echartsTypeIndex = ref(0);
    const childRef = ref(null);
    //调用子组件 切换
    const arr = ["daily", "weekly"];
    watch(echartsTypeIndex, () => {
        (childRef.value as any).initEchartsData(
            arr[echartsTypeIndex.value],
            checked.value,
        );
    });
    watch(checked, () => {
        (childRef.value as any).initEchartsData(
            arr[echartsTypeIndex.value],
            checked.value,
        );
    });
    const showText = ref("");
    const ToastFn = (i: number) => {
        const textArr: any[] = [
            "高净值区：理论上颜色越深风险较大。",
            "净值高位与中位分割线：选定区间内，净值已从最高位跌去38.2%的区间最大跌幅，此时净值形成净值高位与中位分割线。",
            "中净值区：代表过去一段时间基金净值涨跌幅有限，位于中部区间，理论上仍有一定风险。",
            "净值中位与低位分割线：选定区间内，净值已从最高位跌去61.8%的区间最大跌幅，此时净值形成净值中位与低位分割线。",
            "低净值区：理论上颜色越深风险较小。",
            "净值中位：选定区间内，所有净值的中位值。",
            "净值区间：每经APP把基金过往净值分为3个主要区间，分别是高净值区（包括超高净值区、中高净值区）、中净值区、低净值区（包括超低净值区、中低净值区）。区间以净值低位线和净值高位线来进行分割，划线依据为0.618黄金分割理论。净值均线：每经APP首创，类似股票均线策略，将5日、10日、20日基金日复权单位净值平均值，以及5周、10周、20周基金周复权单位净值平均值形成均线，作为辅助指标判断基金涨跌趋势以及空间位置。一般说来，如果净值处于一定时期低位且均线开始交叉上穿，此时基金风险相对较小；如果净值处于一定时期高位且均线开始交叉下穿，此时基金风险相对较大。均线共有金叉、死叉、多头、空头四类形态。",
        ];
        show.value = true;
        showText.value = textArr[i];
        // Toast(textArr[i])
    };
    const zeshiText = ref<any>(["", ""]);
    const dataChange = (arr: []) => {
        console.log(arr);
        zeshiText.value = arr;
    };
    const changeFund = () => {
        // $router.back();
        // location.href = `http://www.nbd.com.cn/corp/NBD-fund-app/index.html#/aiSearch`;
        $router.push("/aiSearch");
    };
</script>

<style lang="scss" scoped>
    .prpupCont {
        width: 600px;
        height: 520px;
        background: white;
        padding: 62px 44px 32px;
        box-sizing: border-box;
        border-radius: 20px;
        font-size: 30px;

        div:nth-child(1) {
            height: 340px;
            overflow-y: auto;
            line-height: 46px;
            margin-bottom: 20px;
        }

        div:nth-child(2) {
            width: 300px;
            height: 80px;
            background: rgb(238, 42, 54);
            border-radius: 20px;
            text-align: center;
            line-height: 80px;
            margin: auto;
            color: white;
        }
    }

    .lastBottom {
        background: #f3f4f8;
        padding: 32px 26px;
    }

    .showAll {
        text-align: center;
        margin: 32px 0;
        color: #1a75df;
    }

    .qsItem {
        margin-top: 28px;

        div {
            font-size: 30px;
            margin-bottom: 24px;
        }

        div:nth-child(2) {
            color: #999999;
            font-size: 24px;
            margin-bottom: 32px;
        }

        border-bottom: 1px solid #dedede;
    }

    .info {
        display: flex;
        justify-content: space-between;

        div {
            display: block !important;

            h4 {
                text-align: center;
                font-weight: 400;
                color: #999999;
                margin: 16px 0;
                font-size: 24px;
            }

            h4:nth-child(1) {
                font-size: 30px;
                font-weight: 600;
                color: #333;
            }
        }

        div:nth-child(1),
        div:nth-child(2) {
            h4:nth-child(1) {
                color: #e63640;
                font-size: 30px;
            }
        }
    }

    .secendItem {
        padding: 30px 22px !important;

        div {
            margin-bottom: 25px;
            white-space: nowrap;
        }

        div:nth-child(1),
        .tagsItem {
            display: flex;
            align-items: center;
        }

        .scroolCont {
            display: inline-block;
            // background: red;
            margin: 0;
            width: 480px;
            white-space: nowrap;
            overflow-x: auto;

            span {
                display: inline-block;
                padding: 6px 10px;
                color: #1a75df;
                border: 1px solid #1a75df;
                border-radius: 6px;
                margin: 0 8px;
            }
        }

        p {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #1a75df;

            img {
                width: 26px;
            }
        }
    }

    .switch {
        // display: flex;
        // justify-content: right;
        margin-bottom: 0;
        font-size: 20px;
        margin-top: 10px;
        width: 100%;
        position: relative;
        height: 40px;
    }

    :deep() .van-checkbox {
        position: absolute;
        right: 0;
    }

    .wenhao {
        width: 22px;
        margin-left: 10px;
    }

    .echartsTem {
        div {
            display: flex;
            margin-bottom: 16px;

            // align-items: center;
            .leftP {
                // width: 260px;
                display: flex;
                align-items: center;
                white-space: nowrap;
                margin-right: 20px;
            }

            p {
                font-size: 20px;
                display: inline-block;

                span {
                    display: inline-block;
                    width: 28px;
                    height: 28px;
                    background: #fd757c;
                    opacity: 1;
                    border-radius: 4px;
                    margin-right: 8px;
                }
            }
        }
    }

    .chooseType {
        display: flex;
        justify-content: center;
        border-radius: 10px;
        margin: 20px 0 42px;

        div {
            width: 233px;
            height: 48px;
            text-align: center;
            line-height: 50px;
            background: #f4f5f6;
            color: #999;
            border: 1px solid transparent;
        }

        .checked {
            background: white !important;
            color: #ee2a36;
            font-weight: 600;
            border-color: #f4f5f6;
        }
    }

    .itemCont {
        padding: 32px 24px;
        border-bottom: 10px solid #f3f4f8;

        a {
            color: #333;
            text-decoration: none;
        }

        .textCont {
            background: #f3f7fc;
            padding: 16px 24px;
            border-radius: 10px;
            margin-top: 18px;
            font-size: 28px;
        }

        .firstItem {
            div {
                margin-bottom: 14px;
            }

            div:nth-child(3) {
                margin-bottom: 0;
            }
        }
    }

    .AIhead {
        padding: 24px;
        border-bottom: 10px solid #f3f4f8;

        .AIheadBg {
            width: 702px;
            height: 160px;
            background: url("../assets/headbg.png");
            margin: auto;
            background-size: 702px;
            padding: 25px 32px 28px 24px;
            box-sizing: border-box;

            div {
                color: white;
                font-size: 24px;
            }

            div:nth-child(1) {
                color: #cde6fa;
            }

            div:nth-child(2) {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 16px 0;

                span:nth-child(1) {
                    font-size: 30px;
                    white-space: nowrap;
                    display: inline-block;
                    width: 500px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                span:nth-child(2) {
                    color: #cde6fa;

                    img {
                        width: 20px;
                    }
                }
            }
        }
    }

    .typeTitle {
        font-size: 30px;
        font-weight: 600;

        span {
            font-size: 22px;
            font-weight: 400;
        }
    }

    .zoushi {
        width: 24px;
    }

    .zhishu {
        display: flex;

        p {
            margin-left: 20px;
        }
    }

    .AIVIDEO {
        width: 702px;
        margin: 20px auto 0;

        img {
            width: 100%;
        }
    }
</style>
