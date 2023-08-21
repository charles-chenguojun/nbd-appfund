<template>
    <section>
        <div class="tishi">仅展示本轮活动数据</div>
        <div v-for="item in list" class="articleDivItem">
            <GoodArticle :obj="item" />
        </div>
        <div v-if="list.length === 0" class="nodata">
            <img src="@/assets/activity/nodata.png" alt="">
            <div>暂无点赞记录</div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import GoodArticle from '@/components/goodArticle.vue'
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { getUser_voted_articles, getuser_id } from '@/api/activity';
const $route = useRoute();
const list = ref<any>([]);
onMounted(() => {
    getUser_voted_articles($route.query.ut as string).then((d: any) => {
        if (d.result === 1) {
            list.value = d.articles
        }
    })
    // getuser_id().then((d: any) => {
    //     console.log(d)
    //     list.value = d.articles
    // })
});
</script>
<style lang="scss" scoped>
.nodata {
    text-align: center;
    margin-top: 200px;

    img {
        width: 400px;
    }
}

.tishi {
    width: 686px;
    height: 40px;
    background: #FEF9EB;
    color: #FEB550;
    margin: 20px auto;
    line-height: 40px;
    text-align: center;

}
</style>
