<template>
    <section class="sharePage">
        <img v-if="!$route.query.type" src="@/assets/activity/sharePage.png" alt="">
        <img v-if="$route.query.type === 'niugu'" src="@/assets/activity/niugushareBgm.png" alt="">
        <img @click="open" src="@/assets/activity/joinHD.png" alt="">
        <img src="@/assets/activity/shareEWM.png" alt="">
    </section>
</template>
<script lang="ts" setup>
import { useStore } from '@/store';
import { useRoute } from 'vue-router';
import { addUserLog } from '@/api/activity';
import { onMounted } from 'vue';

const $route = useRoute();
const open = () => {
    location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=cn.com.nbd.nbdmobile';
}
onMounted(() => {
    addUserLog({ isApp: 0 })
})
</script>
<style lang="scss" scoped>
.sharePage {
    position: relative;
    height: 100vh;
    overflow: hidden;

    img:nth-child(1) {
        width: 750px;
    }

    img:nth-child(2) {
        width: 600px;
        position: absolute;
        bottom: 40px;
        left: 75px;
    }

    img:nth-child(3) {
        width: 434px;
        position: absolute;
        bottom: 120px;
        left: 158px;
    }

}
</style>
