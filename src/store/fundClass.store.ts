import fundClassService from "@/api/fundClass.service";
import { FundClass } from "@/type/fundClass.type";
import { defineStore } from "pinia";
import { ref } from "vue";

const useFundClassStore = defineStore("fundClassStore", () => {
    const list = ref<FundClass[]>([]);
    const getList = async () => {
        let res = await fundClassService.getList();
        list.value = res.data.data;
    };

    return {
        list,
        getList,
    };
});

export default useFundClassStore;
