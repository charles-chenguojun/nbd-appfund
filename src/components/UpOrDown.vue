<script setup lang="ts">
    import { toRefs } from "vue";

    const props = withDefaults(
        defineProps<{
            value: number | undefined | null;
            unit?: string;
            isSymbol?: boolean;
            symbol?: string;
        }>(),
        {
            value: 0,
            unit: "%",
            isSymbol: true,
            symbol: "",
        },
    );
    const { value, unit, symbol, isSymbol } = toRefs(props);
</script>

<template>
    <span
        class="num"
        :class="[
            value == 0 || value == undefined ? '' : value > 0 ? 'up' : 'down',
        ]"
    >
        {{ isSymbol ? (symbol ? symbol : value && value > 0 ? "+" : "") : ""
        }}{{ value }}{{ value != undefined ? unit : "-" }}
    </span>
</template>

<style lang="scss" scoped>
    .num {
        font-size: 24px;
        &.up {
            color: #eb584a;
        }
        &.down {
            color: #179901;
        }
    }
</style>
