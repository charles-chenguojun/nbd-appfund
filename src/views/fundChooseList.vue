<template>
    <section class="allCont updateScroollStyle" style="overflow-y: hidden">
        <h1></h1>
        <section class="listContent fundChooseList updateScroollStyle">
            <VanList
                ref="Vanlist"
                :list="list"
                @onLoad="onLoad"
                @onRefresh="onRefresh"
                :isSolt="true"
            >
                <template v-slot:main>
                    <section
                        @click="
                            openUrl(item.fundDetailUrl, item.fundCodeWithSuffix)
                        "
                        v-for="item in list"
                        class="item"
                    >
                        <div class="titleAndCode fundItemTitle">
                            {{ item.fundName }} <span>{{ item.fundCode }}</span>
                        </div>
                        <div class="itemTwo">
                            <div>
                                <p>{{ item.latestPrice || "-" }}</p>
                                <p>最新价</p>
                            </div>
                            <div>
                                <p
                                    :style="{
                                        color: getColor(item.fluctuationRange),
                                    }"
                                >
                                    {{
                                        (item.fluctuationRange &&
                                            item.fluctuationRange + "%") ||
                                        "-"
                                    }}
                                </p>
                                <p>涨跌幅</p>
                            </div>
                            <div>
                                <p>{{ item.preClose || "-" }}</p>
                                <p>昨收</p>
                            </div>
                            <div>
                                <p>
                                    {{ item.assetNv || "-"
                                    }}{{ item.assetNvUnit }}
                                </p>
                                <p>基金规模</p>
                            </div>
                        </div>
                    </section>
                </template>
            </VanList>
        </section>
    </section>
</template>

<script lang="ts" setup>
    import VanList from "@/components/list.vue";
    import { ref, onMounted } from "vue";
    import { useRoute } from "vue-router";
    import { Icon as VanIcon } from "vant";
    import { tagForJJXSList } from "@/api";
    import { getColor } from "@/util/Debounced";
    import concatApp from "@/util/concatApp";
    const Vanlist = ref<any>(null);
    const $route = useRoute();
    const list = ref<any>([]);
    let pageNum = 1,
        pageSize = 20;
    onMounted(() => {
        const str = decodeURIComponent($route.query.title as any);
        document.title = str + (str == "从业超10年，年化收益超10" ? "%" : "");
        getList();
    });

    const openUrl = (url: string, code: string) => {
        // location.href = url;
        const name = url.split("&")[1].split("=")[1];
        concatApp.appToPage({
            operate: "open_stock",
            stock_suffix: code,
            stock_name: name,
            stock_url: url,
        });
    };
    const init = () => {
        Vanlist.value.updateStatus(false);
        pageNum = 0;
        pageSize = 10;
        list.value = [];
        getList();
    };
    const getList = () => {
        Vanlist.value.updateLoadingStatus(true);
        tagForJJXSList({ labelName: $route.query.title }).then((d: any) => {
            console.log(d);
            if (d) {
                list.value = [...list.value, ...d.data.etfFundVOList];
                Vanlist.value.updateStatus();
            }
            pageNum += 1;
            Vanlist.value.updateLoadingStatus(false);
        });
    };
    const onLoad = () => {
        console.log(111);
        getList();
    };
    const onRefresh = () => {
        init();
    };
</script>

<style lang="scss" src="./II.scss" scoped></style>
