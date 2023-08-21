<template>
    <section class="outBgm">
        <div class="historyBgm">
            <div v-for="item in list" class="historyItem" @click="toDetail(item)">{{ item }}</div>
        </div>
    </section>
</template>
<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { getone_day_records, history_records } from '@/api/activity';
import AppFn from "@/util/apptoken";

const $route = useRoute();
const list = ref<any>([]);

onMounted(() => {
    if ($route.query.type === 'niugu') {
        history_records().then((d: any) => {
            console.log(d)
            list.value = d.records;
        })
        return
    }
    getone_day_records().then((d: any) => {
        console.log(d)
        list.value = d.records;
    })
})
const $router = useRouter();
const toDetail = (date: string) => {
    if ($route.query.type === 'niugu') {
        $router.push({
            name: 'activityIndex',
            query: {
                date
            }
        })
        return
    }
    $router.push({
        name: 'historyDetail',
        query: {
            date
        }
    })
}
</script>
<style lang="scss" scoped>
.outBgm {
    width: 750px;
    height: 100vh;
    background: url('../../assets/activity/historyBgm.png');
    background-size: 750px 100vh;
    overflow-y: auto;
    padding: 44px 0px 44px 24px;
    box-sizing: border-box;
}

.historyBgm {
    width: 750px;
    background-size: 750px 100vh;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;

    .historyItem {
        width: 223px;
        height: 64px;
        border: 3px solid #FFCAA8;
        background: linear-gradient(180deg, #FC9457 0%, #EE3E29 100%);
        border-radius: 10px;
        margin-right: 10px;
        text-align: center;
        line-height: 64px;
        font-size: 30px;
        color: white;
        margin-bottom: 20px;
    }
}
</style>
