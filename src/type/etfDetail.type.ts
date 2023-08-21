export class EtfDetail {
    indexName = "";
    indexWithSuffix = "";
    indexDetailUrl = "";
    pb: number | undefined = undefined;
    pbStr = "";
    pbPercent: number | undefined = undefined;
    pe: number | undefined = undefined;
    peStr = "";
    pePercent: number | undefined = undefined;
    inFund: Fund[] = [];
    outFund: Fund[] = [];
}

export interface Fund {
    codeWithSuffix: string;
    indexCodeNoSuffix: string;
    secCode: string;
    secFullName: string;
    secShortName: string;
    size: number;
    sizeUnit: string;
    countEarn: CountEarn;
    nowEarn: number;
    establishmentTime: string;
    fundUrl: string;
}

export interface CountEarn {
    recent1MonthEarn: number;
    recent1YearEarn: number;
    recent2YearEarn: number;
    recent3MonthEarn: number;
    recent3YearEarn: number;
    recent5YearEarn: number;
    recent6MonthEarn: number;
    recentWeekEarn: number;
    sinceEstablishmentEarn: number;
    thisEarn: number;
    thisMonthEarn: number;
    thisWeekEarn: number;
    thisYearEarn: number;
    updatedTime: string;
}
