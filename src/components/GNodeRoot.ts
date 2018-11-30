import { GNode } from "./GNode";

interface IWorldNet {
	jsonNodes : IJsonNode,
	gNodes : undefined | object
}

interface IJsonNode {
	branches ?: object | undefined,
	value ?: boolean | null | number | string | undefined
}

export class GNodeRoot extends GNode {
	private __worldNet : IWorldNet

	public set worldNet (val : IWorldNet) {
		// only null or undefined will reset the world net
		this.worldNet = val;
	}
	public get worldNet () : IWorldNet {
		if (!this.__worldNet) {
			this.__worldNet = {
				jsonNodes: {},
				gNodes: {}
			};
		}

		// Deref the object so it cannot be manipulated by reference.
		return this.__worldNet;
	}

	public newNode (id ?: string) {
		let worldNet = this.worldNet; // this initializes worldNet, read only
		let newNode : GNode = (id) ? worldNet.gNodes[id] : undefined;

		if (!newNode) {
			newNode = new GNode({root: this});
		}

		this.__worldNet.gNodes[newNode.nodeId] = newNode;
		this.__worldNet.jsonNodes[newNode.nodeId] = newNode.data;

		return newNode;
	}
}
