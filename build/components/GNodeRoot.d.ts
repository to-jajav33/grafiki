import { GNode, IGNodeData, IGNodeOptions } from "./GNode";
export interface IGNodeRootOptions {
    localStoragePath?: string;
    worldData?: IPersistentData;
}
interface IPersistentData {
    root: string;
    jsonNodes: object;
}
interface IGNodeRootParams {
    nodeOptions: IGNodeOptions;
    rootOptions: IGNodeRootOptions;
}
interface IWorldNet {
    jsonNodes: IJsonNode;
    gNodes: undefined | object;
}
interface IJsonNode {
    branches?: object | undefined;
    value?: boolean | null | number | string | undefined;
}
export declare class GNodeRoot extends GNode {
    private __worldNet;
    private __localStorage;
    private __localStoragePath;
    private __isPersistent;
    worldNet: IWorldNet;
    constructor(params: IGNodeRootParams);
    private __initWorldNet;
    readonly isPersistent: boolean;
    savePersistentData(): void;
    newNode(id?: string | IGNodeData): GNode;
}
export {};
