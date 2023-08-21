import aiSearchService from "@/api/aiSearch.service";
import { Fund, SearchFund } from "@/type/aiSearch.type";
import { defineStore } from "pinia";
import { ref, reactive } from "vue";
const useAiSearchStore = defineStore("aiSearchStore", () => {
    const key = ref("");
    const searchList = ref<SearchFund[]>([]);
    const search = async () => {
        if (key.value.length > 0) {
            let res = await aiSearchService.search(key.value);
            if (key.value) {
                searchList.value = res ? res.data : [];
            }
        } else {
            let res = aiSearchService.search(undefined);
            searchList.value = [];
        }
    };

    const addSearchHistory = async (fundCode: string) => {
        let res = aiSearchService.addSearchHistory(fundCode);
    };
    let searchHistory = ref<Fund[]>([]);
    const getSearchHistory = async () => {
        let res = await aiSearchService.getSearchHistory();
        searchHistory.value = res.data.data || [];
    };

    const userFunds = ref<Fund[]>([]);
    const getUserFunds = async () => {
        let res = await aiSearchService.getUserFunds();
        userFunds.value = res.data.data || [];
    };
    return {
        key,
        searchList,
        search,
        addSearchHistory,
        searchHistory,
        getSearchHistory,
        userFunds,
        getUserFunds,
    };
});

export default useAiSearchStore;
