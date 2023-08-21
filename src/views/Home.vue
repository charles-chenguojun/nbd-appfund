<template>
  <!-- <DetailEcharts /> -->
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ref, watch, onMounted } from "vue";
// import DetailEcharts from "@/components/detailEcharts.vue";

const router = useRouter();
let num = ref(0);
let waNum = ref(1);
interface myobjType {
  size: number;
  label: string;
}
let myObj = ref({ size: 10, label: "Size 10 Object" });
onMounted(() => {
  // setInterval(() => {
  //   myObj.value.size -= 1;
  // }, 2000);
});
watch(waNum, () => {
  console.log(waNum.value);
});
watch(
  myObj,
  () => {
    console.log(myObj.value.size);
  },
  { deep: true }
);
const childCtx = (e: number): void => {
  console.log(e);
};
const childCtx2 = () => {
  num.value++;
};
const toOtherPath = () => {
  router.push({
    name: "About",
    query: {
      id: 1,
    },
  });
};
</script>
