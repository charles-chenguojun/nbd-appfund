<template>
  <section v-if="obj.status === 'have_record'">
    <div class="wintishi" v-if="obj.status_for_ui === '已出结果' && voteCount !== 0">
      {{ obj.record.succ_sign == 0 ? '很遗憾，你未猜中今日牛股' : `恭喜你，猜中牛股啦！参与瓜分今日${popup_inf_score_add}币` }}
    </div>
    <div class="wintishi"
      v-if="(obj.status_for_ui === '投票中' || obj.status_for_ui === '投票已结束') && voteCount !== 0 && obj.status_for_ui !== '已出结果'">
      你已投票，{{
          obj.record.day_date_str
      }}日16：00公布结果</div>
    <div class="wintishi" v-if="(obj.status_for_ui === '已出结果' || obj.status_for_ui === '投票已结束') && voteCount === 0">
      投票已结束,本期你未参与</div>
    <div class="wintishi" v-if="obj.status_for_ui === '投票还未开始'">投票还未开始</div>
    <section v-if="!isHistory" class="shareSection">
      <div class="sectionTitle">股票掘金池</div>
      <section v-for="(item, index) in obj.record.stocks">
        <div v-if="obj.status_for_ui === '投票中' && item.voted_by_cur_user_sign === 0"
          @click="toPath(item.stock_detail_url, item.stock_code, item.stock_name)" class="item type1">
          <div>
            <p>
              {{ item.stock_name }}
            </p>
            <p>
              {{ item.stock_code }}
            </p>
          </div>
          <section class="headOneRight">
            <div @click.stop="toOri_source_url(item.ori_source_url)" class="miaoshu" style="color: #fd6e48">{{
                item.ori_source
            }}</div>
            <div v-show="voteCount !== 2" @click.stop="toupiao(item.stock_name, item.id, index)">投TA</div>
          </section>
        </div>
        <div v-if="obj.status_for_ui === '投票中' && item.voted_by_cur_user_sign === 1" class="item yijingtoupiao">
          <div>
            <p>
              {{ item.stock_name }}
            </p>
            <p>
              {{ item.stock_code }}
            </p>
          </div>
          <div style="color: #fd6e48" @click.stop="toOri_source_url(item.ori_source_url)">{{ item.ori_source }}</div>
          <section>你已投票</section>
        </div>
        <div v-if="obj.status_for_ui !== '投票中'"
          :class="item.top_stock_sign && item.voted_by_cur_user_sign ? 'item2 yourtoupiao jrng' : item.top_stock_sign ? 'item2 jrng' : item.voted_by_cur_user_sign ? 'item2 yourtoupiao' : 'item2'"
          @click="toPath(item.stock_detail_url, item.stock_code, item.stock_name)">
          <img v-if="item.top_stock_sign" src="@/assets/activity/jinriniugu.png" alt="" />
          <section v-if="item.voted_by_cur_user_sign">你的投票</section>
          <div>
            <p>
              {{ item.stock_name }}
            </p>
            <p>
              {{ item.stock_code }}
            </p>
          </div>
          <div>
            <p>{{ item.open_price }}</p>
            <p>开盘价</p>
          </div>
          <div>
            <p>{{ item.close_price }}</p>
            <p>收盘价</p>
          </div>
          <div>
            <p :style="{ color: getColor(item.raise_percent) }">{{ item.raise_percent + (item.raise_percent === '-' ||
                !item.raise_percent ? '' : '%')
            
            }}</p>
            <p>实际涨幅</p>
          </div>
        </div>
      </section>
    </section>
  </section>
  <section v-if="isHistory" class="shareSection">
    <div class="sectionTitle"></div>
    <section v-for="(item, index) in obj.record.stocks">
      <div
        :class="item.top_stock_sign && item.voted_by_cur_user_sign ? 'item2 yourtoupiao jrng' : item.top_stock_sign ? 'item2 jrng' : item.voted_by_cur_user_sign ? 'item2 yourtoupiao' : 'item2'">
        <img v-if="item.top_stock_sign" src="@/assets/activity/jinriniugu.png" alt="" />
        <section v-if="item.voted_by_cur_user_sign">你的投票</section>
        <div>
          <p>
            {{ item.stock_name }}
          </p>
          <p>
            {{ item.stock_code }}
          </p>
        </div>
        <div>
          <p>{{ item.open_price }}</p>
          <p>开盘价</p>
        </div>
        <div>
          <p>{{ item.close_price }}</p>
          <p>收盘价</p>
        </div>
        <div>
          <p :style="{ color: getColor(item.raise_percent) }">{{ item.raise_percent + (item.raise_percent === '-' ||
              !item.raise_percent ? '' : '%')
          
          }}</p>
          <p>今日表现</p>
        </div>
      </div>
    </section>
  </section>
</template>

<script lang="ts" setup>
import { vote } from '@/api/activity'
import { Dialog, Toast } from 'vant'
import { useStore } from '@/store'
import { onMounted } from 'vue'
import AppFn from '@/util/apptoken'
import concatApp from '@/util/concatApp';

