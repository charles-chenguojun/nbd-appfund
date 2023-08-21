<template>
  <section class="allCont updateScroollStyle" style="overflow-y: hidden">
    <h1></h1>
    <section class="listContent fundChooseList updateScroollStyle">
      <VanList :list="list" ref="Vanlist" @onLoad="onLoad" @onRefresh="onRefresh" :isSolt="true">
        <template v-slot:main>
          <section v-for="item in list" class="item" @click="toDetail(item.appManagerDetailUrl)">
            <div class="titleAndCode">
              {{ item.managerName }}
              <a href="javascript:;" @click.stop="toQA(item.questionUrl)" target="_blank">去提问
                <van-icon name="arrow" />
              </a>
            </div>
            <div class="itemTwo">
              <div>
                <p :style="{ color: getColor(item.managerLastYearEarn) }">{{
                    toPsInt(item.managerLastYearEarn) && toPsInt(item.managerLastYearEarn) + '%' || '-'
                }}
                </p>
                <p>近1年收益</p>
              </div>
              <div>
                <p :style="{ color: getColor(item.yearEarn) }">{{ toPsInt(item.yearEarn) && toPsInt(item.yearEarn) + '%' ||
                    '-'
                }}</p>
                <p>年化收益</p>
              </div>
              <div>
                <p>{{ item.serviceYear || '-' }}</p>
                <p>从业年限</p>
              </div>
              <div>
                <p>{{ toPsInt(item.maxReturn) }}%</p>
                <p>从业最大回撤</p>
              </div>
              <div>
                <p>{{ item.totalScale }}</p>
                <p>管理规模</p>
              </div>
            </div>
            <!-- <div>
                {{ item.managerFundsVO }}
            </div> -->
            <!-- <div v-if="$route.query.title != '连续正收益年数超5年' && item.managerFundsVO" class="itemThree">
              <div @click.stop="toDetail(item.appFundDetailUrl)">
                <img src="@/assets/daibiaoFund.png" alt="" />
                <div class="fundName">{{ item.fundName }}</div>
              </div>
              <div>
                <span :style="{ color: item.managerFundsVO.showFieldValueColor }">{{ item.managerFundsVO.showFieldValue }}</span>
                <span>（{{ item.managerFundsVO.showFieldName }}）</span>
              </div>
            </div> -->
            <div v-if="item.managerFundsVO" class="itemThree">
              <div @click.stop="toDetail(item.appFundDetailUrl)">
                <img src="@/assets/daibiaoFund.png" alt="" />
                <div class="fundName">{{ item.fundName }}</div>
              </div>
              <div>
                <span :style="{ color: item.managerFundsVO.showFieldValueColor }">{{ item.managerFundsVO.showFieldValue
                }}</span>
                <span>（{{ item.managerFundsVO.showFieldName }}）</span>
              </div>
            </div>
          </section>
        </template>
      </VanList>
    </section>
  </section>
</template>

<script lang="ts" setup>
import VanList from '@/components/list.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Icon as VanIcon } from 'vant'
import { tagForManager } from '@/api'
import { getColor, toPsInt } from '@/util/Debounced'
const toQA = (url: string) => {
  location.href = url
}
const Vanlist = ref<any>(null)
const toDetail = (url: string) => {
  location.href = url
}
const $route = useRoute()
const list = ref<any>([])
let pageNum = 1,
  pageSize = 20
const percent2percent25 = (URI: any) => {
  if (URI.indexOf('%') > -1) {
    return URI.replace(/%/g, '%25')
  } else {
    return URI
  }
}
onMounted(() => {
  const str = decodeURIComponent($route.query.title as any)
  document.title = str + (str == '从业超10年，年化收益超10' ? '%' : '')
  init()
})
const init = () => {
  Vanlist.value.updateStatus(false)
  pageNum = 0
  pageSize = 100
  list.value = []
  getList()
}
const getList = () => {
  Vanlist.value.updateLoadingStatus(true)
  tagForManager({ name: $route.query.title, pageindex: pageNum, size: pageSize }).then((d: any) => {
    if (d) {
      list.value = [...list.value, ...d.data]
      if (d.data.length < pageSize) {
        Vanlist.value.updateStatus()
      }
    }
    console.log(list.value)
    pageNum += 1
    Vanlist.value.updateLoadingStatus(false)
  })
}
const onLoad = () => {
  getList()
}
const onRefresh = () => {
  init()
}
</script>

<style lang="scss" src="./II.scss" scoped>
</style>
