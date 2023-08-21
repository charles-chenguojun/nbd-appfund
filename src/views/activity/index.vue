<!--
 * @Description: 
 * @Autor: dyl
 * @Date: 2022-08-11 09:34:46
 * @LastEditors: dyl
 * @LastEditTime: 2022-09-07 10:34:52
-->
<template>
  <section :class="$store.tabType == 0 ? 'allBgm' : 'allBgm niuguBgm'">
    <div class="head">
      <transition name="detailShow">
        <section v-if="$store.tabType == 0">
          <img class="bgm" src="../../assets/activity/bgm.png" alt="" />
          <div class="time">
            <div></div>
            <!-- <div>活动时间：9月2日-9月30日</div> -->
            <div>
              <img @click="goHistoryWin" src="../../assets/activity/articleHistoryWin1.png" alt="">
            </div>
          </div>
        </section>
      </transition>
      <transition name="detailShow">
        <section v-if="$store.tabType == 1">
          <img class="bgm" src="../../assets/activity/NGBGM.png" alt="" />
          <div class="historyDetail-headBg">
            <div class="bottom">
              <div @click="btnFn(0)">
                <span>{{ $route.query.date ? $store.historyNiuguInfo.record.day_date_str :
                $store.niuguInfo.cur_vote_date
                }}期</span>
                <img src="../../assets/activity/qishu.png" alt="" />
              </div>
              <div>
                <img @click="goHistoryWin" src="../../assets/activity/articleHistoryWin2.png" alt="">
                <img @click="showGuize = true" src="@/assets/activity/hdgz.png" alt="" />
              </div>
            </div>
          </div>
        </section>
      </transition>
      <div class="tab">
        <img v-if="$store.tabType == 1" src="@/assets/activity/cainiuguEd.png" alt="" />
        <img v-if="$store.tabType == 1" src="@/assets/activity/zanhaowen.png" alt="" @click="$store.tabType = 0" />
        <img v-if="$store.tabType == 0" src="@/assets/activity/cainiugu.png" @click="$store.tabType = 1" alt="" />
        <img v-if="$store.tabType == 0" src="@/assets/activity/zanhaowened.png" alt="" />
      </div>
      <transition name="detailShow">
        <div v-if="$store.tabType == 1" class="selfInfo">
          <img class="kuang" src="../../assets/activity/selfInfo.png" alt="" />
          <div class="selfInfo-left">
            <!-- 头像 -->
            <div>
              <img :src="$store.userInfo.avatar || $store.morenUrl" alt="" />
            </div>
            <div>
              <p>{{ $store.userInfo.nickname }}</p>
              <p v-if="$store.voted_one_day_record_count !== '' && $store.tabType == 0">参与赞好文活动 {{
              $store.voted_one_day_record_count
              }} 次</p>
              <p v-if="$store.tabType == 1">参与猜牛股活动 {{ $store.niuguInfo.voted_one_day_record_count }} 次</p>
            </div>
          </div>
          <div class="selfInfo-right">
            <div>
              <p>{{ $store.selfInfo.points || '-' }}</p>
              <p>本轮获得N币</p>
            </div>
            <div>
              <p>{{ $store.selfInfo.rank || '-' }}</p>
              <p>排名</p>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <img class="huodongshengji" v-if="$store.tabType == 0" src="../../assets/activity/zanhaowenhuodongshengji.png"
      alt="">
    <div v-if="$store.tabType == 0 && !isAndroid" class="blankDiv"></div>

    <!-- <transition name="detailShow">
      <section v-if="$store.tabType == 0">
        <div class="zanmingdan">
          <ul ref="ulCont" class="updateScroollStyle">
            <li v-for="item in $store.zanRecode" class="zanItem">
              <img src="@/assets/tabbar2Ed.png" alt="" />
              <p>用户{{ item.phone_no }}已赞好文</p>
            </li>
          </ul>
          <div class="right">
            <div @click="toPath(0)">
              <img src="@/assets/activity/dianzanjilu.png" alt="" />
            </div>
            <div @click="showGuize = true">
              <img src="@/assets/activity/guize.png" alt="" />
            </div>
          </div>
        </div>
        <div v-if="$store.day_date_str_short && $store.day_date_str_short !== ''" class="timepublus">
          <div>{{ $store.day_date_str_short }}期结果</div>
          <div @click="toPath(2)">
            <img src="@/assets/activity/wangqi.png" alt="" />
            <p>往期</p>
            <img src="@/assets/activity/you.png" alt="" />
          </div>
        </div>
        <div v-for="item in $store.goodArticle" class="articleDivItem">
          <GoodArticle :good="true" :obj="item" />
        </div>
        <div @click="toPath(3)" v-if="$store.day_date_str_short && $store.day_date_str_short !== ''"
          class="zhongjiangmingdan">
          <img src="@/assets/activity/mingdan.png" alt="" />
        </div>
        <div v-if="!$store.day_date_str_short || $store.day_date_str_short === ''" class="blankDiv less"></div>
        <NBRank :list="$store.zanList" :count="10" />
        <div class="blankDiv"></div>
        <div @click="gotozanBTN" class="gotozanBTN">
          <img src="@/assets/activity/gotozanBTN.png" alt="" />
        </div>
      </section>
    </transition> -->
    <transition name="detailShow">
      <section v-if="$store.tabType == 1">
        <div v-show="!$route.query.date" class="zanmingdan niuguMingdan">
          <ul ref="ulCont" class="updateScroollStyle">
            <li v-for="item in $store.niuguInfo.latest_voted_users" class="zanItem">
              <img src="@/assets/tabbar2Ed.png" alt="" />
              <p>用户{{ item.phone_no }}已猜牛股</p>
            </li>
          </ul>
        </div>
        <shares @addVoteCount="$store.niuguInfo.cur_record.vote_count_for_user += 1"
          :obj="$route.query.date ? $store.historyNiuguInfo : $store.niuguInfo.cur_record"
          :popup_inf_score_add="$store.niuguInfo.popup_inf_score_add"
          :voteCount="$store.niuguInfo.cur_record.vote_count_for_user" :isHistory="$route.query.date ? true : false" />
        <NBRank :list="$store.zanList" :count="10" />
        <!-- <div class="canyufangshi">
          <img src="@/assets/activity/canyufangshi.png" alt="" />
        </div> -->

      </section>
    </transition>
    <div v-if="!isAndroid" class="mianze">
      —————&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;所有奖品和活动均与苹果公司无关&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;—————</div>

    <div class="blankDiv"></div>
    <!-- <section class="jqqd" v-if="$store.tabType == 1">
      <img src="@/assets/activity/toOnline.png" alt="" />
    </section> -->
    <WinDialog v-if="$store.winDialogShow && $store.tabType === 0" :count="$store.getCount"
      @closeDia="$store.winDialogShow = false" />
    <WinDialog v-if="$store.niuguShow && $store.tabType === 1" type="niugu"
      :count="$store.niuguInfo.popup_inf_score_add" @closeDia="$store.niuguShow = false" />
    <Guize :show="showGuize" @closeDia="showGuize = false" :type="$store.tabType === 0 ? 'haowen' : 'niugu'" />
    <div
      v-if="$store.niuguInfo.cur_record.status_for_ui === '投票中' && !$route.query.date && $store.tabType == 1 && $store.niuguInfo.cur_record.vote_count_for_user !== 2"
      class="dottomCount">
      本期剩余投票次数 <span>{{ 2 - $store.niuguInfo.cur_record.vote_count_for_user }}</span>次
    </div>
  </section>
