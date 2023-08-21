<script setup lang="ts">
    import FixedColumsTable, {
        Colum,
    } from "@/components/FixedColumsTable/FixedColumsTable.vue";
    import { Fund } from "@/type/etfDetail.type";
    import { reactive, toRefs } from "vue";
    import UpOrDown from "@/components/UpOrDown.vue";
    const props = defineProps<{
        data: Fund[];
    }>();

    console.log(props.data);

    let arr = [
        {
            key: "0",
            name: "基金名称",
            fixed: "left",
        },
        {
            key: "1",
            name: "基金规模",
            fixed: "left",
            sort: "realSize",
        },
        {
            key: "2",
            name: "日涨幅",
            sort: "nowEarn",
        },
        {
            key: "3",
            name: "近1周",
            sort: "countEarn.recentWeekEarn",
        },
        {
            key: "4",
            name: "近1月",
            sort: "countEarn.recent1MonthEarn",
        },
        {
            key: "5",
            name: "近3月",
            sort: "countEarn.recent3MonthEarn",
        },
        {
            key: "6",
            name: "近6月",
            sort: "countEarn.recent6MonthEarn",
        },
        {
            key: "7",
            name: "近1年",
            sort: "countEarn.recent1YearEarn",
        },
        {
            key: "8",
            name: "近3年",
            sort: "countEarn.recent3YearEarn",
        },
        {
            key: "9",
            name: "近5年",
            sort: "countEarn.recent5YearEarn",
        },
        {
            key: "10",
            name: "成立来<br/>成立时间",
            sort: "countEarn.sinceEstablishmentEarn",
        },
    ];
    const colums = reactive<Colum[]>(arr);
</script>

<template>
    <template v-if="(props.data && props.data.length > 0)">
        <FixedColumsTable
            :colums="colums"
            :data="props.data"
            v-slot="slotProps"
        >
            <div v-for="(item, i) in (slotProps.data as Fund[])" :key="i">
                <div class="item eft-name" :data-code="item.secCode">
                    {{ item.secShortName }}<br />
                    <span class="code">{{ item.secCode }}</span>
                </div>
                <div class="item">{{ item.size }}{{ item.sizeUnit }}</div>
                <UpOrDown :value="item?.nowEarn" />
                <UpOrDown :value="item?.countEarn?.recentWeekEarn" />
                <UpOrDown :value="item?.countEarn?.recent1MonthEarn" />
                <UpOrDown :value="item?.countEarn?.recent3MonthEarn" />
                <UpOrDown :value="item?.countEarn?.recent6MonthEarn" />
                <UpOrDown :value="item?.countEarn?.recent1YearEarn" />
                <UpOrDown :value="item?.countEarn?.recent3YearEarn" />
                <UpOrDown :value="item?.countEarn?.recent5YearEarn" />
                <div>
                    <UpOrDown :value="item?.countEarn?.sinceEstablishmentEarn" />
                    <div>
                        {{ item?.establishmentTime?.split("T")[0] }}
                    </div>
                </div>
            </div>
        </FixedColumsTable>
    </template>
    <div v-else class="no-data">
        <img src="@/assets/no-data2.png" alt="">
        <div>暂无数据</div>
    </div>
</template>

<style lang="scss" scoped>
    .code {
        color: #999;
        font-size: 20px;
        margin-top: 2px;
        text-align: left;
    }
    .eft-name {
        padding-left: 32px;
        text-align: left;
        align-items: flex-start;
    }
    .no-data{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
            color: #999;
            font-size: 26px;
        img{
            width: 200px;
            display: block;
        }
    }
</style>
