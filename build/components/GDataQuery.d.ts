import { IGData } from "./GData";
export declare class GDataQuery {
    private __isQuerySuccess;
    static getQueryInString(paramStr: string): any;
    readonly isQuerySuccessful: boolean;
    query(paramQueryStr: string, data: IGData): Promise<boolean | undefined | null | number | string | object>;
}
