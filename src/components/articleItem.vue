<template>
  <a @click="toPath(obj.resourceUrl)" href="javascript:;">
    <article class="articleItem">
      <div class="left">
        <div>
          {{ obj.title }}
        </div>
        <div>{{ formDate(obj.publishTime * 1000) }}</div>
      </div>
      <div class="right">
        <van-image width="100" :src="obj.thumbnailUrl" />
      </div>
    </article>
  </a>
</template>

<script lang="ts" setup>
import { Image as VanImage } from "vant";
import concatApp from "@/util/concatApp";

const props = defineProps({
  obj: {
    default: {},
    require: true,
    type: Object,
  },
});
const toPath = (url: string) => {
  // location.href = url;
  concatApp.appToPage({ operate: "open_article", article_id: props.obj.id, url });
};
const formDate = (time: number): string => {
  const d = new Date(time);
  const html = `${d.getFullYear()}-${
    d.getMonth() + 1
  }-${d.getDate()}  ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  return html;
};
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
}

.articleItem {
  width: 686px;
  margin: auto;
  display: flex;
  padding-bottom: 20px;
  border-bottom: 1px solid #f3f4f8;
  margin-bottom: 30px;
  margin-top: 10px;
  justify-content: space-between;
  .left {
    // padding: 10px 0 0;
    margin-right: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 500px;
    div:nth-child(1) {
      font-size: 30px;
      font-weight: 600;
      padding: 2px 0 0;
      line-height: 36px;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      height: 68px;
      margin-bottom: 20px;
    }

    div:nth-child(2) {
      font-size: 20px;
      color: #999999;
    }
  }
}
</style>
