<template>
    <van-empty v-if="list.length === 0 && finished" description="暂无数据" />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model:loading="loading" offset="20" :finished="finished"
            :finished-text="list.length > 0 ? '没有更多了' : ''" :immediate-check="false" @load="onLoad">
            <section v-if="!isSolt">
                <ArticleItem v-for="item in list" :obj="(item as any)" />
            </section>
            <slot name="main"></slot>
        </van-list>
    </van-pull-refresh>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { List as VanList, PullRefresh as VanPullRefresh, Empty as VanEmpty } from 'vant';
import ArticleItem from '@/components//articleItem.vue';

const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const props = defineProps({
    list: {
        default: [],
        require: true,
        type: Array
    },
    isSolt: {
        default: false,
        type: Boolean
    }
});
const $emit = defineEmits(['onLoad', 'onRefresh']);
const onRefresh = () => {
    finished.value = false;
    loading.value = true;
    $emit('onRefresh');
};
const onLoad = () => {
    console.log(finished.value)
    $emit('onLoad');
}
const updateStatus = (bool: boolean = true) => {
    finished.value = bool;
    refreshing.value = false;
}
const updateLoadingStatus = (bool: boolean = false) => {
    loading.value = bool
}
defineExpose({ updateStatus, updateLoadingStatus })
</script>
