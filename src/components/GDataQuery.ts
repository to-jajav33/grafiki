import { IGData } from "./GData"; 
import { Utils } from "./Utils";
import { GNode } from "./GNode";

export class GDataQuery {
	private __isQuerySuccess : boolean = false;

	public static getQueryInString(paramStr : string) {
		paramStr = paramStr || '()';
		let regExp = /\(([^)]+)\)/;
		let matches : Array<any> = regExp.exec(paramStr) || [];
		let innerStr = matches.length > 1 ? matches[1] : undefined;
		if (!innerStr) {
			innerStr = '{}';
		}

		innerStr.trim();
		let queryObj = Utils.JSON_PARSER.parse(innerStr);
		queryObj = Array.isArray(queryObj) ? Utils.convertArrToObj(queryObj) : queryObj;

		return queryObj;
	}

	get isQuerySuccessful() {
		return this.__isQuerySuccess;
	}

	public async query(paramQueryStr : string, data : IGData) : Promise<boolean | undefined | null | number | string | object> {
		try {
			this.__isQuerySuccess = false;
			if (!data) {
				return;
			}
	
			let queryObj = GDataQuery.getQueryInString(paramQueryStr);
			let shouldQueryBranches = false;

			if ((data.value === undefined || data.value === null) && (Object.keys(data.branches).length > 0)) {
				shouldQueryBranches = true;
				this.__isQuerySuccess = true;
			}

			if (shouldQueryBranches) {
				let keys : Array<string>;
				let keysLength : number;
				let requestedLength : number;
				let outBranches : object = {};
				let getFirst = true;

				keys = Object.keys(data.branches);
				keysLength = keys.length;
				if (queryObj.first === '*') {
					getFirst = true;
					requestedLength = keysLength;
				} else if (queryObj.last === '*') {
					getFirst = false;
					keys.reverse();
					requestedLength = keysLength;
				} else if (!isNaN(queryObj.last)) {
					getFirst = false;
					keys.reverse();
					requestedLength = Number(queryObj.last);
					if (requestedLength < 0) {
						getFirst = true;
						requestedLength = Math.abs(requestedLength);
					}
				} else if (!isNaN(queryObj.first)) {
					getFirst = true;
					requestedLength = Number(queryObj.first);
					if (requestedLength < 0) {
						getFirst = false;
						requestedLength = Math.abs(requestedLength);
					}
				} else {
					requestedLength = 0;
				}

				let finalLen = Math.min(requestedLength, keysLength);
				for (let i = 0; i < finalLen; i++) {
					let index = (getFirst) ? i : (finalLen - 1) - i;
					let branchName = keys[index];
					outBranches[branchName] = {};
				}

				return outBranches;
			} else {
				let outResult : undefined | null | number | string | boolean | GNode;
				let resultBool : boolean;

				if (queryObj.if === undefined) {
					queryObj.if = {'*': null};
				}

				if (queryObj.if) {
					for (let iProp in queryObj.if) {
						switch (iProp) {
							case '==':
								resultBool = (queryObj.if[iProp] == data.value);
								break;
							case '>':
								resultBool = (queryObj.if[iProp] > data.value);
								break;
							case '<':
								resultBool = (queryObj.if[iProp] > data.value);
								break;
							case '*':
							case '':
							case undefined:
								resultBool = true;
								break;
						}

						if (!resultBool) {
							break;
						}
					}

					this.__isQuerySuccess = resultBool;
					if (resultBool) {
						outResult = data.value;
					}
				}

				return outResult;
			}
		} catch (e) {
			throw (e);
		}
	}

	// val () {
		/** @todo add no levels when we add queries. Queries will be a parameter that is passed in and determines what to return
		* for now we just need to see the same level values */
		// no levels into branches, must query for each individual branch.
		// ... return just the keys

		// same level branches
		// for (let iPropName in data.branches) {
		// 	outObj[iPropName] = null;
		// }
		// or return just the keys
		// outObj = Object.keys(data.branches);

		// one levels into branches
		// for (let iPropName in data.branches) {
		// 	let branchNodeId = data.branches[iPropName];
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
	// }
}
