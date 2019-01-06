import { GNodeRoot } from "./GNodeRoot";
import { GUID_NODES } from "./GUID_NODES";
import { Utils } from "./Utils";
import { GDataResponse, IGDataResponseOptions } from "./GDataResponse";

/**
 * Interface representing the data found in GNode
 *
 * @export
 * @interface IGNodeData
 */
export interface IGNodeData {
	branches: undefined | object,
	nodeId: string,
	value: boolean | null | number | string | undefined | GNode,
	timestamp: number
}

/**
 * Interface representing values passed in at constructor of GNode
 *
 * @export
 * @interface IGNodeOptions
 */
export interface IGNodeOptions {
	root: GNodeRoot,
	data ?: IGNodeData
}

/**
 * Interface representing parameter options passed in for GNode.getData();
 *
 * @interface IRefOptions
 */
interface IRefOptions {
	pathRef ?: object | null | undefined
}

/**
 * Interface representing parameter options passed in for GNode.getData();
 *
 * @interface IGDataOptions
 */
interface IGDataOptions {
	response ?: GDataResponse,
	pathRef ?: object | null | undefined
}

/**
 * Node in the graph system.
 *
 * @export
 * @class GNode
 */
export class GNode {
	protected __options: IGNodeOptions;
	protected __path: Array<string>;
	protected __parentNode: GNode;
	protected __data: IGNodeData;

	get data() {
		return this.__data;
	}

	get nodeId() {
		return this.__data.nodeId;
	}

	get parentNode() {
		return this.__parentNode;
	}

	get path() {
		return (Array.isArray(this.__path)) ? this.__path.concat() : null;
	}

	get root() {
		return this.__options.root;
	}

	constructor(paramOptions: IGNodeOptions) {
		this.__options = paramOptions;

		// add defaults
		this.__data = paramOptions.data || {
			branches: {},
			value: undefined,
			timestamp: Date.now(),
			nodeId: GUID_NODES.key()
		};
	}

	/**
	 * Creates a uid key and wraps the incoming data in it to create a list.
	 *
	 * @param {(Array<object|boolean|GNode|number|null|string>|object|boolean|GNode|number|null|string)} paramData
	 * @returns {Promise<GNode>} returns itself.
	 * @memberof GNode
	 */
	async push(paramData: Array<object | boolean | GNode | number | null | string> | object | boolean | GNode | number | null | string): Promise<GNode> {
		let pushKey: string = GUID_NODES.key();
		let newData: object = {};
		newData[pushKey] = paramData;

		return await this.put(newData)
	}

