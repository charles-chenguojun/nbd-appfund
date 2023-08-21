import diagnosticBasisService from "@/api/diagnosticBasis.service";
import { BullBearMarket } from "@/type/diagnosticBasis.type";
import { defineStore } from "pinia";
import { ref } from "vue";

const useDiagnosticBasisStore = defineStore("diagnosticBasisStore", () => {
    const bullBearMarket = ref(new BullBearMarket());
    const getMarket = async (secCode: string) => {
        let res = await diagnosticBasisService.bullBearMarket(secCode);
        bullBearMarket.value = res.data.data;
    };

    return {
        bullBearMarket,
        getMarket,
    };
});

export default useDiagnosticBasisStore;
