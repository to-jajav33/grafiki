import { GNodeRoot, IGNodeRootOptions } from "./components/GNodeRoot";
import { IGNodeOptions } from "./components/GNode";
export interface IGrafikiParams {
    port?: number;
    rootOptions?: IGNodeRootOptions;
    nodeOptions?: IGNodeOptions;
}
interface IGrafikiOptions {
    port: number;
}
export declare class Grafiki extends GNodeRoot {
    private __wsServer;
    protected __grafikiOptions: IGrafikiOptions;
    constructor(paramOptions?: IGrafikiParams);
    private __init;
    /**
     * Listern for then server connectss.
     *
     * @private
     * @param {*} paramWs
     * @memberof Grafiki
     */
    private __onConnection;
    /**
     * Listener for when a message is received
     *
     * @private
     * @param {*} paramMessage
     * @memberof Grafiki
     */
    private __onMessage;
}
export {};
