import areaResultService from "@/api/areaResult.service";
import { FundInfo } from "@/type/areaResult.type";
import { defineStore } from "pinia";
import { ref } from "vue";

const useAreaResultStore = defineStore("areaResultStore", () => {
    const areaList = ref({});
    const district = async () => {
        let res = await areaResultService.district();
        areaList.value = res.data;
    };

    const tabIndex = ref(0);
    const changeTabIndex = (index: number) => {
        tabIndex.value = index;
    };
    const tabList = ref<FundInfo[][]>([]);
    const best = async (type: string) => {
        if (tabIndex.value == 0 || tabIndex.value == 1) {
            if (tabList.value[tabIndex.value]?.length > 0) {
                return;
            }
        }
        let res: any;
        try {
            res = await areaResultService.best(type, 1);
        } catch (err) {
            res = { data: [] };
        }
        tabList.value[tabIndex.value] = res.data;
    };
    return {
        areaList,
        district,
        tabIndex,
        changeTabIndex,
        tabList,
        best,
    };
});
export default useAreaResultStore;