const { getToken, app_token } = AppFn()
const toPath = (url: string, code: string, name: string) => {
  if (url) {
    concatApp.appToPage({ operate: 'open_stock', stock_suffix: code, stock_name: name, stock_url: url })
  }
}
const toOri_source_url = (url: string) => {
  location.href = url;
}
const $store = useStore()
const props = defineProps({
  obj: {
    default: () => {
      return {
        record: [],
      }
    },
    type: Object as any,
  },
  popup_inf_score_add: {
    default: 0,
    type: Number,
  },
  voteCount: {
    default: 0,
    type: Number,
  },
  isHistory: {
    default: false,
    type: Boolean,
  },
})
const getColor = (num: any): string => {
  if (num === '-' || num === 0) {
    return '#2c3e50'
  } else if (num > 0) {
    return '#EE2A36'
  } else {
    return 'green'
  }
}
onMounted(() => {
  console.log(props.obj)
})
const $emit = defineEmits(['addVoteCount'])
const toupiao = (name: string, id: number, index: number) => {
  if (app_token.value === '' || !app_token.value) {
    getToken();
    return
  }
  Dialog.confirm({
    message: `确认投票${name}？`,
  })
    .then(() => {
      // on confirm
      vote(id, app_token.value).then((d: any) => {
        Toast(`${d.msg}`)
        if (d.result === 1) {
          props.obj.record.stocks[index].voted_by_cur_user_sign = 1
          $emit('addVoteCount')
        }
      })
    })
    .catch(() => {
      // on cancel
    })
}
</script>

<style lang="scss" scoped>
.yijingtoupiao {
  border: 1px solid #1a75df !important;
  position: relative;

  div:nth-child(2) {
    width: 113px;
    text-align: center;
  }

  div:nth-child(1) {
    p:nth-child(1) {
      font-size: 30px;
      font-weight: 600;
      margin-bottom: 20px;
    }

    p:nth-child(2) {
      color: #999999;
    }
  }

  section {
    width: 103px;
    height: 26px;
    background: #1a75df;
    opacity: 1;
    border-radius: 4px 10px 4px 4px;
    position: absolute;
    top: 0;
    right: 0;
    color: white;
    text-align: center;
  }
}

.yourtoupiao {
  border: 1px solid #1a75df !important;
  margin-top: 0 !important;

  section {
    width: 113px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    background: #1a75df;
    opacity: 1;
    border-radius: 4px 10px 4px 4px;
    position: absolute;
    top: 0;
    right: 0;
    color: white;
    text-align: center;
  }
}

.wintishi {
  width: 702px;
  height: 44px;
  background: linear-gradient(90deg, #ffffff 0%, #f1ffa3 100%);
  border-radius: 22px;
  margin: 24px auto 30px;
  color: #ee2a36;
  font-weight: 600;
  text-align: center;
  line-height: 44px;
}

.shareSection {
  .item2 {
    width: 670px;
    background: #ffffff;
    border-radius: 10px;
    display: flex;
    margin: auto;
    margin-bottom: 8px;
    justify-content: space-between;
    align-items: center;
    padding: 28px 24px;
    box-sizing: border-box;
    position: relative;

    div {
      p {
        text-align: center;
      }

      p:nth-child(1) {
        font-size: 29px;
        font-weight: 600;
        margin-bottom: 20px;
      }

      p:nth-child(2) {
        color: #999999;
      }
    }

    div:nth-child(1) {
      p:nth-child(1) {
        font-size: 30px !important;
      }
    }
  }

  .type1 {
    div:nth-child(2) {
      width: 113px;
      height: 48px;
      background: #feeaea;
      border-radius: 24px;
      text-align: center;
      line-height: 48px;
      color: #ee2a36;
    }

    .miaoshu {
      // width: 113px;
      text-align: center;
      white-space: nowrap;
    }
  }

  .headOneRight {
    // display: flex;
    // flex-direction: column;


    div:nth-child(2) {
      margin-top: 20px;
      float: right;
    }
  }

  .item {
    width: 670px;
    background: #ffffff;
    border-radius: 10px;
    display: flex;
    margin: auto;
    margin-bottom: 8px;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    box-sizing: border-box;

    div:nth-child(1) {
      p:nth-child(1) {
        font-size: 30px;
        font-weight: 600;
        margin-bottom: 20px;
      }

      p:nth-child(2) {
        color: #999999;
      }
    }
  }

  background: #fff5ed;
  width: 702px;
  border-radius: 20px;
  margin: auto;
  margin-bottom: 24px;
  padding: 34px 22px;
  box-sizing: border-box;

  .sectionTitle {
    font-size: 40px;
    font-weight: 600;
    margin-bottom: 26px;
  }
}

.jrng {
  border: 2px solid #ee2a36 !important;
  margin-top: 36px;

  img {
    position: absolute;
    width: 165px;
    top: -30px;
  }
}
</style>
