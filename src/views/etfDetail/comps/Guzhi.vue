<script setup lang="ts">
    import { computed, nextTick, onMounted, ref, toRefs, watch } from "vue";
    const props = defineProps<{
        value: number | undefined;
        percent: number | undefined;
        name: string;
    }>();
    const { value, percent, name } = toRefs(props);
    const residuePercent = computed(() => {
        let val = percent.value ? 100 - percent.value : 0;
        return val.toFixed(2);
    });

    const processBox = ref();
    const mark = ref();
    const calcMarkPosition = (val: number) => {
        if (mark.value) {
            let markWidth = mark.value.offsetWidth;
            let separateWidth = parseFloat(
                getComputedStyle(
                    processBox.value.querySelector(".item:nth-child(1)"),
                ).marginRight,
            );
            let separate = [15, 30, 70, 85];
            let totalWidth =
                processBox.value.offsetWidth - separateWidth * separate.length;

            let count = 0;
            for (let i = 0, len = separate.length; i < len; i++) {
                let v = separate[i];
                if (val > v) {
                    count++;
                } else {
                    break;
                }
            }

            let left =
                (val * totalWidth) / 100 +
                count * separateWidth -
                markWidth / 2;
            mark.value.style.left = left + "px";
        }
    };
    watch(
        percent,
        () => {
            nextTick(() => {
                if (percent.value != undefined) {
                    calcMarkPosition(percent.value);
                }
            });
        },
        { immediate: true },
    );
    onMounted(() => {});
</script>

<template>
    <div class="guzhi">
        <template v-if="percent">
            <div class="desc">
                当前{{ name }} <b>{{ value }}</b
                >,估值比历史上{{ residuePercent }}%时间低
            </div>
            <div class="process-box" ref="processBox">
                <div class="item">
                    <div class="process"></div>
                    <div class="name">极端低估</div>
                </div>
                <div class="item">
                    <div class="process"></div>
                    <div class="name">低估</div>
                </div>
                <div class="item">
                    <div class="process"></div>
                    <div class="name">适中</div>
                </div>
                <div class="item">
                    <div class="process"></div>
                    <div class="name">高估</div>
                </div>
                <div class="item">
                    <div class="process"></div>
                    <div class="name">极端高估</div>
                </div>
                <img ref="mark" class="mark" src="@/assets/mark.png" alt="" />
            </div>
        </template>
        <div v-else class="noData-tips">暂无数据</div>
    </div>
</template>

<style lang="scss" scoped>
    .guzhi {
        background: linear-gradient(180deg, #e6f3ff 0%, #ffffff 100%);
        border-radius: 10px;
        padding: 32px 24px;
    }
    .desc {
        color: #333;
        font-size: 24px;
        padding: 0 25px;
        margin-bottom: 16px;
        b {
            color: #1a75df;
            font-size: 30px;
        }
    }
    .noData-tips {
        text-align: center;
        font-size: 26px;
    }
    .process-box {
        display: flex;
        $colors: #1a75df, #8cbaf0, #fdd397, #f2878d, #e63640;
        padding-top: 44px;
        position: relative;
        .mark {
            width: 32px;
            position: absolute;
            top: 0;
            left: -16px;
        }
        .item {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-right: 6px;
            @for $i from 1 through 5 {
                &:nth-child(#{$i}) {
                    @if $i==5 {
                        margin-right: 0;
                    }
                    @if $i==3 {
                        width: 40%;
                    } @else {
                        width: 15%;
                    }

                    .process {
                        background: nth($colors, $i);
                        @if $i==1 {
                            border-top-left-radius: 8px;
                            border-bottom-left-radius: 8px;
                        }
                        @if $i==5 {
                            border-top-right-radius: 8px;
                            border-bottom-right-radius: 8px;
                        }
                    }
                }
            }

            .process {
                height: 16px;
                width: 100%;
            }
            .name {
                margin-top: 8px;
                color: #333;
                font-size: 20px;
            }
        }
    }
</style>
