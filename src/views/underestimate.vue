<template>
    <section class="underestimate">
        <div class="titleBg">
            <img src="@/assets/digu.png" alt="">
        </div>
        <div class="tags">
            <div class="tag">低估指数基金</div>
            <div class="tag">近3年估值数据回测</div>
        </div>
        <section class="scroolCont">
            <!-- <VanList :isSolt="true" :list="list" ref="Vanlist" @onLoad="onLoad" @onRefresh="onRefresh"> -->
            <!-- <template v-slot:main> -->
            <div v-for="item in list" class="diguItem"
                @click="openUrl(item.fundDetailUrl, item.fundCodeWithSuffix, item.fundName)">
                <div class="clumOne">
                    <span>{{ item.fundName }}</span>
                    <span>{{ item.fundCode }}</span>
                    <span>{{ item.label }}</span>
                </div>
                <div class="clumTwo">
                    <div>
                        <p>{{ item.pe }}</p>
                        <p>PE</p>
                    </div>
                    <div>
                        <p>{{ item.peRange }}%</p>
                        <p>PE百分位</p>
                    </div>
                    <div>
                        <p>{{ item.pb }}</p>
                        <p>PB</p>
                    </div>
                    <div>
                        <p>{{ item.pbRange }}%</p>
                        <p>PB百分位</p>
                    </div>
                </div>
                <div v-if="item.followFunds.length > 0" class="clum3">
                    <div v-for="item1 in item.followFunds" class="clum3Item">
                        <div @click.stop="openUrl(item1.fundDetailUrl, item1.fundCodeWithSuffix, item1.fundName)"><span>跟踪基金</span><span>{{ item1.fundName }}</span></div>
                        <div>
                            <span
                                :style="{ color: item1.fluctuationRange ? (item1.fluctuationRange - 0) > 0 ? '#E63640' : '#179901' : '#999' }">
                                {{ item1.fluctuationRange && item1.fluctuationRange + '%' || '—' }}
                            </span>
                            <span>
                                (实时涨幅)
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- </template> -->

            <!-- </VanList> -->
        </section>
    </section>
</template>
<script lang="ts" setup>
import VanList from '@/components/list.vue';
import { ref, onMounted, onUnmounted } from 'vue';
import { categoryList } from '@/api';
import concatApp from '@/util/concatApp';

// const typeChange = (i: number) => {
//     console.log(i)
// }
const openUrl = (url: string, code: string, name: string) => {
    // location.href = url;
    concatApp.appToPage({ operate: 'open_stock', stock_suffix: code, stock_name: name, stock_url: url })
}
const list = ref<any>([]);
let Timer: any = null;
onMounted(() => {
    getList();
    Timer = setInterval(() => {
        getList();
    }, 3000)
})
const getList = () => {
    categoryList(true, ['']).then((d: any) => {
        list.value = [...d.data];
    })
}
onUnmounted(() => {
    clearInterval(Timer);
    Timer = null;
})
</script>
<style lang="scss" scoped>
.scroolCont {
    height: calc(100vh - 140px);
    overflow-y: auto;
}

.diguItem {
    width: 702px;
    background: #FDFEFF;
    border-radius: 10px;
    margin: 16px auto;
    padding: 30px 38px;
    box-sizing: border-box;

    .clum3 {
        padding-top: 16px;
        padding-bottom: 8px;
        border-bottom: 1px solid #F0F0F0;

        .clum3Item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;

            span {
                display: inline-block;
            }

            div:nth-child(1) {
                span:nth-child(1) {
                    color: #1A75DF;
                    border: 1px solid #1A75DF;
                    font-size: 20px;
                    padding: 2px 10px;
                    border-radius: 4px;
                }

                span:nth-child(2) {
                    color: #666666;
                    font-size: 24px;
                    margin-left: 16px;
                }
            }

            div:nth-child(2) {
                span:nth-child(1) {
                    color: #E63640;
                }

                span:nth-child(2) {
                    color: #999999;
                }
            }
        }
    }

    .clumTwo {
        display: flex;
        justify-content: space-around;
        border-bottom: 1px solid #F0F0F0;
        padding-bottom: 16px;

        p {
            text-align: center;
            color: #999;
            font-size: 24px;
            margin: 0;
        }

        div {
            p:nth-child(1) {
                font-size: 30px;
                font-weight: 600;
                color: #333;
                margin-top: 24px;
                margin-bottom: 16px;
            }
        }
    }

    .clumOne {
        span {
            display: inline-block;
        }

        span:nth-child(1) {
            font-size: 30px;
            font-weight: 600;
        }

        span:nth-child(2) {
            font-size: 24px;
            color: #999999;
            margin: 0 20px;
        }

        span:nth-child(3) {
            font-size: 28px;
            font-weight: 600;
            color: #179901;
            background: #D0EBCC;
        }
    }
}

.underestimate {
    background: #EFF6FF;
    height: 100vh;
    width: 750px;
    overflow-y: hidden;

    .titleBg {
        width: 338px;
        margin: 25px auto;

        img {
            width: 338px;
        }
    }

    .tags {
        display: flex;
        justify-content: center;

        div:nth-child(1) {
            margin-right: 16px;
        }

        .tag {
            background: #C4DCF9;
            font-size: 20px;
            color: #1A75DF;
            padding: 2px 10px;
            border-radius: 4px;
        }
    }
}
</style>
