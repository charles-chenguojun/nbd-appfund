<script setup lang="ts">
    import { computed, ref, toRaw } from "@vue/reactivity";
    import {
        IndexBar as VanIndexBar,
        IndexAnchor as VanIndexAnchor,
        Cell as VanCell,
    } from "vant";

    interface Props {
        data: {
            [key: string]: string[];
        };
    }

    const props = defineProps<Props>();
    const indexList = computed(() => Object.keys(props.data));
    const emit = defineEmits<{
        (e: "change", value: string[]): void;
    }>();
    const seledArea = ref<string[]>([]);
    const changeSeledArea = (item: string) => {
        let index = seledArea.value.indexOf(item);

        if (index != -1) {
            seledArea.value.splice(index, 1);
        } else {
            seledArea.value.push(item);
        }

        emit("change", toRaw(seledArea.value));
    };
</script>

<template>
    <van-index-bar :index-list="indexList" :sticky="true">
        <div v-for="(value, key, index) in data" :key="key">
            <van-index-anchor :index="key" />
            <van-cell
                v-for="item in value"
                :title="item"
                :key="item"
                :value="seledArea.includes(item) ? '✔' : ''"
                @click="() => changeSeledArea(item)"
            />
        </div>
    </van-index-bar>
</template>

<style lang="scss" scoped>
    .van-index-bar {
        // padding-top: 40px;
        height: calc(100% - 65px);
        overflow-y: auto;
        padding-top: 1px;

        ::v-deep .van-index-bar__sidebar {
            position: absolute;
        }
        ::v-deep .van-cell__value {
            color: #f00;
            padding-right: 15px;
        }
    }
</style>
