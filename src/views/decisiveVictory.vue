<template>
    <div class="decisiveVictoryAllCont" style="display: flex; justify-content: space-between; flex-wrap: wrap">
        <!-- <div class="bgChooseItem firstItem" @click="toPath(0)">
            <img src="@/assets/1.png" alt="">
        </div>
        <div class="bgChooseItem" @click="toPath(1)">
            <img src="@/assets/2.png" alt="">
        </div>
        <div class="bgChooseItem" @click="toPath(2)">
            <img src="@/assets/3.png" alt="">
        </div> -->
        <div class="bgChooseItem" v-for="index in 6" @click="toPath(index - 1)">
            <img :src="require(`../assets/fund/${index}.png`)" alt="" />
        </div>


        <div class="g-focus">
            <a-table :columns="columns" :data-source="data" :scroll="{ x: 1300, y: 1000 }" >
                <template #bodyCell="{ column }">
                    <template v-if="column.key === 'operation'">
                        <a>action</a>
                    </template>
                </template>
            </a-table>


        </div>


    </div>
</template>
<script lang="ts" setup>
import concatApp from "@/util/concatApp";
import { reactive, ref, watchEffect } from "vue";

import { useRouter } from "vue-router";
const router = useRouter();
const columns = ref([
  { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
  { title: 'Column 1', dataIndex: 'address', key: '1', },
  { title: 'Column 2', dataIndex: 'address', key: '2', },
  { title: 'Column 3', dataIndex: 'address', key: '3', },
  { title: 'Column 4', dataIndex: 'address', key: '4', },
  { title: 'Column 5', dataIndex: 'address', key: '5', },
  { title: 'Column 6', dataIndex: 'address', key: '6', },
  { title: 'Column 7', dataIndex: 'address', key: '7', },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    dataIndex: 'address'
  },
]);



const data = ref([
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 40,
    address: 'London Park',
  },
]);

const toPath = (i: number) => {
    const arr = [
        "/fund-manager/c/chooseScene?appType=app",
        "/aiSearch",
        "/chooseResult",
        "https://news.nbd.com.cn/fund-manager/c/appRank?appType=app",
        "/areaResult",
        "https://news.nbd.com.cn/fund-manager/c/hot_fund?appType=app",
    ];
    switch (i) {
        case 0:
            toApp();
            break;
        case 3:
        case 5:
            location.href = arr[i];
            break;
        default:
            router.push(arr[i]);
    }

    // if (i === 0 || i === 2) {
    //     console.log(window.location.origin + arr[i]);
    //     return;
    //     location.href = window.location.origin + arr[i];
    // } else {
    //     toApp();
    // }
};
const toApp = () => {
    concatApp.appToPage({ operate: "ai_filter_fund" });
};






</script>
<style lang="scss" scoped>
.decisiveVictoryAllCont {
    padding-top: 30px;
}

.bgChooseItem {
    width: 326px;
    margin: auto;
    margin-bottom: 32px;

    // margin-bottom: 8px;
    img {
        width: 100%;
    }
}

.firstItem {
    margin-top: 60px;
}
</style>
