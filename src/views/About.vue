<template>
  <div>
    <h1>This is an about page</h1>
    <Button type="primary">主要按钮</Button>
    <Rate v-model="value" :size="18" color="#ffd21e" void-icon="star" void-color="#eee" allow-half />
    <Switch v-model="checked" />
  </div>
</template>

<script lang="ts" setup>
import { Button, Rate, Switch } from 'vant';
import { ref } from 'vue';
const value = ref(2.5);
const checked = ref(true);
interface LabelledValue {
  label: string;
  a?: number;
  b?: number;
}
function printLabel(obj: LabelledValue): void {
  console.log(obj.label);
}
printLabel({ a: 123, label: '123' });
</script>
