<template>
    <div class="tabHead">
        <div @click="tabIndex = index" :class="tabIndex === index ? 'checked' : ''" v-for="(item, index) in arr">
            {{ item }}
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
const props = defineProps({
    arr: {
        default: [],
        require: true,
        type: Array
    }
})
const $emit = defineEmits(['typeChange'])
const tabIndex = ref(0);
watch(tabIndex, () => {
    $emit('typeChange', tabIndex.value)
})
</script>
<style lang="scss" scoped>
.tabHead {
    display: flex;
    justify-content: space-around;
    margin: 20px 0;

    div {
        font-size: 30px;
        font-weight: 600;
        padding-bottom: 8px;
    }

    .checked {
        color: #EE2A36;
        border-bottom: 6px solid #EE2A36;
    }
}
</style>
