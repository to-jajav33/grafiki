import { GNodeRoot } from "./GNodeRoot";
import { GDataResponse } from "./GDataResponse";
/**
 * Interface representing the data found in GNode
 *
 * @export
 * @interface IGNodeData
 */
export interface IGNodeData {
    branches: undefined | object;
    nodeId: string;
    value: boolean | null | number | string | undefined | GNode;
    timestamp: number;
}
/**
 * Interface representing values passed in at constructor of GNode
 *
 * @export
 * @interface IGNodeOptions
 */
export interface IGNodeOptions {
    root: GNodeRoot;
    data?: IGNodeData;
}
/**
 * Interface representing parameter options passed in for GNode.getData();
 *
 * @interface IRefOptions
 */
interface IRefOptions {
    pathRef?: object | null | undefined;
}
/**
 * Node in the graph system.
 *
 * @export
 * @class GNode
 */
export declare class GNode {
    protected __options: IGNodeOptions;
    protected __path: Array<string>;
    protected __parentNode: GNode;
    protected __data: IGNodeData;
    readonly data: IGNodeData;
    readonly nodeId: string;
    readonly parentNode: GNode;
    readonly path: string[];
    readonly root: GNodeRoot;
    constructor(paramOptions: IGNodeOptions);
    /**
     * Creates a uid key and wraps the incoming data in it to create a list.
     *
     * @param {(Array<object|boolean|GNode|number|null|string>|object|boolean|GNode|number|null|string)} paramData
     * @returns {Promise<GNode>} returns itself.
     * @memberof GNode
     */
    push(paramData: Array<object | boolean | GNode | number | null | string> | object | boolean | GNode | number | null | string): Promise<GNode>;
    /**
     *
     *
     * @param {(Array<object|boolean|GNode|number|null|string>|object|boolean|GNode|number|null|string)} data
     * @returns {Promise<GNode>} Returns itself
     * @memberof GNode
     */
    put(paramData: Array<object | boolean | GNode | number | null | string | IGNodeData> | object | boolean | GNode | number | null | string | IGNodeData): Promise<GNode>;
    /**
     * Get a node reference to a GNode, at a given path.
     *
     *
     * @param {(Array<string>|string)} paramPath Path is relative to this GNode instance
     * @param {IRefOptions} [options]
     * @returns {Promise<GNode>} The GNode at given path. New Gnode are created if path does not exist.
     * @memberof GNode
     */
    ref(paramPath: Array<string> | string, options?: IRefOptions): Promise<GNode>;
    /**
     * Get the data from any path starting at this reference.
     * calling getData('/') is the same as calling val()
     *
     * can use template literals as well, ie: getData(`{}`)
     *
     * @param {string} pathLiteal
     * @returns
     * @memberof GNode
     */
    getData(pathLiteal: string | Array<string>): Promise<GDataResponse>;
    /**
     * Get the value of a node.data.value or node.data.branches[i] if there is no value for the node.
     * If the branches does not have a value defined, it will return
     *
     * Return value priority explained:
     *  1. If there is a value, return the value.
     *  2. Else, if there are branches, return value for branches.
     * 		- Branches without values will return gnode object entire data value.
     *  3. If there are no branches and no values, returns undefined/null.
     *
     * @returns {Promise<boolean|undefined|null|number|string|object>}
     * @memberof GNode
     */
    val(paramQueryStr?: string): Promise<boolean | undefined | null | number | string | object>;
}
export {};
