<template>
    <section style="position: relative">
        <div class="aiSearchBlank"></div>
        <img class="aiSearch-head" src="@/assets/fund/aiSearch.png" alt="" />
        <!-- <input
            v-model="searchValue"
            type="text"
            placeholder="搜索基金即可诊断"
            pl
        /> -->
        <div class="search">
            <van-search
                class="search__input"
                placeholder="搜索基金即可诊断"
                autocomplete="off"
                :clearable="true"
                v-model="key"
                @update:model-value="hdlSearch"
                @clear="hdlSearch"
            />
            <div
                class="search__list"
                :class="{
                    'search__list--active':
                        searchList.length > 0 && key.length > 0,
                }"
            >
                <div
                    v-for="item in searchList"
                    :key="item.secCode"
                    class="tableItem"
                    @click="toFundDetail(item.secCode)"
                >
                    <div class="tableItemOne">
                        <div
                            v-demo:[item.secShortNameCn]="search"
                            class="jijinName"
                        >
                            {{ item.secShortNameCn }}
                        </div>
                        <div v-if="item.nvgOty > 0" class="add">
                            {{ item.nvgOty }}%
                        </div>
                        <div v-if="item.nvgOty <= 0" class="count">
                            {{ item.nvgOty }}%
                        </div>
                        <div v-if="!item.nvgOty && item.nvgOty !== 0">-</div>
                    </div>
                    <div class="contTwo">
                        <div class="tableItemTwo">
                            <div>{{ item.secCode }}</div>
                            <div>{{ item.fundType }}</div>
                        </div>
                        <div>今年以来</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="historyDiv">
            <h1>诊断历史</h1>
            <template v-if="app_token">
                <div v-if="searchHistory.length == 0" class="nodata">
                    <img src="@/assets/fund/nodata.png" alt="" />
                    <p>暂无诊断历史</p>
                </div>
                <template v-else>
                    <div
                        :class="
                            (index + 1) % 2 == 0
                                ? 'historyItem'
                                : 'historyItem mr'
                        "
                        v-for="(item, index) in searchHistory"
                        @click="toFundDetail(item.secCode)"
                    >
                        {{ item.fundName }}
                    </div>
                </template>
            </template>
            <template v-else>
                <button class="login" @click="hdlLogin">
                    登录查看诊断历史
                </button>
            </template>
        </div>
        <div class="historyDiv zixuan">
            <h1>自选基金</h1>
            <template v-if="app_token">
                <div v-if="userFunds.length == 0" class="nodata">
                    <img src="@/assets/fund/nodata.png" alt="" />
                    <p>暂无自选基金</p>
                </div>
                <template v-else>
                    <div
                        v-for="item in userFunds"
                        class="myFundItem"
                        @click="toFundDetail(item.secCode)"
                    >
                        <div>
                            <p>{{ item.fundName }}</p>
                            <p>{{ item.secCode }}</p>
                        </div>
                        <div>
                            <img src="@/assets/fund/aiSearchIcon.png" alt="" />
                            AI诊基
                        </div>
                    </div>
                </template>
            </template>
            <template v-else>
                <button class="login" @click="hdlLogin">
                    登录查看自选基金
                </button>
            </template>
        </div>
    </section>
</template>

<script lang="ts" setup>
    import { Search as VanSearch } from "vant";
    import { onMounted, onUnmounted, ref } from "vue";
    import useAiSearchStore from "@/store/aiSearch.store";
    import { storeToRefs } from "pinia";
    import { useRouter } from "vue-router";
    import { useStore } from "@/store";
    const aiSearchStore = useAiSearchStore();
    const { key, searchList, searchHistory, userFunds } =
        storeToRefs(aiSearchStore);
    const { search, addSearchHistory, getSearchHistory, getUserFunds } =
        aiSearchStore;
    const router = useRouter();

    const indexStore = useStore();
    const { app_token } = storeToRefs(indexStore);
    const { getToken } = indexStore;

    onMounted(async () => {
        let t = await getToken();
        app_token.value = t;
        if (t) {
            getSearchHistory();
            getUserFunds();
        }
    });

    let timer: any = null;
    const hdlSearch = (e: any) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(search, 1000);
    };

    const toFundDetail = (secCode: string) => {
        if (app_token.value) {
            addSearchHistory(secCode);
        }
        router.push({
            path: "/diagnosticBasis",
            query: {
                id: secCode,
            },
        });
    };

    const hdlLogin = async () => {
        await getToken(true);

        getSearchHistory();
        getUserFunds();
    };
