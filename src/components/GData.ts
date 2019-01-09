import { GNode } from "./GNode";

/**
 * Interface representing the data found in GNode
 *
 * @export
 * @interface IGData
 */
export interface IGData {
	branches: undefined | object,
	nodeId: string,
	value: boolean | null | number | string | undefined | GNode,
	timestamp: number
}

export class GData {
	constructor (data : IGData) {}
}
