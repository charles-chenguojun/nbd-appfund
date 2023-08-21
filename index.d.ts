import "axios";
import "echarts";
declare module "axios" {
    export interface AxiosRequestConfig<D = any> {
        isLoading?: boolean;
    }
}

declare module "echarts" {
    export declare type XAXisOptionExtand = echarts.XAXisComponentOption & {
        data?: any;
    };
}

declare type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

declare type ExpandRecursively<T> = T extends object
    ? T extends infer O
        ? { [K in keyof O]: ExpandRecursively<O[K]> }
        : never
    : T;
