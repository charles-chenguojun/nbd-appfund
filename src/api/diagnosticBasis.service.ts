import { BullBearMarket } from "@/type/diagnosticBasis.type";
import axios from "./axios";
import factorySingleClass from "./SingleClass";
class DiagnosticBasisService {
    bullBearMarket(secCode: string) {
        return axios.get<{ data: BullBearMarket }>(
            `/nbd-fund/fund/detail/bull_bear_market/${secCode}`,
        );
    }
}

export default factorySingleClass(DiagnosticBasisService);
