<template>
    <section :class="good ? 'goodArticleItem' : 'articleItem'" @click="openArticle">
        <img v-if="good" class="dangqihaowen" src="@/assets/activity/dangqihaowen.png" alt="">
        <div class="goodArticleItem-left">
            <div>{{ obj.article_title }}</div>
            <div>
                <p style="color: #999999;">{{ obj.tag }}</p>
                <p>
                    <img src="@/assets/activity/dianzan.png" alt="">
                    <span style="color: #FEB550;">点赞：{{ obj.valid_vote_count }}</span>
                </p>
                <!-- <p>
                    <img src="@/assets/activity/dianzanFn.png" alt="">
                    <span style="color: #999999;">点赞：231</span>
                </p> -->
            </div>
        </div>
        <div class="articleImg"><img :src="obj.article_thumbnail" alt=""></div>
    </section>
</template>
<script lang="ts" setup>
const props = defineProps({
    good: {
        default: false,
        type: Boolean,
    },
    obj: {
        default: {},
        require: true,
        type: Object,
    },
});
const openArticle = () => {
    location.href = props.obj.article_url;
}
</script>

<style lang="scss" scoped>
.articleImg {
    width: 175px;
    height: 120px;
    margin-left: 20px;

    img {
        width: 175px;

    }
}

.goodArticleItem {
    position: relative;
    width: 734px;
    height: 169px;
    background: rgb(255, 255, 255);
    border: 3px solid #E63640;
    border-radius: 20px;
    margin: auto;
    padding: 24px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
}

.articleItem {
    overflow: hidden;
    width: 686px;
    margin: auto;
    display: flex;
    padding-bottom: 24px;
    border-bottom: 2px solid #F0F0F0;
    justify-content: space-between;
    height: 169px;
}

.goodArticleItem-left {
    div:nth-child(1) {
        font-size: 30px;
        font-weight: 600;
        line-height: 40px;
        width: 440px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    div:nth-child(2) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 24px;

        img {
            width: 20px;
            height: 20px;
        }

        p {
            span {
                display: inline-block;
                margin-left: 20px;
            }
        }
    }
}

.dangqihaowen {
    position: absolute;
    width: 165px;
    top: -20px;
}
</style>
