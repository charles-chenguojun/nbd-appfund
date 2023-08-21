<template>
    <section :class="type==='history' ? 'history' : ''">
        <img class="historyHeadBgm" v-if="type" src="../assets/activity/historyRank.png" alt="">
        <section v-show="list.length > 0" :class="type ? 'rankContent historyCont' : 'rankContent'">
            <div v-if="!type" class="rankHead">
                <!-- <img src="@/assets/activity/wenhao.png" alt=""> -->
                <div>N币排行榜 <span v-if="count !== 10">(仅展示排名前100用户)</span></div>
                <div v-if="count === 10" @click="toMore">查看更多></div>
            </div>
            <div class="oneTab" v-if="type">
                <img v-show="tabIndex==1" src="@/assets/activity/niuguTab.png" alt="">
                <img v-show="tabIndex==0" src="@/assets/activity/haowenTab.png" alt="">
                <section>
                    <div @click="tabIndex=1"></div>
                    <div @click="tabIndex=0"></div>
                </section>
            </div>
            <div v-if="type" class="HistoryrankHead">
                <div>最终N币排行前10名单</div>
                <div class="qishu"><img src="@/assets/activity/qishuNumber.png" alt="">第一期</div>
            </div>
            <div class="tableHead">
                <div>排名</div>
                <div>用户</div>
                <div>N币</div>
            </div>
            <div class="tableBody">
                <div v-for="(item, index) in list" v-show="count === 10 ? index < count : true"
                    :class="index > 2 ? 'tr dayu3' : 'tr'">
                    <div class="td">
                        {{ index >= 3 ? index + 1 : '' }}
                        <img class="jiangbei" v-if="index < 3" :src="require(`@/assets/activity/num${index + 1}.png`)"
                            alt="">
                    </div>
                    <div class="td userInfo">
                        <img class="peoplePhoto" :src="item.avatar || $store.morenUrl" alt="">
                        <span>{{ item.nickname }}</span>
                    </div>
                    <div class="td">{{ item.points }}</div>
                </div>
            </div>
        </section>
    </section>

</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import { ref, watch } from 'vue';

const $router = useRouter();
const $store = useStore();
const tabIndex = ref(1)
const toMore = () => {
    $router.push({
        name: 'integralRank'
    })
};
const $emit = defineEmits(['tabIndexChange'])
watch(tabIndex, () => {
    console.log(tabIndex.value)
    $emit('tabIndexChange', tabIndex.value)
})
const props = defineProps({
    count: {
        default: 0,
        type: Number
    },
    list: {
        default: [],
        type: Array as any
    },
    type: {
        default: null,
        type: String as any
    }
})
</script>
<style lang="scss" scoped>
.history {
    height: 100vh;
    width: 750px;
    position: relative;
    background: #810710;
    overflow: hidden;

    .historyHeadBgm {
        width: 750px;
    }

    .historyCont {
        position: absolute;
        left: 24px;
        top: 214px;
        background: white !important;
        padding: 0 0 34px !important;
    }
}

.rankContent {
    width: 702px;
    background: #FFF4EF;
    border-radius: 20px;
    margin: auto;
    padding: 34px 22px;
    box-sizing: border-box;

    .rankHead {
        display: flex;
        justify-content: space-between;
        align-items: center;

        div:nth-child(2) {
            color: #1A75DF;
        }

        div:nth-child(1) {
            font-size: 40px;
            font-weight: 600;

            span {
                font-weight: 400;
                font-size: 24px;
                color: #fb8f4c;
            }
        }

        img {
            width: 22px;
            margin-left: 10px;
        }
    }
}

.HistoryrankHead {
    display: flex;
    justify-content: space-between;
    font-size: 30px;
    font-weight: 600;
    align-items: center;

    div {
        margin: 0 20px;
    }

    .qishu {
        font-size: 26px;
        font-weight: 400;
        display: flex;
        align-items: center;
        color: #666;
    }

    img {
        width: 30px;
        margin-bottom: 6px;
        margin-right: 20px;
    }

    p {
        width: 142px;
        height: 1px;
        background: #D0D0D0;
        opacity: 1;
        border-radius: 0px;
    }
}

.oneTab {
    margin-bottom: 20px;
    position: relative;

    img {
        width: 100%;
    }

    section {
        width: 100%;
        display: flex;
        height: 80px;
        position: absolute;
        top: 0;

        div {
            width: 50%;
        }
    }
}
</style>
