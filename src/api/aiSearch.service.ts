import { SearchFund, Fund } from "@/type/aiSearch.type";
import axios from "./axios";
import factorySingleClass from "./SingleClass";
let cancel: any = null;
class AiSearchService {
    search(key: string | undefined) {
        cancel && cancel("取消请求");
        if (key) {
            return axios.get<SearchFund[]>(
                `/nbd-fund/search/list/fund/${key}`,
                {
                    cancelToken: new axios.CancelToken((c) => (cancel = c)),
                },
            );
        }
        return Promise.resolve(undefined);
    }
    addSearchHistory(fundCode: string) {
        return axios.post<any>(
            `/nbd-fund/search/fund/history?fundCode=${fundCode}`,
        );
    }
    getSearchHistory(limit = 12) {
        return axios.get<{ data: Fund[] }>(
            `/nbd-fund/search/fund/list/history?limit=${limit}`,
        );
    }
    getUserFunds() {
        return axios.get<{ data: Fund[] }>(`/nbd-fund/fund/user/funds/simple`);
    }
}

export default factorySingleClass(AiSearchService);
