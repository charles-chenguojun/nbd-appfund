<template>
    <section v-show="showPage">
        <div class="historyDetail-headBg">
            <div class="TIMEbottom">
                {{ day_date_str_short }}期 中奖名单
            </div>
        </div>
        <div v-for="(item, index) in goodArticle" :class="index === 0 ? 'articleDivItem mgTop20' : 'articleDivItem'">
            <GoodArticle :good="true" :obj="item" />
        </div>
        <div class="winningListfengeTitle" @click="toOut">
            <!-- <p>———————</p>
            <p>当期排名前十文章</p>
            <p>———————</p> -->
            <img src="@/assets/activity/danqianTop10.png" alt="">
        </div>
        <div class="tableHead winningListTable">
            <div>用户</div>
            <div>投票时间</div>
            <div>N币</div>
        </div>
        <div class="tableBody  winningListMaxHeight">
            <div v-for="(item, index) in list" class="tr winningListTable">
                <div class="td">
                    {{ item.phone_no }}
                </div>
                <div class="td userInfo">
                    <span>{{ item.voted_time_str }}</span>
                </div>
                <div class="td">{{ item.score_add_count }}</div>
            </div>
        </div>
    </section>
</template>
<script lang="ts" setup>
import GoodArticle from '@/components/goodArticle.vue';
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { getRecordInfo } from '@/api/activity';
const $router = useRouter();
const $route = useRoute();
const toOut = () => {
    $router.push({
        name: 'historyDetail',
        query: {
            date: $route.query.date
        }
    })
}
const list = ref<any>([]);
const goodArticle = ref<any>([]);
const day_date_str_short = ref('');
const showPage = ref(false);
onMounted(() => {
    getRecordInfo(($route.query.date as string)).then((d: any) => {
        list.value = [...d.record.succ_users];
        goodArticle.value = d.record.top_articles;
        day_date_str_short.value = d.record.day_date_str_short;
        showPage.value = true;
    })
})
</script>

<style lang="scss" scoped>
.winningListfengeTitle {
    text-align: center;

    img {
        width: 312px;
    }
}

.winningListTable {
    width: 702px !important;
}

.winningListMaxHeight {
    max-height: 1000vh;
    overflow: hidden;
    margin-bottom: 40px;
}

.mgTop20 {
    margin-top: 56px !important;
}

.historyDetail-headBg {
    width: 750px;
    height: 350px;
    background: url('../../assets/activity/zanWinNB.png');
    background-size: 750px 350px;
    position: relative;

    .TIMEbottom {
        width: 702px;
        position: absolute;
        bottom: 50px;
        left: 50%;
        transform: translate(-50%, 0);
        text-align: center;
        font-size: 30px;
        color: white;
    }
}
</style>