	/**
	 * 
	 *
	 * @param {(Array<object|boolean|GNode|number|null|string>|object|boolean|GNode|number|null|string)} data
	 * @returns {Promise<GNode>} Returns itself
	 * @memberof GNode
	 */
	async put(paramData: Array<object | boolean | GNode | number | null | string | IGNodeData> | object | boolean | GNode | number | null | string | IGNodeData): Promise<GNode> {
		try {
			let objectArrayData;
			if (paramData && (paramData instanceof GNode)) {
				// passing in a gnode creates an object with a uid and a branch to connect the GNode
				let nodeId = paramData.__data.nodeId;
				objectArrayData = {};
				objectArrayData[nodeId] = nodeId;
			} else if (paramData && (typeof paramData === 'object') || (Array.isArray(paramData))) {
				objectArrayData = paramData;
			}

			let oldState;

			if (objectArrayData && (typeof objectArrayData === 'object') || (Array.isArray(objectArrayData))) {
				// ensure value is an object, so convert arrays to object
				let newObj = Array.isArray(objectArrayData) ? Utils.convertArrToObj(objectArrayData) : objectArrayData;
	
				// use an object to for loop through the keys and create new nodes for only the first level of keys as branches
				// then put the value of the property to the newly generated object. This means empty objects or arrays will
				// create nothing
				for (let iPropName in newObj) {
					let newNode: GNode;
					if (paramData instanceof GNode) {
						newNode = paramData;
					} else if (newObj[iPropName] instanceof GNode) {
						newNode = newObj[iPropName];
					} else if ((paramData as IGNodeData)) {
						// if this an a data object of a GNode, lets create the gnode
						newNode = this.root.newNode(paramData as IGNodeData)
					} else if ((newObj[iPropName] as IGNodeData)) {
						// if this an a data object of a GNode, lets create the gnode
						newNode = this.root.newNode(newObj[iPropName] as IGNodeData)
					} else {
						newNode = this.root.newNode();
					}

					// store old state to compare for later.
					oldState = JSON.stringify(this.__data);

					/** @todo add an even that allows user to cancel write to node,
					 *  or change values like in transactions. */
	
					// now if this isn't a GNode, call put to add the value of the property and let the new node handle what
					// it needs to handle
					if (!(paramData instanceof GNode) && !(newObj[iPropName] instanceof GNode)) {
						await newNode.put(newObj[iPropName]);
					}

					// now that the new value for the node has been saved, create the branch to activate sorting, and have
					// reference to the new node.
					this.__data.branches[iPropName] = newNode.__data.nodeId;
				}
			} else {
				let nonArrayOrObjectVal: boolean | null | number | string | undefined;
				if (paramData === null || paramData === undefined) {
					nonArrayOrObjectVal = undefined;
				} else if (typeof paramData === 'string') {
					nonArrayOrObjectVal = String(paramData);
				} else if (typeof paramData === 'number') {
					nonArrayOrObjectVal = Number(paramData);
				} else if (typeof paramData === 'boolean') {
					nonArrayOrObjectVal = Boolean(paramData);
				} else {
					nonArrayOrObjectVal = undefined;
				}

				// store old state to compare later.
				oldState = JSON.stringify(this.__data);

				/** @todo add an even that allows user to cancel write to node,
				 *  or change values like in transactions. */
	
				this.__data.value = nonArrayOrObjectVal;
			}
	
			// to save on persistent calles, just call if data changes.
			let newState = JSON.stringify(this.__data);
			if (oldState !== newState) {
				this.root.savePersistentData();
			}
	
			return this;
		} catch (e) {
			throw e;
		}
	}

