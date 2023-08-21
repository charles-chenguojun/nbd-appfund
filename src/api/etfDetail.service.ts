import { EtfDetail } from "@/type/etfDetail.type";
import axios from "./axios";
import factorySingleClass from "./SingleClass";

class EtfDetailService {
    getDetail(code: string) {
        return axios.get<EtfDetail>(`/nbd-fund/fund/index/${code}`);
    }
}

export default factorySingleClass(EtfDetailService);
