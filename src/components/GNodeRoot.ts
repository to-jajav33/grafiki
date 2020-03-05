import { GNode, IGNodeData, IGNodeOptions } from "./GNode";
import { createLocalStorage, ILocalStorage } from "./LocalStorage";

const KEY_PATH_ROOT = '##grafiki##';

export interface IGNodeRootOptions {
	localStoragePath ?: string,
	worldData ?: IPersistentData
}

interface IPersistentData {
	root: string,
	jsonNodes: object
}

interface IGNodeRootParams {
	nodeOptions : IGNodeOptions
	rootOptions : IGNodeRootOptions
}

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
	private __localStorage : ILocalStorage
	private __localStoragePath : string
	private __isPersistent : boolean

	public set worldNet (val : IWorldNet) {
		// only null or undefined will reset the world net
		this.worldNet = val;
	}
	public get worldNet () : IWorldNet {
		this.__initWorldNet();

		// Deref the object so it cannot be manipulated by reference.
		return this.__worldNet;
	}

	constructor (params : IGNodeRootParams) {
		const nodeOptions : IGNodeOptions = (params) ? params.nodeOptions : undefined;
		const rootOptions : IGNodeRootOptions = params ? params.rootOptions || {} as IGNodeRootOptions : {} as IGNodeRootOptions;
		let {localStoragePath, worldData} = rootOptions;

		const isPersistent = !!localStoragePath;
		if (isPersistent && localStoragePath.startsWith('/')) {
			localStoragePath = '.' + localStoragePath;
		} else if (isPersistent && !localStoragePath.startsWith('./')) {
			localStoragePath = './' + localStoragePath;
		}

		const localStorageInst = (isPersistent) ? createLocalStorage({storeFilePath: localStoragePath}) : undefined;

		// load persistent data into the root node if it exists.
		if (isPersistent) {
			let keyPath = KEY_PATH_ROOT + localStoragePath;
			let persistentDataString : string = localStorageInst.getItem(keyPath);
			if (persistentDataString) {
				let persistentData = JSON.parse(persistentDataString) as IPersistentData;

				// pass this data to the GNode constructor.
				nodeOptions.data = persistentData.jsonNodes[persistentData.root];
			}
		} else if (worldData && worldData.jsonNodes && worldData.root) {
			nodeOptions.data = worldData.jsonNodes[worldData.root];
		}

		super(nodeOptions);

		this.__localStorage = localStorageInst;
		this.__localStoragePath = localStoragePath;
		this.__isPersistent = !!localStoragePath;

		let initJsonNodes = (!isPersistent && worldData && worldData.jsonNodes) ? worldData.jsonNodes : undefined;
		this.__initWorldNet(initJsonNodes); // initialize worldnet

		// save this root node to the world net
		this.__worldNet.jsonNodes[this.data.nodeId] = this.data;
		this.__worldNet.gNodes[this.data.nodeId] = this;
	}

	private __initWorldNet (paramInitObj ?: object) {
		if (!this.__worldNet) {
			this.__worldNet = {
				jsonNodes: paramInitObj ? paramInitObj : {},
				gNodes: {}
			};

			if (this.__isPersistent) {
				let keyPath = KEY_PATH_ROOT + this.__localStoragePath;
				let persistentDataString : string = this.__localStorage.getItem(keyPath);
				if (persistentDataString) {
					let persistentData = JSON.parse(persistentDataString) as IPersistentData;

					// pass this data to the GNode constructor.
					this.__worldNet.jsonNodes = persistentData.jsonNodes;
				}
			}
		}
	}

	get isPersistent () : boolean {
		return this.__isPersistent;
	}

	savePersistentData () {
		if (this.isPersistent) {
			let keyPath = KEY_PATH_ROOT + this.__localStoragePath;
			let saveData = {root: this.__data.nodeId, jsonNodes: this.worldNet.jsonNodes}
			this.__localStorage.setItem(keyPath, JSON.stringify(saveData));
		}
	}

	public newNode (id ?: string | IGNodeData) {
		let worldNet = this.worldNet; // this initializes worldNet, read only
		let newNode : GNode;

		if (typeof id === 'string') {
			id = id;
		} else if (id as IGNodeData) {
			id = id.nodeId;
		}
		
		if (typeof id === 'string') {
			newNode = worldNet.gNodes[id];
		}

		if (!newNode) {
			id = id as string;
			// if there is persistent data, use that
			let data = this.__worldNet.jsonNodes[id];

			// create the new node.
			newNode = new GNode({root: this, data});
		}

		// add it to the world.
		this.__worldNet.jsonNodes[newNode.data.nodeId] = newNode.data;
		this.__worldNet.gNodes[newNode.data.nodeId] = newNode;

		return newNode;
	}
}
