<template>
    <section>
        <div class="historyDetail-headBg">
            <div class="bottom">
                <div @click="btnFn(0)">
                    <span>{{ $route.query.date }}期</span>
                    <img src="../../assets/activity/qishu.png" alt="">
                </div>
                <div>
                    <img @click="btnFn(1)" src="@/assets/activity/zjmd.png" alt="">
                    <img @click="btnFn(2)" src="@/assets/activity/hdgz.png" alt="">
                </div>
            </div>
        </div>
        <div class="fengeTitle">
            <p>———————</p>
            <p>今日好文</p>
            <p>———————</p>
        </div>
        <div class="articleDivItem" v-for="(item, index) in list">
            <GoodArticle :good="item.top_article_sign === 0 ? false : true" :obj="item" />
        </div>
        <Guize :show="showGuize" @closeDia="showGuize = false" />

    </section>
</template>
<script lang="ts" setup>
import GoodArticle from '@/components/goodArticle.vue';
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { getRecordInfo } from '@/api/activity';
import Guize from './guize.vue';


const $router = useRouter();
const $route = useRoute();
const list = ref<any>([]);
const showGuize = ref(false);
onMounted(() => {
    getRecordInfo(($route.query.date as string)).then((d: any) => {
        console.log(d)
        d.record.top_articles.forEach((item: any) => {
            item.isGood = true;
        });
        list.value = [...d.record.top10_articles]
    })
})

const fn1 = () => {
    $router.push({
        name: 'historyList'
    });
}
const fn2 = () => {
    $router.push({
        name: 'winningList',
        query: {
            date: $route.query.date
        }
    })
}
const fn3 = () => {
    // $router.push({
    //     name: 'guize',
    //     query: {
    //         type: 'haowen'
    //     }
    // })
    showGuize.value = true;
}
const btnFn = (i: number) => {
    const arr = [fn1, fn2, fn3]
    arr[i]();
}
</script>

<style lang="scss" scoped>
.historyDetail-headBg {
    width: 750px;
    height: 350px;
    background: url('../../assets/activity/zanWinNB.png');
    background-size: 750px 350px;
    position: relative;

    .bottom {
        display: flex;
        width: 702px;
        justify-content: space-between;
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translate(-50%, 0);

        div:nth-child(1) {
            img {
                width: 240px;
            }

            span {
                color: #F6441F;
                position: absolute;
                top: 8px;
                left: 32px;
            }
        }

        div:nth-child(2) {
            img {
                width: 150px;
            }
        }
    }
}
</style>
