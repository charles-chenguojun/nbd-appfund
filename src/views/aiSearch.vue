<template>
    <div class="container">
        <div class="headInput">
            <span class="searchIcon">
                <van-icon name="search" style="font-size:18px;" />
            </span>
            <input ref="input" v-model="search" type="text" placeholder="搜索基金即可诊断" @keypress="searchGoods" />
        </div>
        <div class="borderLine">&nbsp;</div>
        <div id="tabsContent">
            <div class="tishitext" v-show="fundList.length == 0">
                <!-- 《每日经济新闻》APP开发的基金诊断系统。只需三步，化繁为简，帮助您判断这只基金当前的净值位置、基金产品的主要特征和基金经理实力。 -->
            </div>
            <div v-for="item in fundList" :key="item.id" class="tableItem" @click="toFundDetail(item.secCode)">
                <div class="tableItemOne">
                    <div v-demo:[item.secShortNameCn]="search" class="jijinName">{{ item.secShortNameCn }}</div>
                    <div v-if="item.nvgOty > 0" class="add">{{ item.nvgOty }}%</div>
                    <div v-if="item.nvgOty <= 0" class="count">{{ item.nvgOty }}%</div>
                    <div v-if="!item.nvgOty && item.nvgOty !== 0">-</div>
                </div>
                <div class="contTwo">
                    <div class="tableItemTwo">
                        <div>{{ item.secCode }}</div>
                        <div>{{ item.fundType }}</div>
                    </div>
                    <div>
                        今年以来
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>

import { Icon as VanIcon } from 'vant';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { aiSearch } from '@/api';
import { Debounced } from '@/util/Debounced';

const $router = useRouter();
let searchlFn = new Debounced().use(() => {
    searchGoods({ key: 'Enter' })
}, 1000);
const fundList = ref<any>([]);
const search = ref('');
watch(search, () => {
    if (search.value !== '') {
        searchlFn();
    }
})

const searchGoods = (e: any) => {
    if (e.key !== 'Enter') return
    if (search.value === '') return
    aiSearch(search.value).then((d: any) => {
        fundList.value = d.fundList;
        console.log(fundList.value)

    })
};

const toFundDetail = (id: number) => {
    $router.push({
        path: '/diagnosticBasis',
        query: {
            id
        }
    })
}
</script>

<style lang="scss" scoped>
.tishitext {
    font-size: 28px;
    width: 750px;
    margin: auto;
    line-height: 42px;
    color: #999;
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    background: url('../assets/bg.png');
    background-size: 750px 100vh;
}

#tabsContent {
    height: calc(100vh - 160px);
    overflow-y: scroll !important;
}

.headInput {
    width: 93.33vw;
    margin: 0 auto;
    padding: 24px 0;
    position: relative;
    z-index: 100;
    .searchIcon {
        position: absolute;
        top: 40px;
        left: 24px;
    }

    input {
        width: 93.33vw;
        padding: 18px 66px;
        box-sizing: border-box;
        background: #f4f5f6;
        border: 0;
        border-radius: 50px;
    }
}

.add {
    color: #eb5648 !important;
}

.count {
    color: #179901 !important;
}

.tableItem {
    border-bottom: 1px solid #dedede;
    padding: 32px 0;
    width: 93.33vw;
    margin: 0 auto;

    div:first-child {
        text-align: left;
    }

    div:last-child {
        text-align: right;
    }
}

.contTwo {
    display: flex;
    align-items: center;
    margin-top: 18px;
    justify-content: space-between;

    div {
        color: #959ca7;
    }
}

.tableItemTwo {
    display: flex;
    align-items: center;

    div:first-child {
        color: #959ca7;
        font-size: 20px;
        margin-right: 20px;
    }

    div:nth-child(2) {
        color: #eb5648;
        font-size: 18px;
        background: #fcedeb;
        padding: 2px 6px;
    }
}

.tableItemOne {
    .jijinName {
        white-space: nowrap;
    }

    display: flex;

    div {
        color: #333333;
        font-size: 20px;
        width: 49.9%;
        font-weight: 600;
        font-size: 30px;
        text-align: center;
    }

    div:first-child {
        text-align: left;
    }

    div:last-child {
        text-align: right;
    }
}

.container {
    width: 100vw;
    height: 100vh;
    background: white;
    overflow: hidden;
    overflow-y: auto !important;
}

.thirdCount {
    display: flex;
    margin: 16px auto 0;

    div {
        font-size: 24px;
        color: #c6c9d0;
        margin-right: 80px;
    }
}

.thirdItem {
    margin-bottom: 16px !important;
}

.itemCount {
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    width: 93.33vw;
    overflow: hidden;
    /*超出部分隐藏*/
    line-height: 40px;
    text-align: left !important;
}

.wendaItem {
    width: 93.33vw;
    margin: auto;
    padding: 32px 0;
    font-size: 24px;
    background: white;

    .itemTitle {
        font-weight: 600;
        margin-bottom: 26px;
        line-height: 40px;
        color: #333 !important;
    }

    .itemNum {
        color: #959ca7;
    }

    border-bottom: 1px solid #dedede;
}

:deep() .van-tab__pane {
    height: 86vh;
    overflow-y: auto;
}
</style>