</script>

<style lang="scss" scoped>
    .search {
        position: relative;
        height: 70px;
        margin-top: -35px;
        &__input {
            padding-top: 0;
            padding-bottom: 0;
            height: 70px;
            // margin-top: -35px;
            background: transparent;
            & ::v-deep .van-search__content {
                height: 70px;
                border-radius: 35px;
            }
        }
        &__list {
            position: absolute;
            top: 80px;
            left: 0;
            right: 0;
            height: 400px;
            overflow: auto;
            z-index: 100;
            margin: 0 24px;
            display: none;
            background: #fff;
            box-shadow: -5px 0 10px -5px #666, 5px 0 10px -5px #666,
                0 5px 10px -5px #666;
            box-sizing: border-box;
            padding: 0 20px;
            &--active {
                display: block;
            }
        }
    }
    .tableItem {
        border-bottom: 1px solid #dedede;
        padding: 20px 0;
        width: 100%;
        margin: 0 auto;

        div:first-child {
            text-align: left;
        }

        div:last-child {
            text-align: right;
        }
    }

    .contTwo {
        display: flex;
        align-items: center;
        margin-top: 10px;
        justify-content: space-between;

        div {
            color: #959ca7;
        }
    }

    .tableItemTwo {
        display: flex;
        align-items: center;

        div:first-child {
            color: #959ca7;
            font-size: 20px;
            margin-right: 20px;
        }

        div:nth-child(2) {
            color: #eb5648;
            font-size: 18px;
            background: #fcedeb;
            padding: 2px 6px;
        }
    }

    .tableItemOne {
        .jijinName {
            white-space: nowrap;
        }

        display: flex;

        div {
            color: #333333;
            font-size: 20px;
            width: 49.9%;
            font-weight: 600;
            font-size: 30px;
            text-align: center;
        }

        div:first-child {
            text-align: left;
        }

        div:last-child {
            text-align: right;
        }
    }

    .myFundItem {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #dedede;
        padding: 16px 0;

        img {
            width: 32px;
        }

        div:nth-child(1) {
            p:nth-child(1) {
                font-size: 30px;
                color: #333;
                font-weight: 600;
                margin-bottom: 10px;
            }

            p:nth-child(2) {
                color: #999999;
                font-size: 24px;
            }
        }

        div:nth-child(2) {
            display: flex;
            align-items: center;
            color: #2680eb;

            img {
                margin-right: 10px;
            }
        }
    }

    .mr {
        margin-right: 16px;
    }

    .historyItem {
        width: 343px;
        height: 40px;
        background: rgba(240, 240, 240, 0.39);
        opacity: 1;
        border-radius: 4px;
        display: inline-block;
        margin-bottom: 8px;
        line-height: 40px;
        text-align: center;
        color: #999999;
        font-size: 24px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        padding: 0 30px;
        box-sizing: border-box;
    }

    .zixuan {
        height: calc(100vh - 700px) !important;
        overflow-y: auto;
        border-bottom: 0 !important;
    }

    .nodata {
        text-align: center;
        margin-top: 40px;

        img {
            width: 130px;
            height: 130px;
            margin-bottom: 5px;
        }

        p {
            color: #c8c8c8;
            font-size: 24px;
        }
    }

    h1 {
        color: #666;
        font-size: 30px;
        font-weight: 600;
        margin-top: 34px;
        margin-bottom: 24px;
    }

    .historyDiv {
        height: 382px;
        width: 100%;
        background: rgba(255, 255, 255, 0.39);
        border-bottom: 8px solid #f1f4f7;
        padding: 0 24px;
        box-sizing: border-box;
    }

    input {
        font-size: 24px;
        width: 702px;
        height: 70px;
        border-radius: 36px;
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
        background: rgb(255, 255, 255);
        padding: 0 40px;
        border: 0;
        position: absolute;
        z-index: 10;
        top: 200px;
        left: 24px;
        box-sizing: border-box;
    }

    input::-webkit-input-placeholder {
        color: #999999;
        font-size: 24px;
    }

    .aiSearchBlank {
        background-color: #01289c;
        width: 100%;
        height: 80px;
        border-color: #01289c;
    }

    .aiSearch-head {
        width: 100%;
    }

    .login {
        display: block;
        padding: 0 66px;
        height: 56px;
        background: #e7f1fc;
        border-radius: 28px;
        color: #8090a7;
        border: none;
        margin: auto;
        margin-top: 200px;
        font-size: 26px;
    }
</style>
