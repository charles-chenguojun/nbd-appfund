<script setup lang="ts">
    import Guzhi from "./comps/Guzhi.vue";
    import { onMounted, ref } from "vue";
    import appApi, { ShareInfo } from "@/util/app-api";
    import { useRoute } from "vue-router";
    import etfDetailService from "@/api/etfDetail.service";
    import { EtfDetail } from "@/type/etfDetail.type";
    import EtfTable from "./comps/EtfTable.vue";
    import { isApp } from "@/util/common";
    import shareInfo from "@/router/weixinShare";
    import { Dialog } from "vant";
    // let arr = new Array(10).fill(0).map((item, i) => {
    //     return {
    //         key: "" + item,
    //         name: "基金名称" + "item",
    //         fixed: i == 0 || i == 1 ? "left" : i == 14 ? "" : "",
    //         sort: true,
    //     };
    // });

    const hookShare = (shareData: ShareInfo) => {
        try {
            if (isApp()) {
                appApi.hookShare(shareData);
            } else {
                shareInfo.init({
                    img: shareData.share_image,
                    title: shareData.share_title,
                    desc: shareData.share_digest,
                    shareURL: shareData.share_url,
                });
            }
        } catch (err) {}
    };
    const route = useRoute();
    const detail = ref(new EtfDetail());
    const getDetail = async () => {
        const code = route.params.code;
        if (code) {
            let res = await etfDetailService.getDetail(code as string);
            detail.value = res.data;
            let mode = process.env.NODE_ENV;
            let shareData = {
                share_url:
                    mode == "development"
                        ? `http://172.19.30.175:3001/#/etfDetail/${code}`
                        : `http://www.nbd.com.cn/corp/NBD-fund-app2/index.html#/etfDetail/${code}`,
                share_title: `${res.data.indexWithSuffix} ${res.data.indexName}`,
                share_image:
                    mode == "development"
                        ? "http://172.19.30.175:3001/nbd.png"
                        : `http://www.nbd.com.cn/corp/NBD-fund-app2/nbd.png`,
                share_digest: "",
            };
            hookShare(shareData);
        }
    };
    onMounted(() => {
        getDetail();
    });

    const hdlOpenIndexDetail = () => {
        let url = detail.value.indexDetailUrl;
        if (url) {
            window.location.href = detail.value.indexDetailUrl;
        }
    };

    const pePbIndex = ref(0);
    const hdlChangePePbIndex = (index: number) => {
        pePbIndex.value = index;
    };
    const eftIndex = ref(0);
    const hdlChangeEtfIndex = (index: number) => {
        eftIndex.value = index;
    };
    const hdlShowExplain = () => {
        Dialog({
            className: "explain-guzhi",
            message:
                "回测指数近３年估值，估值百分位是指目前的估值在近3年所有估值中所处的位置。估值百分位低于15%为极端低估，估值百分位处于15%~30%为低估，估值百分位处于30%~70%为适中，估值百分位处于70%~85%为高估，估值百分大于85%为极端高估。数据每个交易日更新。",
        });
    };
</script>

<template>
    <div class="page">
        <div class="etf-info">
            <div class="left">
                <div class="name">{{ detail.indexName }}</div>
                <div class="code">{{ detail.indexWithSuffix }}</div>
            </div>
            <div class="right" @click="hdlOpenIndexDetail">
                <img src="~@/assets/hangqing.png" alt="" />
                <span>实时行情</span>
            </div>
        </div>
        <div class="line"></div>
        <div class="section" v-if="detail.pbPercent && detail.pePercent">
            <div class="title-box" @click="hdlShowExplain()">
                <div class="section-title">指数估值</div>
                <div class="help">近3年</div>
            </div>
            <div class="tabs-box">
                <div class="tabs">
                    <div
                        class="tab"
                        :class="{ active: pePbIndex == 0 }"
                        @click="hdlChangePePbIndex(0)"
                    >
                        PE
                    </div>
                    <div
                        class="tab"
                        :class="{ active: pePbIndex == 1 }"
                        @click="hdlChangePePbIndex(1)"
                    >
                        PB
                    </div>
                </div>
            </div>
            <div class="tab-container" v-if="pePbIndex == 0">
                <Guzhi
                    :value="detail.pe"
                    :percent="detail.pePercent"
                    name="PE"
                />
            </div>
            <div class="tab-container" v-if="pePbIndex == 1">
                <Guzhi
                    :value="detail.pb"
                    :percent="detail.pbPercent"
                    name="PB"
                />
            </div>
        </div>
        <div class="line" v-if="detail.pbPercent && detail.pePercent"></div>
        <div class="section section2">
            <div class="title-box">
                <div class="section-title">跟踪基金</div>
            </div>
            <div class="tabs-box fixed">
                <div class="tabs">
                    <div
                        class="tab"
                        :class="{ active: eftIndex == 0 }"
                        @click="hdlChangeEtfIndex(0)"
                    >
                        场内ETF
                    </div>
                    <div
                        class="tab"
                        :class="{ active: eftIndex == 1 }"
                        @click="hdlChangeEtfIndex(1)"
                    >
                        场外基金
                    </div>
                </div>
            </div>
            <div class="tab-container table-box" v-if="eftIndex == 0">
                <EtfTable :data="detail.inFund" />
            </div>
            <div class="tab-container table-box" v-if="eftIndex == 1">
                <EtfTable :data="detail.outFund" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .etf-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 24px 32px;
        .left {
            .name {
                font-size: 40px;
                color: #333;
                font-weight: bold;
                margin-bottom: 16px;
            }
            .code {
                font-size: 30px;
                color: #999;
            }
        }
        .right {
            display: flex;
            align-items: center;
            color: #1a75df;
            font-size: 24px;
            height: 48px;
            padding: 0 18px;
            border-radius: 24px;
            background: #e7f1fc;
            white-space: nowrap;
            margin-left: 15px;
            img {
                width: 22px;
                margin-right: 9px;
            }
        }
    }
    .line {
        height: 8px;
        background: #f3f4f8;
    }
    .section {
        padding: 24px 32px;
        &.section2 {
            padding: 24px 0;
            .title-box {
                padding: 0 32px;
            }
        }
        .title-box {
            display: flex;
            align-items: flex-end;
            margin-bottom: 24px;
        }

        .help {
            font-size: 24px;
            color: #999;
            margin-left: 24px;
            display: flex;
            align-items: flex-start;
            &::after {
                content: "";
                display: block;
                width: 22px;
                height: 22px;
                background: url("../../assets/help.png") no-repeat center/cover;
                margin-left: 4px;
            }
        }

        &-title {
            color: #333;
            font-size: 30px;
            font-weight: bold;
        }
    }
    .tabs-box {
        padding-bottom: 24px;
        &.fixed {
            position: sticky;
            top: 0;
            z-index: 20;
            background: #fff;
            transform: translateZ(20px);
        }
    }
    .tabs {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #1a75df;
        width: 184px * 2;
        margin: auto;
        border-top-left-radius: 30px;
        border-bottom-right-radius: 30px;
        overflow: hidden;

        .tab {
            flex: 1;
            text-align: center;
            font-size: 24px;
            height: 48px;
            line-height: 48px;
            &:nth-child(1) {
                border-bottom-right-radius: 30px;
            }
            &:nth-child(2) {
                border-top-left-radius: 30px;
            }
            &.active {
                background: #1a75df;
                color: #fff;
            }
        }
    }

    ::v-deep .fixedColumsTable {
        .thead {
            position: sticky;
            top: 73px;
            z-index: 100;
            background: #fff;
            transform: translateZ(20px);
        }
    }
</style>
