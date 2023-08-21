<template>
    <section class="chooseResult-containerAll">
        <section class="process" style="background: #f8fbff; min-height: 100vh">
            <!-- <div class="title">结果出来啦</div> -->
            <!-- <div class="desc" style="margin-bottom:10px;">您选择的是“{{ $route.query.sceneType > 0 ? $route.query.type :
                chooseValue[$route.query.index] }}”</div>
            <div class="desc">大数据为您精选各阶段收益冠军基</div> -->
            <!-- <div class="reflue" @click="$router.back(-1)">重新选择</div> -->
            <section class="tabCont">
                <div
                    @click="hdlChangeTab(index)"
                    v-for="(item, index) in chooseValue"
                    :class="tabIndex == index ? 'checked' : ''"
                >
                    {{ item }}
                </div>
            </section>
            <div class="chooseArea" @click="show = true">其他国家/地区</div>
            <section class="resultbg" ref="scroller">
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
        <van-popup
            v-model:show="show"
            position="bottom"
            :style="{ height: '60%' }"
            :lock-scroll="true"
            :round="true"
        >
            <div class="area-btns">
                <div class="close" @click="show = false">x</div>
                <div class="sure" @click="sure">确定</div>
            </div>
            <AreaIndexBar :data="areaList" @change="changeArea" />
            <!-- <van-index-bar :index-list="indexList" :sticky="true">
                <div v-for="(value, key, index) in areaList" :key="key">
                    <van-index-anchor :index="key" />
                    <van-cell
                        v-for="item in value"
                        :title="item"
                        :key="item"
                        :value="seledArea.includes(item) ? '✔' : ''"
                        @click="() => changeSeledArea(item)"
                    />
                </div>
            </van-index-bar> -->
        </van-popup>
    </section>
</template>

<script lang="ts" setup>
    import { onMounted, ref, watch } from "vue";
    import { useRoute, useRouter } from "vue-router";
    import { Popup as vanPopup, Toast } from "vant";
    import AreaIndexBar from "@/components/AreaIndexBar.vue";
    import useAreaResultStore from "@/store/areaResult.store";
    import { storeToRefs } from "pinia";
    const areaResultStore = useAreaResultStore();
    const { areaList, tabIndex, tabList } = storeToRefs(areaResultStore);
    const { district, changeTabIndex, best } = areaResultStore;

    onMounted(async () => {
        district();
    });

    const show = ref(false);
    let areaArr = ["美国", "中国香港"];

    const changeArea = (val: string[]) => {
        areaArr[2] = val ? val.join(",") : "";
    };
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
            initScroller();
            await best(areaArr[tabIndex.value > 2 ? 2 : tabIndex.value]);
        },
        { immediate: true },
    );
    let count = 2;
    const sure = () => {
        let area = areaArr[2];
        if (!area) {
            Toast("请选择国家/地区");
            return;
        }
        changeTabIndex(count);
        show.value = false;
        count++;
    };

    // const tabIndex = ref(0);
    const route = useRoute();
    const chooseValue = ["重仓美股", "重仓港股"];
    // mounted() {
    //     getChooseFund({
    //         type: this.$route.query.type,
    //         sceneType: this.$route.query.sceneType
    //     }).then(d => {
    //         console.log(d.data);
    //         this.list = d.data;
    //     });
    // },
    // 详情链接 https://news.nbd.com.cn/fund-manager/c/appFundDetail?id=004243
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
    ::v-deep .van-popup--round {
        --van-popup-round-border-radius: 10px !important;
    }
    .area-btns {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: sticky;
        top: 0;
        z-index: 100;
        background: #fff;
        height: 64px;
        padding: 0 10px;
        font-size: 26px;
        > div {
            padding: 10px;
        }
        .sure {
            color: #2680eb;
        }
    }
    .van-index-bar {
        // padding-top: 40px;
        height: calc(100% - 65px);
        overflow-y: auto;
        padding-top: 1px;

        ::v-deep .van-index-bar__sidebar {
            position: absolute;
        }
        ::v-deep .van-cell__value {
            color: #f00;
            padding-right: 15px;
        }
    }
    .chooseArea {
        position: fixed;
        top: 40px;
        right: 32px;
        color: #2680eb;
    }

    .chooseResult-containerAll {
        // padding: 0 32px;
        height: 100vh;
        overflow: hidden;
    }

    .tabCont {
        width: 100%;
        overflow-x: auto;
        white-space: nowrap;
        margin: 30px 0;

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