</template>

<script lang="ts" setup>
import GoodArticle from '@/components/goodArticle.vue'
import NBRank from '@/components/NBRank.vue'
import WinDialog from '@/components/winDialog.vue'
import Guize from './guize.vue'
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import AppFn from '@/util/apptoken'
import { useStore } from '@/store'
import { getLastestFinishedRecord, getMyRank, getZanRank, start_info, one_day_record, addUserLog } from '@/api/activity'
import concatApp from '@/util/concatApp'
import shares from '@/components/shares.vue'

const btnFn = (i: number) => {
  routerFn({
    name: 'historyList',
    query: {
      type: 'niugu',
    },
  })
}
const goHistoryWin = () => {
  $router.push({
    name: 'historyRank',
  })
}
const gotozanBTN = () => {
  let obj: any = { operate: 'jump_to_home' }
  if (!concatApp.isAndroidFn()) {
    obj.home_index = 0
  }

  concatApp.appToPage(obj)
}
const $store = useStore()
const { getToken, app_token } = AppFn()
const showGuize = ref(false)
// const goodArticle = ref<any>([]);
// const day_date_str_short = ref("");
// const zanRecode = ref<any>([]);
// let day_date_str = "";
// const voted_one_day_record_count = ref("");
// const userInfo = ref<any>({});
const ulCont = ref<any>(null)
const isAndroid = ref(true);
onMounted(() => {
  isAndroid.value = concatApp.isAndroidFn();
  if ($route.query.date) {
    one_day_record($route.query.date as any, app_token.value).then((d: any) => {
      console.log(d)
      $store.historyNiuguInfo = { ...d }
    })
  }
  if (!app_token.value || app_token.value === '') {
    getToken().then((d: any) => {
      if (!d || d === '') {
        concatApp.closeCurrentPage()
      } else {
        app_token.value = d;
        $store.app_token = d;
        addUserLog({ isApp: 1, app_token: app_token.value })
      }
    })
    return
  }
})
watch(app_token, () => {
  getData()
  getStart_info()
})
const scroolFn = () => {
  ulCont.value.innerHTML = ulCont.value.innerHTML + ulCont.value.innerHTML
}
const getStart_info = () => {
  if (!$store.niuguInfo.result) {
    start_info(app_token.value).then((d: any) => {
      $store.niuguInfo = { ...d }
      $store.niuguShow = d.popup_user_sign === 0 ? false : true
    })
  }
}
const getData = () => {
  if (!$store.selfInfo.points) {
    getLastestFinishedRecord(app_token.value).then((d: any) => {
      console.log(d)
      if (d.result !== 0) {
        // goodArticle.value = d.latest_finished_record.record.top_articles;
        // day_date_str_short.value =
        //   d.latest_finished_record.record.day_date_str_short;
        // day_date_str = d.latest_finished_record.record.day_date_str;
        // voted_one_day_record_count.value = d.voted_one_day_record_count;
        // zanRecode.value = d.latest_voted_users;
        // userInfo.value = d.user;
        // winDialogShow.value = d.popup_user_sign === 0 ? false : true;
        $store.goodArticle = d.latest_finished_record.record.top_articles
        $store.day_date_str_short = d.latest_finished_record.record.day_date_str_short
        $store.day_date_str = d.latest_finished_record.record.day_date_str
        $store.voted_one_day_record_count = d.voted_one_day_record_count
        $store.zanRecode = d.latest_voted_users
        $store.userInfo = d.user
        $store.winDialogShow = d.popup_user_sign === 0 ? false : true
        $store.getCount = d.popup_inf_score_add
        // setTimeout(() => {
        //   scroolFn();
        // }, 100);
      }
      // else {
      //     Toast(d.msg)
      // }
    })
  }
  if (!$store.selfInfo.points) {
    getMyRank(app_token.value).then((d: any) => {
      $store.selfInfo = d
    })
  }
  if ($store.zanList.length === 0) {
    getZanRank(app_token.value).then((d: any) => {
      $store.zanList = d.list
    })
  }
}
const winDialogShow = ref(false)
const $router = useRouter()
const $route = useRoute()
// const $store.tabType = ref(1);
interface routeParams {
  name: string
  query?: {
    date?: string
    type?: string
  }
}
const routerFn = (obj: routeParams) => {
  $router.push(obj)
}
const toPath = (i: number) => {
  if (i === 0 && app_token.value === '') {
    getToken()
    return
  }
  const arr = [
    {
      name: 'recod',
      query: {
        ut: app_token.value,
      },
    },
    { name: 'guize', query: { type: 'haowen' } },
    { name: 'historyList' },
    { name: 'winningList', query: { date: $store.day_date_str } },
  ]
  routerFn(arr[i])
}
</script>
<style lang="scss" scoped>
.huodongshengji {
  width: 480px;
  position: fixed;
  left: 135px;
  top: 500px;
}

