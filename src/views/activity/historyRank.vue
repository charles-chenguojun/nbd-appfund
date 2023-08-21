<template>
    <section>
        <NBRank :list="list" :count="10" type="history" @tabIndexChange="tabIndexChange" />
        <div v-show="showDialog" class="winDialog">
            <section>
                <div>成为“瓜分万元大奖”大奖中奖用户</div>
                <p>
                    <span>姓名</span>
                    <span><input type="text" v-model="userInfo.name" placeholder="请输入姓名"></span>
                </p>
                <p>
                    <span>手机号码</span>
                    <span><input type="text" v-model="userInfo.phone_no" placeholder="请输入手机号码"></span>
                </p>
                <p>
                    <span>身份证号码</span>
                    <span><input type="text" v-model="userInfo.id_code" placeholder="请输入身份证号"></span>
                </p>
                <p>
                    <span>开户银行</span>
                    <span><input type="text" v-model="userInfo.bank_name" placeholder="请输入开户行（具体到支行）"></span>
                </p>
                <p>
                    <span>银行卡号</span>
                    <span><input type="text" v-model="userInfo.bank_card_no" placeholder="请输入银行卡号"></span>
                </p>
                <img class="sureBtn" @click="sureBtnFn" src="@/assets/activity/sureBtn.png" alt="">
            </section>

        </div>
        <div v-show="showDialog" class="mb" @click="showDialog = false"></div>
        <img v-if="userInfo.need_show_collect_dlg_sign" @click="showDialog = true" class="showWinBtn"
            src="@/assets/activity/zhongjianBtn.png" alt="">
    </section>
</template>

<script lang="ts" setup>
import { getActive_succ_user_infos, refresh_user_info, getHistoryRank } from '@/api/activity';
import NBRank from '@/components/NBRank.vue';
import { ref, onMounted } from 'vue';
import AppFn from '@/util/apptoken';
import { Toast } from 'vant';
const { getToken, app_token } = AppFn()

const list = ref<any>([]);
const sureBtnFn = () => {
    let isOk = true;
    if (!userInfo.value.name || userInfo.value.name === '') {
        Toast(`请输入姓名`)
        isOk = false
        return
    }
    if (!userInfo.value.phone_no || userInfo.value.phone_no === '') {
        Toast(`请输入电话`)
        return

        isOk = false
    }
    if (!userInfo.value.id_code || userInfo.value.id_code === '') {
        Toast(`请输入身份证号码`)
        return
        isOk = false
    }
    if (!userInfo.value.bank_name || userInfo.value.bank_name === '') {
        Toast(`请输入开户行`)
        return
        isOk = false
    }
    if (!userInfo.value.bank_card_no || userInfo.value.bank_card_no === '') {
        Toast(`请输入银行卡号`)
        isOk = false
        return
    }
    if (!isOk) {
        return
    }
    userInfo.value.app_user_token = app_token.value;
    refresh_user_info(userInfo.value).then((d: any) => {
        // console.log(d)
        Toast(`提交成功`)
        showDialog.value = false;
    })
};
const showDialog = ref(false);
const userInfo = ref<any>({})
const getRank = (type: number = 1) => {
    getHistoryRank(type).then((d: any) => {
        console.log(d)
        list.value = d.list
    })
}
onMounted(() => {
    getRank(2);
    getActive_succ_user_infos(app_token.value === '' ? undefined : app_token.value).then((d: any) => {
        d.user_info.need_show_collect_dlg_sign = d.need_show_collect_dlg_sign;
        userInfo.value = d.user_info;
        console.log(userInfo.value)
    })
})
const tabIndexChange = (tabIndex: any) => {
    console.log(tabIndex)
    getRank(tabIndex + 1);
}
</script>
<style lang="scss" scoped>
.showWinBtn {
    position: fixed;
    bottom: 80px;
    width: 506px;
    left: 124px;
}

.winDialog {
    background: url('../../assets/activity/getUserInfoDia.png') no-repeat;
    width: 570px;
    height: 800px;
    position: fixed;
    top: 260px;
    background-size: 570px;
    left: 90px;
    z-index: 12;

    .sureBtn {
        width: 496px;
        // position: absolute;
        // left: 37px;
        // bottom: 40px;
        margin-top: 20px;
    }

    div {
        width: 480px;
        font-size: 30px;
        font-weight: 400;
        color: #FFFFFF;
        text-align: center;
        margin: 20px auto 40px;
    }

    section {
        position: absolute;
        top: 120px;
        width: 506px;
        left: 32px;

        p {
            display: flex;
            justify-content: space-between;
            margin: 20px;
            align-items: center;

            span:nth-child(1) {
                font-size: 24px;
                color: #333;
                font-weight: 600;
                white-space: nowrap;
            }
        }

        input {
            width: 314px;
            height: 60px;
            background: #FFF8F5;
            opacity: 1;
            border-radius: 8px;
            border: 0;
            padding: 0 10px;
            box-sizing: border-box;
        }
    }
}

.mb {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 10;
    background: #25252544;
    top: 0;
}
</style>
