import { FundClass } from "@/type/fundClass.type";
import axios from "./axios";
import factorySingleClass from "./SingleClass";

class FundClassService {
    getList(pageNum = 0, pageSize = 1000) {
        return axios.get<{ data: FundClass[] }>(
            `/nbd-app-article-provider/articles/fund/class?pageNum=${pageNum}&pageSize=${pageSize}`,
        );
    }
}

export default factorySingleClass(FundClassService);