.jqqd {
  position: fixed;
  top: 560px;
  left: 50%;
  transform: translate(-50%, 0);

  img {
    width: 448px;
  }
}

.gotozanBTN {
  width: 710px;
  position: fixed;
  bottom: 20px;
  left: 20px;

  img {
    width: 100%;
  }
}

.zhongjiangmingdan {
  margin: 20px auto 32px;
  width: 310px;

  img {
    width: 310px;
  }
}

.timepublus {
  display: flex;
  padding: 0px 44px 0 27px;
  justify-content: space-between;
  margin-top: 24px;
  align-items: center;
  margin-bottom: 40px;

  div:nth-child(1) {
    font-size: 40px;
    color: white;
    font-weight: 600;
  }

  div {
    display: flex;
    align-items: center;

    p {
      color: white;
      margin: 10px;
    }

    img {
      width: 24px;
      height: 24px;
    }
  }
}

.zanmingdan {
  width: 702px;
  height: 264px;
  background: #e5733f;
  border: 1px solid #ffb088;
  border-radius: 20px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  padding: 24px;
  box-sizing: border-box;
  margin-bottom: 20px;

  ul {
    overflow: hidden;
    height: 230px;
  }

  .zanItem {
    width: 334px;
    height: 44px;
    background: rgba(0, 0, 0, 0.205);
    border-radius: 22px;
    color: white;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    white-space: nowrap;

    img {
      width: 38px;
      height: 38px;
      border-radius: 100%;
      margin-bottom: 2px;
      margin-left: 6px;
    }
  }

  .right {
    div:nth-child(1) {
      margin-bottom: 24px;
    }

    img {
      width: 96px;
      height: 96px;
    }
  }
}

