<template>
    <div>
        <Tab :arr="['全部', '精选']" @typeChange="typeChange" />
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
import { useRoute } from 'vue-router';

const $routre = useRoute();
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
const typeArr: number[][] = [[1859, 1860], [1861, 1862], [1863, 1864], [1865, 1866]];
let useArr: number[] = typeArr[($routre.query.type as any)]
const getList = () => {
    Vanlist.value.updateLoadingStatus(true);
    getArticle(useArr[pageType], { pageNum, pageSize }).then((d: any) => {
        if (d) {
            list.value = [...list.value, ...d]
            if (d.length < pageSize) {
                Vanlist.value.updateStatus();
            }
        }
        pageNum += 1;
        console.log(list.value)
        Vanlist.value.updateLoadingStatus(false);
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
