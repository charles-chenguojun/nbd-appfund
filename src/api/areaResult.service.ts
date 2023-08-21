import { FundInfo } from "@/type/areaResult.type";
import axios from "./axios";
import factorySingleClass from "./SingleClass";
let cancel: any = null;

class AreaResultService {
    district() {
        return axios.get<{ [key: string]: string[] }>(
            "/nbd-fund/fund/district",
        );
    }
    best(type: string, sceneType: 0 | 1) {
        cancel && cancel("取消请求");
        return axios.get<FundInfo[]>(
            `/nbd-fund/fund/funds/best?type=${type}&sceneType=${sceneType}`,
            {
                cancelToken: new axios.CancelToken((c) => {
                    cancel = c;
                }),
            },
        );
    }
}

export default factorySingleClass(AreaResultService);
