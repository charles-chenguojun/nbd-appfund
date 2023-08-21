<template>
    <section class="biaoxianCont">
        <BiaoxianChart title="牛市表现" :data="bullBearMarket.bullMarket" />
        <BiaoxianChart title="熊市表现" :data="bullBearMarket.bearMarket" />
    </section>
</template>
<script lang="ts"></script>
<script lang="ts" setup>
    import BiaoxianChart from "./biaoxian-swipe.vue";
    import { onMounted, ref } from "vue";
    import useDiagnosticBasisStore from "@/store/diagnosticBasis.store";
    import { storeToRefs } from "pinia";
    import { useRoute } from "vue-router";
    let route = useRoute();
    let id = route.query.id;

    const diagnosticBasisStore = useDiagnosticBasisStore();
    const { bullBearMarket } = storeToRefs(diagnosticBasisStore);
    const { getMarket } = diagnosticBasisStore;

    onMounted(() => {
        if (id && !Array.isArray(id)) {
            getMarket(id);
            // getMarket("000001");
        }
    });
</script>

<style lang="scss" scoped>
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
    .niushi-chart {
        width: 100%;
        height: 500px;
    }
</style>
