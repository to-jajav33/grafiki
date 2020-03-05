import { Grafiki } from "../src/Grafiki";
import { createLocalStorage } from "../src/components/LocalStorage";
import { GNode } from "../src/components/GNode";

const TEST_PATH_MODES = {
	ROOT: 'ROOT',
	ONE_LEVEL: 'ONE_LEVEL',
	TWO_LEVELS: 'TWO_LEVEL',
	THREE_LEVELS_MULTI_ATTR: 'THREE_LEVEL',
	THREE_LEVELS_SINGLE_ATTR: 'THREE_LEVEL_SINGLE_ATTR'
};

class MyTest {
	constructor() {
	}

	async _addData (paramGNode) {
		let doggyRef : GNode = await paramGNode.ref('/dogs/doggie');
		let jajav33Ref : GNode = await paramGNode.ref('/people/jajav33');

		await doggyRef.put({
			name: 'doggie',
			isAwesome: true,
			age: 18,
			owners: {
				'jajav33': jajav33Ref
			}
		});

		await jajav33Ref.put({
			name: 'jajav33',
			isAwesome: true,
			age: 31,
			pets: {
				'doggie': doggyRef
			},
			'3': 3,
			'1': 7,
			'7': 3,
			'0': 1,
		});

		return {jajav33Ref, doggyRef};
	}

