import { RelaxedJSON } from "./RelaxedJSON";

export interface ISortData {
	key,
	index,
	value
}

export class Utils {
	static __JSON_PARSER: RelaxedJSON;

	static get JSON_PARSER() {
		if (!Utils.__JSON_PARSER) {
			Utils.__JSON_PARSER = new RelaxedJSON();
		}

		return Utils.__JSON_PARSER;
	}

	static convertArrToObj(paramArr: Array<any>, paramOutObj?: object) {
		let o = paramOutObj || {};
		let cur;
		let keys;

		paramArr.forEach(function (a) {
			keys = a.slice(0, a.length - 2);
			cur = o;

			keys.forEach(function (k) {
				if (cur[k] == null) {
					cur[k] = {};
				}
				cur = cur[k];
			});

			cur[a[a.length - 2]] = a[a.length - 1]
		});

		return o;
	}

	public static convertStrToObj(str) {
		try {
			if (typeof str === 'string') {
				return Utils.JSON_PARSER.parse(str);
			}
		} catch (e) {
			throw (e);
		}
	}

	private static __handleCreatePathsIter(o, p, result) {
		let keys = Object.keys(o);
		if (keys.length) {
			return keys.forEach(function (k) {
				Utils.__handleCreatePathsIter(o[k], p.concat(k), result);
			});
		}
		result.push(p);
	}

	public static handleCreatePaths(object): Array<any> {
		try {
			let result = [];

			Utils.__handleCreatePathsIter(object, [], result);

			return result;
		} catch (e) {
			throw (e);
		}
	}

	public static literalToPathsArr(strings, ...listOfExps): Array<Array<string>> {
		try {
			let rawString = '';

			for (let iStr = 0; iStr < strings.length; iStr++) {
				rawString = rawString + strings[iStr];

				// now add the variables passed in
				if (iStr < listOfExps.length) {
					rawString = rawString + listOfExps[iStr];
				}
			}

			// Strip insignificant whitespace
			// Note that this could do a lot more, such as reorder fields etc.
			// normalize
			rawString = rawString.replace(/[\s]+/g, ' ').trim()

			let pathsArr = Utils.handleCreatePaths(Utils.convertStrToObj(rawString)) as Array<Array<string>>;

			return pathsArr;
		} catch (e) {
			throw (e);
		}
	}

	// basic implementation (pivot is the first element of the array)
	public static quicksortBasic(array: Array<any>, sortCb?: Function) {
		try {
			let length;
			length = array.length;
	
			if (length < 2) {
				return array;
			} else {
				let isGreater;
				let pivot = array.splice(0, 1)[0];
				let lesser = [];
				let greater = [];
		
				for (let i in array) {
					if (typeof sortCb === 'function') {
						isGreater = sortCb(pivot, array[i]);
					} else {
						isGreater = (array[i] > pivot);
					}
		
					// if its greate push to greater.
					if (isGreater) {
						greater.push(array[i]);
					} else {
						lesser.push(array[i]);
					}
				}

				let newArray = Utils.quicksortBasic(lesser, sortCb).concat(pivot, Utils.quicksortBasic(greater, sortCb));
				return newArray;
			}
	
		} catch (e) {
			throw e;
		}
	}

	public static escapeRegExp(str) {
		return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	}

	public static replaceAll (str, find, replace) {
		return str.replace(new RegExp(Utils.escapeRegExp(find), 'g'), replace);
	}

	public static stringPathToArray (paramPath) {
		let incomingPathArray: Array<string> = Array.isArray(paramPath) ? paramPath.concat() : String(paramPath).split('/');

		// string splicing adds a blank string to the first index at times
		for (let i in incomingPathArray) {
			if (!incomingPathArray[i]) {
				incomingPathArray.splice(0, 1);
			}
		}

		return incomingPathArray;
	}
}
