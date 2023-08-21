<template>
    <van-popup :round="true" v-model:show="show">
        <div class="outCount">
            <div class="guizeCont">
                <div class="title">{{  type === 'haowen' ? '赞好文' : '猜牛股'  }}-活动规则</div>
                <section v-if="type === 'haowen'">
                    <p>1.活动时间：9月2日—9月30日</p>
                    <p>2.参与方式：每个活动日（T日），每经APP深读100模块将精选多篇深读好文，用户可通过点赞按钮点赞您所推荐的好文。</p>
                    <p>3.获奖方式：T+2日上午9点公布T日（文章发布日）和T+1日合计点赞数最多的文章即为“最受欢迎好文”（如两篇文章点赞数一致，则两篇文章并列“最受欢迎好文”），如用户在公布日前点赞过该文，即视为中奖，所有中奖用户参与瓜分30000
                        N币。</p>
                    <p>4.每日上午10点，公布本月活动时间内的“用户获得N币排行榜”（活动数据统计截至当日0点）。</p>
                    <p>5.在本轮活动时间内，合计获得（包含“猜牛股”、APP每日任务、“赞好文”）N币数量前10名用户获得现金大奖（奖金为税前）</p>
                    <p>第1名：4000元现金</p>
                    <p>第2-4名：1000元现金</p>
                    <p>第5-10名：每人500元现金</p>
                    <p>注：N币相同的用户视为同名次，平分该名次应得奖金。</p>
                    <p>
                        注：本次活动时间为9月2日—9月30日，故9月现金大奖活动以10月1日上午10点公布的“用户获得N币排行榜”为准（只包含9月2日—9月30日的“猜”牛股、APP每日任务所获得的N币）。
                    </p>
                </section>
                <section v-else>
                    <p>1.本轮活动时间：9月2日—9月30日（仅交易日）</p>
                    <p>2.每个交易日盘前一天，每经APP私人定制模块将提供10只候选个股（均选自于掘金系列模型），用户可从中选择2只个股投票，如其中1只个股为当日实际表现最佳，即视为中奖。中奖的用户参与平均瓜分30000
                        N币【实际表现的计算方式=（当日收盘价-当日开盘价）/当日开盘价，如有多只个股涨跌幅一致，则并列表现最好】</p>
                    <p>3.竞猜时间：每个交易日前一日下午18点至次日上午9点15分。</p>
                    <p>4.每天下午4点公布当日实际表现最好的个股</p>
                    <p>5.每天上午10点，公布本轮活动时间内，用户获得N币排行榜（数据截至当日0点）</p>
                    <p>6.在本轮活动时间内，合计获得（包含“猜牛股”、APP每日任务、“赞好文”）N币数量前10名用户获得现金大奖（奖金为税前）</p>
                    <p>第1名：4000元现金</p>
                    <p>第2-4名：1000元现金</p>
                    <p>第5-10名：每人500元现金</p>
                    <p>注：N币相同的用户视为同名次，平分该名次应得奖金。</p>
                    <p>
                        注：本次活动时间为9月2日—9月30日，故9月现金大奖活动以10月1日上午10点公布的“用户获得N币排行榜”为准（只包含9月2日—9月30日的“猜”牛股、APP每日任务所获得的N币）。
                    </p>
                </section>
                <div class="title titleII">特别须知：</div>
                <p>1：禁止利用投票竞猜活动进行赌博活动等违法违规行为；若在活动前后发现违法违规行为，不仅限于冒用欺诈、赌博、传播色情、冒用他人身份等行为，每日经济新闻有权取消活动参与资格及领奖资格。</p>
                <p>2：请避免违规刷N币的行为，如发现刷N币行为，每日经济新闻有权取消活动参与资格及领奖资格。</p>
                <p>3：参与本活动所获得的N币仅可用于每日经济新闻APP积分商城抽奖和兑换使用，不得另作他用。</p>
                <p>4：排名前十的中奖用户需在榜单公布后的一个月内填写领奖信息，期间未填写则视为放弃。活动奖金将在榜单公布后的次月发放。</p>
                <div class="blankDiv"></div>
            </div>
            <div @click="$emit('closeDia')" class="closeBtn">
                关闭
            </div>
        </div>

    </van-popup>
</template>

<script lang="ts" setup>
import { Popup as VanPopup } from 'vant';
import { watch } from 'vue';
const props = defineProps({
    show: {
        default: false,
        type: Boolean
    },
    type: {
        default: 'haowen',
        type: String
    }
})
const $emit = defineEmits(['closeDia'])
watch(() => props.show, () => {
    if (props.show === false) {
        $emit('closeDia');
    }
})
</script>
<style lang="scss" scoped>
.outCount {
    position: relative;
    height: 1192px;
    overflow: hidden;
}

.closeBtn {
    width: 508px;
    height: 80px;
    background: rgb(238, 42, 54);
    border-radius: 20px;
    position: absolute;
    bottom: 20px;
    line-height: 80px;
    text-align: center;
    left: 46px;
    color: white;
}

.guizeCont {
    width: 600px;
    height: 1192px;
    padding: 58px 34px;
    box-sizing: border-box;
    overflow-y: scroll;

    .title {
        text-align: center;
        font-size: 36px;
        font-weight: 600;
        margin-bottom: 40px;
    }

    p {
        line-height: 54px;
        font-size: 30px;
        margin-bottom: 20px;
    }
}

.titleII {
    margin-bottom: 40px;
}
</style>