	async runTests() {
		try {
			// let result = await this.testInitGrafiki();
			let result = await this.testInitGrafikiWithData();
			// let result = await this.getInNode();
			// let result = await this.putInNode();

			let useTemplateLiteral : boolean;
			let shouldReturnPath : boolean; // either return path with value, or just value
			let testPathMode : string;

			useTemplateLiteral = false;

			shouldReturnPath = false;

			// testPathMode = TEST_PATH_MODES.ROOT;
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode});
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode, shouldAddQuery: true});
			// testPathMode = TEST_PATH_MODES.ONE_LEVEL;
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode});
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode, shouldAddQuery: true});
			// testPathMode = TEST_PATH_MODES.TWO_LEVELS;
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode});
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode, shouldAddQuery: true});
			// testPathMode = TEST_PATH_MODES.THREE_LEVELS_MULTI_ATTR;
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode});
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode, shouldAddQuery: true});
			// testPathMode = TEST_PATH_MODES.THREE_LEVELS_SINGLE_ATTR;
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode});
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode, shouldAddQuery: true});

			// shouldReturnPath = true;

			// testPathMode = TEST_PATH_MODES.ROOT;
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode});
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode, shouldAddQuery: true});
			// testPathMode = TEST_PATH_MODES.ONE_LEVEL;
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode});
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode, shouldAddQuery: true});
			// testPathMode = TEST_PATH_MODES.TWO_LEVELS;
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode});
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode, shouldAddQuery: true});
			// testPathMode = TEST_PATH_MODES.THREE_LEVELS_MULTI_ATTR;
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode});
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode, shouldAddQuery: true});
			// testPathMode = TEST_PATH_MODES.THREE_LEVELS_SINGLE_ATTR;
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode});
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode, shouldAddQuery: true});

			// useTemplateLiteral = true;

			// shouldReturnPath = false;

			// testPathMode = TEST_PATH_MODES.ROOT;
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode});
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode, shouldAddQuery: true});
			// testPathMode = TEST_PATH_MODES.ONE_LEVEL;
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode});
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode, shouldAddQuery: true});
			// testPathMode = TEST_PATH_MODES.TWO_LEVELS;
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode});
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode, shouldAddQuery: true});
			// testPathMode = TEST_PATH_MODES.THREE_LEVELS_MULTI_ATTR;
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode});
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode, shouldAddQuery: true});
			// testPathMode = TEST_PATH_MODES.THREE_LEVELS_SINGLE_ATTR;
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode});
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode, shouldAddQuery: true});

			// shouldReturnPath = true;

			// testPathMode = TEST_PATH_MODES.ROOT;
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode});
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode, shouldAddQuery: true});
			// testPathMode = TEST_PATH_MODES.ONE_LEVEL;
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode});
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode, shouldAddQuery: true});
			// testPathMode = TEST_PATH_MODES.TWO_LEVELS;
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode});
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode, shouldAddQuery: true});
			// testPathMode = TEST_PATH_MODES.THREE_LEVELS_MULTI_ATTR;
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode});
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode, shouldAddQuery: true});
			// testPathMode = TEST_PATH_MODES.THREE_LEVELS_SINGLE_ATTR;
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode});
			// let result = await this.getDataFromNode({useTemplateLiteral, shouldReturnPath, testPathMode, shouldAddQuery: true});

			// let result = await this.perisistentDataClear();
			// let result = await this.perisistentDataPut();
			// let result = await this.perisistentDataRead(useTemplateLiteral);

			// let result = await this.passArrayIntoRef()

			return result;
		} catch (e) {
			console.group('error')
			console.error(e);
			for (let i in e) {
				console.log(e[i]);
			}
			console.groupEnd()
		}
	}

	async testInitGrafiki() {
		return new Grafiki();
	}

	async testInitGrafikiWithData() {
		return new Grafiki({
			rootOptions : {
				worldData: {
					root: '123',
					jsonNodes: {
						'123': {
							branches: ['456'],
							nodeId: '123',
							value: undefined,
							timestamp: '0192008',
						},
						'456': {
							branches: ['456'],
							nodeId: '123',
							value: 10,
							timestamp: '0192009',
						}
					}
				}
			}
		});
	}

	async getDataFromNode(options) {
		try {
			options = options || {};
			const {useTemplateLiteral, shouldReturnPath, testPathMode, shouldAddQuery} = options;

			let g = new Grafiki();
			let {jajav33Ref} = await this._addData(g);

			let pathQuery;
			switch (testPathMode) {
				case TEST_PATH_MODES.ROOT:
				if (useTemplateLiteral) {
					pathQuery = '{}';
					if (shouldAddQuery) {
						pathQuery = `{
							({first: '*'}): {}
						}`;
					}
				} else {
					pathQuery = '/';
					if (shouldAddQuery) {
						pathQuery = `/({first: '*'})`;
					}
				}
					break;
				case TEST_PATH_MODES.ONE_LEVEL:
					if (useTemplateLiteral) {
						pathQuery = `{
							pets: {}
						}`;
						if (shouldAddQuery) {
							pathQuery = `{
								pets({first: '*'}): {}
							}`;
						}
					} else {
						pathQuery = '/pets';
						if (shouldAddQuery) {
							pathQuery = `/pets({first: '*'})`;
						}
					}
					break;
				case TEST_PATH_MODES.TWO_LEVELS:
					if (useTemplateLiteral) {
						pathQuery = `{
							pets: {
								doggie: {}
							}
						}`;
						if (shouldAddQuery) {
							pathQuery = `{
								pets: {
									doggie({first: '*'}): {}
								}
							}`;
						}
					} else {
						pathQuery = '/pets/doggie';
						if (shouldAddQuery) {
							pathQuery = `/pets/doggie({first: '*'})`;
						}
					}
					break;
				case TEST_PATH_MODES.THREE_LEVELS_MULTI_ATTR:
					if (useTemplateLiteral) {
						pathQuery = `{
							pets: {
								doggie: {
									name: {},
									age: {},
									owners: {}
								}
							}
						}`;
						if (shouldAddQuery) {
							pathQuery = `{
								pets: {
									doggie: {
										name({if: {'==': 'doggie'}}): {},
										age({if: {'>': 1}}): {},
										owners({first: '*'}): {}
									}
								}
							}`;
						}
					} else {
						pathQuery = [
							'/pets/doggie/name',
							'/pets/doggie/age',
							'/pets/doggie/owners'
						];

						if (shouldAddQuery) {
							pathQuery = [
								`/pets/doggie/name({if: {'==': 'doggie'}})`,
								`/pets/doggie/age({if: {'>': 1}})`,
								`/pets/doggie/owners({first: '*'})`
							];
						}
					}
					break;
				case TEST_PATH_MODES.THREE_LEVELS_SINGLE_ATTR:
				default:
					if (useTemplateLiteral) {
						pathQuery = `{
							pets: {
								doggie: {
									age: {}
								}
							}
						}`;
						if (shouldAddQuery) {
							pathQuery = `{
								pets: {
									doggie: {
										age({if: '<': 10}): {}
									}
								}
							}`;
						}
					} else {
						pathQuery = [
							['/pets/doggie/age'],
						];
						if (shouldAddQuery) {
							pathQuery = [
								[`/pets/doggie/age({if: '<': 10})`],
							];
						}
					}
					break;
			}

			let result = await jajav33Ref.getData(pathQuery);
	
			// if you want the entire path with the value from ref use result.path()
			if (shouldReturnPath) {
				return result.path();
			}
			return result.val();
		} catch (e) {
			throw e;
		}
	}

	async getInNode() {
		let g = new Grafiki();
		let newRef = await g.ref('/new/path');

		return newRef;
	}

	async perisistentDataClear () {
		createLocalStorage({storeFilePath: 'persistent/path/to'}).clear();
	}

	async passArrayIntoRef () {
		let g = new Grafiki();

		let result = [];
		result.push(await g.ref(['test']));
		result.push(await g.ref(['test', 'array']));
		result.push(await g.ref(['test', 'array', 'path']));

		return result;
	}

	async perisistentDataPut () {
		let g = new Grafiki({
			// nodeOptions: {root: undefined},
			rootOptions: {localStoragePath: 'persistent/path/to'}
		})
		return await this.putInNode(g);
	}

	async perisistentDataRead (useTemplateLiteral ?: boolean) {
		let g = new Grafiki({
			rootOptions: {localStoragePath: 'persistent/path/to'}
		});

		let jajav33Ref = await g.ref('/people/jajav33');

		// let pathQuery = '/pets';
		let pathQuery = '/';
		if (useTemplateLiteral) {
			pathQuery = `{
				pets: {}
			}`
		}

		let result = await jajav33Ref.getData(pathQuery);

		return result;
	}

	async putInNode(g ?: Grafiki) {
		g = g || new Grafiki();
		let doggyRef = await g.ref('/dogs/doggie');
		let jajav33Ref = await g.ref('/people/jajav33');

		await doggyRef.put({
			name: 'doggie',
			isAwesome: true,
			age: 18,
			owners: {
				'jajav33': jajav33Ref
			}
		});

		await jajav33Ref.put({
			name: 'jajav33',
			isAwesome: true,
			age: 31,
			pets: {
				'doggie': doggyRef
			}
		});

		return [doggyRef, jajav33Ref];
	}

	async pushToNode() {
		let g = new Grafiki();
		let newRef = await g.ref('/new/path');

		return newRef;
	}
}

let test = new MyTest();

test.runTests();
