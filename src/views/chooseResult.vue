<template>
    <section class="chooseResult-containerAll">
        <section class="process" style="background: #f8fbff; min-height: 100vh">
            <!-- <div class="title">结果出来啦</div> -->
            <!-- <div class="desc" style="margin-bottom:10px;">您选择的是“{{ $route.query.sceneType > 0 ? $route.query.type :
                chooseValue[$route.query.index] }}”</div>
            <div class="desc">大数据为您精选各阶段收益冠军基</div> -->
            <!-- <div class="reflue" @click="$router.back(-1)">重新选择</div> -->
            <section class="tabCont">
                <!-- <div class="wrap"> -->
                <div
                    @click="hdlChangeTab(index)"
                    v-for="(item, index) in chooseValue"
                    :class="tabIndex == index ? 'checked' : ''"
                >
                    {{ item }}
                </div>
                <!-- </div> -->
            </section>
            <section class="resultbg" ref="scoller">
                <template v-if="tabList[tabIndex]">
                    <section
                        v-for="(item, index) in tabList[tabIndex]"
                        :key="index"
                        class="containertItem"
                        @click="toDetail(item)"
                    >
                        <div class="containerItemTitle">
                            <span class="name">{{ item.fundName }}</span>
                            <span style="color: #959ca7">{{
                                item.secCode
                            }}</span>
                        </div>
                        <!-- 中间 -->
                        <div
                            v-if="!item.currencyFund"
                            class="containerItemCenter"
                        >
                            <div class="containerItemCenterItem">
                                <div class="baifenbi">
                                    {{ item.netValueProfit }}
                                    <span class="baifenhao">%</span>
                                </div>
                                <div>{{ item.netValueProfitType }}</div>
                            </div>
                            <div class="containerItemCenterItem">
                                <div class="baifenbi" style="color: #333">
                                    <!-- {{ item.establishedDate.split('年')[0] }} -->
                                    <span>{{ item.establishedDate }}</span>
                                </div>
                                <div>成立时长</div>
                            </div>
                            <div class="containerItemCenterItem">
                                <div class="baifenbi" style="color: #333">
                                    {{ item.managerName }}
                                </div>
                                <div>基金经理</div>
                            </div>
                        </div>
                        <div
                            v-if="item.currencyFund"
                            class="containerItemCenter"
                        >
                            <div class="containerItemCenterItem">
                                <div class="baifenbi">
                                    {{ item.netValueProfitOf7d }}
                                    <span class="baifenhao">%</span>
                                </div>
                                <div>七日年化</div>
                            </div>
                            <div class="containerItemCenterItem">
                                <div class="baifenbi" style="color: #333">
                                    {{ item.fundUnitProfitPer10kShares }}
                                </div>
                                <div>万份收益</div>
                            </div>
                            <div class="containerItemCenterItem">
                                <div class="baifenbi" style="color: #333">
                                    {{ item.assetNetValue }}
                                </div>
                                <div>基金规模</div>
                            </div>
                        </div>
                    </section>
                    <div v-if="tabList[tabIndex].length <= 0" class="no-data">
                        <img src="@/assets/no-data.png" alt="" />
                        <div>暂无数据</div>
                    </div>
                </template>
            </section>
        </section>
    </section>
</template>

<script lang="ts" setup>
    import useChooseResultStore from "@/store/chooseResult.store";
    import { storeToRefs } from "pinia";
    import { ref, watch } from "vue";
    import { useRoute } from "vue-router";

    const route = useRoute();
    const chooseValue = [
        "高风险高收益",
        "中风险中收益",
        "低风险低收益",
        "极端厌恶风险只想跑赢通货膨胀",
    ];

    const chooseResultStore = useChooseResultStore();
    const { tabIndex, tabList } = storeToRefs(chooseResultStore);
    const { changeTabIndex, best } = chooseResultStore;

    const hdlChangeTab = (index: number) => {
        changeTabIndex(index);
    };

    const scroller = ref<HTMLElement | null>(null);
    const initScroller = () => {
        if (scroller.value) {
            scroller.value.scrollTo(0, 0);
        }
    };

    watch(
        tabIndex,
        async () => {
            let areaArr = ["706005", "706003", "706001", "706006"];
            await best(areaArr[tabIndex.value]);
            initScroller();
        },
        { immediate: true },
    );

    // mounted() {
    //     getChooseFund({
    //         type: this.$route.query.type,
    //         sceneType: this.$route.query.sceneType
    //     }).then(d => {
    //         console.log(d.data);
    //         this.list = d.data;
    //     });
    // },
    const toDetail = (obj: any) => {
        let name = "app基金详情";
        if (obj.newFund) {
            name = "app新发基金详情";
        }

        location.href = `https://news.nbd.com.cn/fund-manager/c/appFundDetail?id=${
            obj.secCode
        }&ut=${route.query.ut || ""}`;
        // this.$router.push({
        //     name,
        //     query: {
        //         id: obj.secCode,
        //         ut: this.$route.query.ut
        //     }
        // });
    };
</script>

<style lang="scss" scoped>
    .chooseResult-containerAll {
        // padding: 0 32px;
        height: 100vh;
        overflow: hidden;
    }

    .tabCont {
        width: 100%;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        margin: 30px 0;
        white-space: nowrap;

        div {
            display: inline-block;
            padding: 12px 30px;
            background: #f0f0f0;
            color: #999999;
            margin-right: 8px;
        }
        .checked {
            background: rgb(230, 54, 64);
            color: #ffffff;
        }
    }

    .process {
        position: relative;
        padding: 0 32px;
        overflow: hidden;

        .reflue {
            position: absolute;
            color: #1a75df;
            border: 1px solid #1a75df;
            border-radius: 30px;
            padding: 18px 42px;
            top: 32px;
            right: 42px;
        }

        .resultbg {
            width: 100%;
            height: 82vh;
            background: url("../assets/fund/resultbg.png");
            border-radius: 20px;
            overflow-y: auto;
            padding: 32px 0;
        }
    }

    .containertItem {
        width: 622px;
        margin: auto;
        background: white;
        padding: 24px;
        box-sizing: border-box;
        margin-bottom: 8px;
        border-radius: 10px;
    }

    .containerItemCenter {
        display: flex;
        // margin: 12px;
        margin-bottom: 24px;

        .containerItemCenterItem {
            text-align: center;
            width: 33.33%;
            font-size: 24px;

            .baifenbi {
                font-size: 30px;
                color: #eb5648;
                font-weight: 600;
                margin-bottom: 8px;
            }

            .baifenhao {
                font-size: 24px;
                font-weight: 400;
            }
        }
    }

    .containerItemTitle {
        white-space: nowrap;
        margin-bottom: 24px;
        display: flex;
        align-items: flex-end;

        .name {
            padding-top: 10px;
            color: #333333;
            font-size: 30px;
            font-weight: 600;
            display: inline-block;
            margin-right: 12px;
            max-width: 460px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
        }

        .dbfund {
            width: 300px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }

        span {
            font-size: 24px;
        }
    }

    .rise {
        background: linear-gradient(180deg, #fff4f4 0%, #ffffff 100%);
    }

    .fall {
        background: linear-gradient(180deg, #e9f8f0 0%, #ffffff 100%);
    }

    .no-data {
        display: flex;
        flex-direction: column;
        font-size: 24px;
        color: rgba(255, 255, 255, 0.67);
        align-items: center;
        margin-top: 200px;
        img {
            width: 130px;
            display: block;
        }
    }
</style>
