import { RelaxedJSON } from "./RelaxedJSON";
export interface ISortData {
    key: any;
    index: any;
    value: any;
}
export declare class Utils {
    static __JSON_PARSER: RelaxedJSON;
    static readonly JSON_PARSER: RelaxedJSON;
    static convertArrToObj(paramArr: Array<any>, paramOutObj?: object): object;
    static convertStrToObj(str: any): any;
    private static __handleCreatePathsIter;
    static handleCreatePaths(object: any): Array<any>;
    static literalToPathsArr(strings: any, ...listOfExps: any[]): Array<Array<string>>;
    static quicksortBasic(array: Array<any>, sortCb?: Function): any;
}
