export interface IGDataResponseOptions {
    pathRef: object | null | undefined;
    data: boolean | null | number | string | undefined | object;
}
export declare class GDataResponse {
    private __pathRef;
    private __data;
    constructor(options?: IGDataResponseOptions);
    path(): any;
    val(): any;
}
