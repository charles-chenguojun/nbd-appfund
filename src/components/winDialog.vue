<template>
    <section class="mbAll">
        <div class="mbcont" ref="mbcont">
            <div class="getCount"><span>{{  count  }}</span>N币</div>
            <div class="btn">
                <div @click="$emit('closeDia')">确定</div>
                <div @click="share">分享</div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import concatApp from '@/util/concatApp';
import { onMounted, ref } from 'vue';
const $emit = defineEmits(['closeDia']);
const props = defineProps({
    count: {
        default: 0,
        type: Number
    },
    type: {
        default: 'haowen',
        type: String
    }
})
const mbcont = ref<any>(null);
onMounted(() => {
    if (props.type === 'niugu') {
        mbcont.value.style.backgroundImage = `url(${require('@/assets/activity/winniugu.png')})`;
    }
})
const share = () => {
    concatApp.appToPage({
        operate: 'share',
        share_digest: `我在每日经济新闻APP${props.type === 'haowen' ? '赞好文' : '猜牛股'}活动领到了${props.count}!快下载APP和我一起参与吧!`,
        share_image: 'http://nbd-luyan-1252627319.cos.ap-shanghai.myqcloud.com/fund-tz-admin/share.jpg',
        share_title: '每日经济新闻APP活动好礼送不停',
        share_url: 'http://www.nbd.com.cn/corp/NBD-fund-app/index.html#/share' + props.type === 'niugu' ? '?type=niugu' : ''
    })
}
</script>
<style lang="scss" scoped>
.mbAll {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(51, 51, 51, 0.6);
    top: 0;
    left: 0;

    .mbcont {
        width: 570px;
        height: 630px;
        background: url('../assets/activity/Wintanchuang.png');
        background-size: 570px 630px;
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .getCount {
            position: absolute;
            color: white;
            font-size: 36px;
            bottom: 140px;
            left: 50%;
            transform: translate(-50%, 0);

            span {
                font-size: 50px;
            }
        }
    }

    .btn {
        display: flex;
        width: 90%;
        justify-content: space-between;
        position: absolute;
        bottom: 40px;
        left: 5%;

        div {
            width: 250px;
            height: 64px;
            background: linear-gradient(90deg, #F0602F 0%, #F53F1F 100%);
            border-radius: 48px;
            text-align: center;
            line-height: 64px;
            color: white;
        }

        div:nth-child(2) {
            background: rgba(255, 172, 141, 0.3900);
        }
    }
}
</style>
