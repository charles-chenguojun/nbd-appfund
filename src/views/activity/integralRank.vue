<template>
    <section style="padding-top:10px">
        <NBRank :list="$store.zanList" />
    </section>
</template>
<script lang="ts" setup>
import NBRank from '@/components/NBRank.vue';
import { useStore } from '@/store';
const $store = useStore();
</script>
