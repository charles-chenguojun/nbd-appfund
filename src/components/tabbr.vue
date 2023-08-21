<template>
  <section class="tabbar">
    <div v-for="(item, index) in arr" @click="toPath(item, index)">
      <div>
        <img :src="item.icon" alt="" />
      </div>
      <div>{{ item.text }}</div>
    </div>
  </section>
  <section class="blankDiv"></section>
</template>

<script lang="ts" setup>
import AppFn from "@/util/apptoken";
import { onMounted, ref } from "vue";
import { getIsLikeFund, likeFund } from "@/api";
import { useRoute } from "vue-router";
import { Toast } from "vant";
const $route = useRoute();
const isLike = ref(false);
const { getToken, app_token } = AppFn();
onMounted(() => {
  if (app_token.value && app_token.value !== "") {
    getIsLikeFund({ app_token: app_token.value, code: $route.query.id }).then(
      (d: any) => {
        console.log(d);
        isLike.value = d;
        arr.value[2].icon = d
          ? require("@/assets/tabbar2Ed.png")
          : require("@/assets/tabbar2.png");
      }
    );
  }

  console.log(`~~~~~~~~~~~`)
  console.log(app_token.value);
});
const arr = ref<any>([
  {
    text: "提问",
    icon: require("../assets/tabbar0.png"),
    path: "https://news.nbd.com.cn/fund-manager/c/question",
  },
  {
    text: "基金详情",
    icon: require("@/assets/tabbar1.png"),
    path: "",
  },
  {
    text: "关注",
    icon: isLike.value
      ? require("@/assets/tabbar2Ed.png")
      : require("@/assets/tabbar2.png"),
    path: "",
    fn: likeFund,
  },
]);
const $props = defineProps({
  info: {
    default: () => {
      return {
        fundName: "",
        secCode: "",
        appFundDetailUrl: "",
      };
    },
    tyep: Object,
  },
});
const toPath = (item: any, index: number) => {
  if (index === 1) {
    let str = '';
    if (!app_token.value || app_token.value != '' || typeof (app_token.value) == 'object') {
      str = $props.info.appFundDetailUrl
    } else {
      str = $props.info.appFundDetailUrl + `&ut=${app_token.value}`
    }
    location.href = str;
    return;
  }
  if (!app_token.value || typeof (app_token.value) == 'object' || app_token.value == '') {
    getToken();
    return;
  }
  if (item.fn) {
    item
      .fn({
        method: isLike.value ? "" : "post",
        app_token: app_token.value,
        code: $route.query.id,
      })
      .then((d: any) => {
        console.log(d);
        Toast(d.msg);
        isLike.value = !isLike.value;
        arr.value[2].icon = isLike.value
          ? require("@/assets/tabbar2Ed.png")
          : require("@/assets/tabbar2.png");
      });
    return;
  }
  if (item.path !== "") {
    location.href = `${item.path}?value=${$props.info.fundName}&id=${$props.info.secCode}&name=${$props.info.fundName}&ut=${app_token.value}`;
  } else {
  }
};
</script>
<style lang="scss" scoped>
.tabbar {
  width: 750px;
  height: 116px;
  background: rgb(255, 255, 255);
  box-shadow: 0px -6px 6px rgba(0, 0, 0, 0.05);
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  color: #999999;

  div {
    text-align: center;
  }

  img {
    width: 40px;
  }
}

.blankDiv {
  width: 750px;
  height: 116px;
}
</style>
