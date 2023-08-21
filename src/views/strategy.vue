<template>
    <div>
        <Tab :arr="['全部', '新闻', '投教']" @typeChange="typeChange" />
        <section class="listContent">
            <VanList :list="list" @onLoad="onLoad" ref="Vanlist" @onRefresh="onRefresh" />
        </section>
    </div>
</template>
<script lang="ts" setup>
import Tab from '@/components/tab.vue';
import VanList from '@/components/list.vue';
import { ref, onMounted } from 'vue';
import { getArticle } from '@/api';

let pageType = 0;
let pageNum = 0, pageSize = 10;
const Vanlist = ref<any>(null);
const typeChange = (i: number) => {
    pageType = i;
    init();
}
onMounted(() => {
    getList();
})
const init = () => {
    Vanlist.value.updateStatus(false);
    pageNum = 0;
    pageSize = 10;
    list.value = [];
    getList();
}
const typeArr: number[] = [1856, 1857, 1858];
const getList = () => {
    Vanlist.value.updateLoadingStatus(true);
    getArticle(typeArr[pageType], { pageNum, pageSize }).then((d: any) => {
        if (d) {
            list.value = [...list.value, ...d]
            if (d.length < pageSize) {
                Vanlist.value.updateStatus();
            }
        }
        pageNum += 1;
        console.log(list.value)
        Vanlist.value.updateLoadingStatus();
    })
}
const list = ref<any>([]);
const onLoad = () => {
    getList();
};
const onRefresh = () => {
    init();
};
</script>