.bgm {
  width: 750px;
}

.tab {
  position: absolute;
  top: 332px;
  display: flex;
  align-items: flex-start;

  img {
    width: 253px;
    // height: 192px;
    margin-left: 20px;
  }
}

.allBgm {
  min-height: 100vh;
  background: #fb8f4c;

  .head {
    position: relative;

    .time {
      color: white;
      position: absolute;
      top: 262px;
      font-weight: bold;
      left: 50%;
      transform: translate(-50%, 0);
      font-size: 30px;
      white-space: nowrap;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 702px;

      img {
        height: 50px;
      }
    }

    .selfInfo {
      position: absolute;
      top: 478px;

      .kuang {
        width: 715px;
      }

      .selfInfo-left {
        position: absolute;
        top: 50%;
        left: 24px;
        transform: translate(0, -50%);
        display: flex;
        align-items: center;

        div:nth-child(1) {
          width: 88px;
          height: 88px;
          border: 1px solid #dedede;
          border-radius: 100%;
          overflow: hidden;

          img {
            width: 88px;
            height: 88px;
          }
        }

        div:nth-child(2) {
          margin-left: 16px;

          p:nth-child(1) {
            color: #333;
            font-size: 30px;
            font-weight: 600;
            margin-bottom: 16px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 260px;
          }

          p:nth-child(2) {
            color: #878c9d;
          }
        }
      }
    }

    .selfInfo-right {
      display: flex;
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      right: 32px;

      div:nth-child(1) {
        margin-right: 22px;
      }

      div {
        p {
          text-align: center;
        }

        p:nth-child(1) {
          font-size: 36px;
          font-weight: 600;
          color: #fd6e48;
          margin-bottom: 16px;
        }

        p:nth-child(2) {
          color: #878c9d;
        }
      }
    }
  }
}

.less {
  height: 40px !important;
}

//无限滚动
.zanItem {
  //animation-delay: -5s;
  animation: marquee 5s linear infinite;
}

.marquee:hover {
  animation-play-state: paused;
}

@keyframes marquee {
  0% {
    transform: translateY(0%);
  }

  100% {
    transform: translateY(-98%); //这里不是-100%！
  }
}

.historyDetail-headBg {
  width: 750px;
  height: 100px;
  // background: url('../../assets/activity/NGBGM.png');
  background-size: 750px 350px;
  position: absolute;
  top: 242px;

  .bottom {
    display: flex;
    width: 702px;
    justify-content: space-between;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%, 0);
    align-items: center;

    div:nth-child(1) {
      img {
        width: 240px;
      }

      span {
        color: #f6441f;
        position: absolute;
        top: 18px;
        left: 32px;
      }
    }

    div:nth-child(2) {
      img {
        // width: 150px;
        height: 50px;
      }

      img:nth-child(1) {
        margin-right: 10px;
      }
    }
  }
}

.canyufangshi {
  width: 702px;
  margin: 20px auto 0;

  img {
    width: 702px;
  }
}

.dottomCount {
  width: 750px;
  height: 48px;
  background: #fd6e48;
  opacity: 0.9;
  position: fixed;
  bottom: 0;
  text-align: center;
  line-height: 48px;
  color: white;

  span {
    font-size: 32px;
    display: inline-block;
    margin: 0 10px;
  }
}

.sectionNG {
  margin-top: 20px;
}

.niuguBgm {
  background: #810710 !important;
}

.niuguMingdan {
  background: #64060D !important;
}

.mianze {
  width: 750px;
  text-align: center;
  margin-top: 20px;
  color: white;
}
</style>
