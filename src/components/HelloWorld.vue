<template>
  <span @click="handleClick">我是子组件! -- msg:{{ msg }} </span>
  <span @click="handleClick2">{{ num }} </span>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
defineProps({
  msg: String,
  num: Number
});
const emit = defineEmits(['child-click', 'two-click']);

const handleClick = (e: any) => {
  emit('child-click', '1234');
};
const handleClick2 = (e: any) => {
  emit('two-click');
};
</script>

<style lang="scss" scoped>
span {
  display: inline-block;
  width: 200px; /*no*/
  font-size: 36px;
}
</style>
