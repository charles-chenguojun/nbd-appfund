import areaResultService from "@/api/areaResult.service";
import { FundInfo } from "@/type/areaResult.type";
import { defineStore } from "pinia";
import { ref } from "vue";
const useChooseResultStore = defineStore("chooseResultStore", () => {
    const tabIndex = ref(0);
    const changeTabIndex = (index: number) => {
        tabIndex.value = index;
    };
    const tabList = ref<FundInfo[][]>([]);
    const best = async (type: string) => {
        if (tabList.value[tabIndex.value]?.length > 0) {
            return;
        }
        let res: any;
        try {
            res = await areaResultService.best(type, 0);
        } catch (err) {
            res = { data: [] };
        }
        tabList.value[tabIndex.value] = res.data;
    };
    return {
        tabIndex,
        changeTabIndex,
        tabList,
        best,
    };
});
export default useChooseResultStore;