	/**
	 * Get a node reference to a GNode, at a given path.
	 *
	 *
	 * @param {(Array<string>|string)} paramPath Path is relative to this GNode instance
	 * @param {IRefOptions} [options]
	 * @returns {Promise<GNode>} The GNode at given path. New Gnode are created if path does not exist.
	 * @memberof GNode
	 */
	async ref(paramPath: Array<string> | string, options ?: IRefOptions): Promise<GNode> {
		try {
			let currGNode: GNode = this;
			let incomingPathArray = Utils.stringPathToArray(paramPath);

			// go through the path array
			if (incomingPathArray.length > 0) {
				// check if response is being parsed here.
				let {pathRef} = options || {} as IRefOptions;

				const [firstPathName, ...restOfPathsArr] = incomingPathArray;
				let branchName = firstPathName;

				let branchNodeId = currGNode.__data.branches ? currGNode.__data.branches[branchName] : undefined;
				if (!branchNodeId) {
					// if this has branches, it cannot have value
					currGNode.__data.value = undefined;
				}

				let newGNode = this.root.newNode(branchNodeId);

				// add the branch by referencing the branchNode id to the branchName
				currGNode.__data.branches[branchName] = newGNode.nodeId;

				// pathRef tracks the path traveled, only create it if has not been created.
				// will be overwritten by data if data exists in getData()
				if (pathRef && typeof pathRef === 'object') {
					if (!pathRef[branchName]) {
						pathRef[branchName] = {};
					}
				}

				// now have the new node create its own branches according to the length of the path.
				if (restOfPathsArr && restOfPathsArr.length > 0) {
					// pass the pathRef to keep track of the path traveled.
					if (options) {
						options.pathRef = (pathRef && typeof pathRef === 'object') ? pathRef[branchName] : undefined;
					}

					currGNode = await newGNode.ref(restOfPathsArr, options);
				} else {
					currGNode = newGNode;
				}
			}

			return currGNode;
		} catch (e) {
			throw (e);
		}
	}

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
	public async getData(pathLiteal: string | Array<string>) {
		try {
			let pathsArr;
			let data;
			let rootRef;
	
			if ((typeof pathLiteal === 'string') && (pathLiteal.trim().startsWith('{'))) {
				pathsArr = Utils.literalToPathsArr`${pathLiteal}`;
			} else if (typeof pathLiteal === 'string') {
				pathsArr = [[pathLiteal]];
			} else if (pathLiteal === undefined || pathLiteal === null) {
				pathsArr = [['/']];
			} else if (Array.isArray(pathLiteal)) {
				pathsArr = pathLiteal;
			}

			let pathsArrLength = pathsArr.length;

			if (pathsArrLength > 0) {
				rootRef = {};
			}

			for (let iPath = 0; iPath < pathsArrLength; iPath++) {
				let ref;
				let pathStr;
				let lastPath;
				let currPathArr;

				// reset to rootRef to restart the path.
				let pathRef = rootRef;

				// convert the incoming path to an array type path.
				// eslint-disable-next-line
				pathStr = (Array.isArray(pathsArr[iPath])) ? pathsArr[iPath].join('/') : pathsArr[iPath];
				if (pathStr.startsWith('/')) {
					pathStr = pathStr.replace('/', '');
				}
				currPathArr = Utils.stringPathToArray(pathStr);
				// lastPath is used for storing data for GDataResponse
				lastPath = (currPathArr.length > 0) ? currPathArr[currPathArr.length - 1] : undefined;

				// pass in refOptions to ref. This can be done with a for loop here, but more 
				// optimized if we use ref since its already for looping through the paths.
				let refOptions = {pathRef} as IRefOptions;

				// get the last ref, and refOptions.pathRef will change to the second to last path.
				ref = (currPathArr.length > 0) ? await this.ref(currPathArr, refOptions) : this;
				data = await ref.val();

				// if value is a object, lets deref it so we don't actually change it by reference.
				let derefData = (data && typeof data === 'object') ? JSON.parse(JSON.stringify(data)) : data;
				// if requesting for just this node's value, assign the data to pathRef itself.
				if (lastPath) {
					lastPath = Utils.replaceAll(lastPath, '/', '');
				}

				// if there is no last path, this is root.
				if (!lastPath) {
					rootRef = derefData;
				} else {
					refOptions.pathRef[lastPath] = derefData;
				}
			}

			// note, response.val() will return the same as response.path() if pathLiteal is an array.
			// this is to ensure we know which value belongs to which.
			let tempData;
			if (Array.isArray(pathLiteal)) {
				tempData = rootRef;
			} else {
				tempData = data;
			}

			// create the response
			let response = new GDataResponse({pathRef: rootRef, data: tempData} as IGDataResponseOptions);

			return response;
		} catch (e) {
			throw e;
		}
	}

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
	public async val(): Promise<boolean | undefined | null | number | string | object> {
		try {
			if ((this.data.value === undefined || this.data.value === null) && (Object.keys(this.data.branches).length > 0)) {
				let outObj = {};

				/** @todo add no levels when we add queries. Queries will be a parameter that is passed in and determines what to return
				* for now we just need to see the same level values */
				// no levels into branches, must query for each individual branch.
				// ... return just the keys

				// same level branches
				for (let iPropName in this.data.branches) {
					outObj[iPropName] = null;
				}
				// or return just the keys
				// outObj = Object.keys(this.data.branches);

				// one levels into branches
				// for (let iPropName in this.data.branches) {
				// 	let branchNodeId = this.data.branches[iPropName];
				// 	let gNodeToGetValFrom = this.root.worldNet.gNodes[branchNodeId];
				// 	let value;

				// 	// with persistent data, the gnode might not exists yet
				// 	if (!gNodeToGetValFrom) {
				// 		gNodeToGetValFrom = this.root.newNode(branchNodeId);
				// 	}

				// 	// only get values in the first level of the object... going deeper can lead to
				// 	// infinite loops from circular references.
				// 	// null is considered a type object
				// 	value = gNodeToGetValFrom.data.value;
				// 	if ((Object.keys(gNodeToGetValFrom.data.branches).length > 0) && ((value === undefined) || (value === null))) {
				// 		value = JSON.parse(JSON.stringify(gNodeToGetValFrom.data.branches));
				// 	}

				// 	outObj[iPropName] = value;
				// }

				return outObj;
			} else {
				return this.data.value;
			}
		} catch (e) {
			throw e;
		}
	}
}
