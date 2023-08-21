export interface Fund {
    aiQuantifyFundUrl?: string;
    fundName: string;
    secCode: string;
    secShortNameCn?: string;
}
export interface SearchFund {
    fundDetailUrl: string;
    fundType: string;
    nvgOty: number;
    secCode: string;
    secShortNameCn: string;
}
