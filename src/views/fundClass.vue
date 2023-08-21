<template>
    <section class="classCont">
        <section
            v-for="item in list"
            :key="item.id"
            class="classItem"
            @click="go(item)"
        >
            <div class="title">
                <span v-html="item.title"></span>
            </div>
            <div class="line"></div>
            <div
                class="img"
                :style="{
                    background: `url(${item.thumbnailUrl}) no-repeat top center/cover`,
                }"
            ></div>
        </section>
    </section>
</template>

<script lang="ts" setup>
    import useFundClassStore from "@/store/fundClass.store";
    import { FundClass } from "@/type/fundClass.type";
    import appApi from "@/util/app-api";
    import { storeToRefs } from "pinia";
    import { onMounted, ref } from "vue";
    const fundClassStore = useFundClassStore();
    const { list } = storeToRefs(fundClassStore);
    const { getList } = fundClassStore;
    onMounted(() => {
        getList();
    });
    const go = ({ resourceUrl, detailUrl }: FundClass) => {
        if (resourceUrl || detailUrl) {
            appApi.openLink({
                url: resourceUrl ? resourceUrl : detailUrl,
                show_title_bar: true,
                show_web_title: true,
            });
        }
    };
</script>
<style lang="scss" scoped>
    .classCont {
        padding: 32px;
        display: grid;
        grid-template-rows: repeat(3, 218px);
        grid-template-columns: repeat(3, 218px);
        grid-gap: 24px 16px;

        .classItem {
            border: 1px solid #e6f0fb;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            .title {
                color: #293955;
                font-size: 30px;
                line-height: 1.4;
                position: relative;
                box-sizing: border-box;
                flex: 1;
                position: relative;
                width: 100%;
                > span {
                    word-wrap: break-word;
                    font-weight: bold;
                    white-space: pre-line;
                    text-align: center;
                    box-sizing: border-box;
                    padding: 11px 11px 0 11px;
                    position: absolute;
                    width: 100%;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
            }
            .line {
                display: block;
                width: 110px;
                height: 2px;
                // margin: auto;
                margin-bottom: 10px;
                background: linear-gradient(
                    270deg,
                    rgba(40, 71, 126, 0) 0%,
                    #28477e 51%,
                    rgba(40, 71, 126, 0) 100%
                );
            }
            .img {
                width: 100%;
                height: 100px;
            }
        }
    }
</style>
