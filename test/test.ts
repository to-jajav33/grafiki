import { Grafiki } from "../src/Grafiki";

class MyTest {
	constructor() {
	}

	async runTests() {
		try {
			// let result = await this.testInitGrafiki();
			// let result = await this.getInNode();
			// let result = await this.putInNode();
			// let result = await this.getDataFromNode();

			// let useTemplateLiteral = true;
			// let result = await this.getDataFromNode(useTemplateLiteral);

			// let result = await this.perisistentDataPut();
			let result = await this.perisistentDataRead(useTemplateLiteral);
			// let result = await this.perisistentDataClear();

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

	async getDataFromNode(useTemplateLiteral?: boolean) {
		try {

			let g = new Grafiki();
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
				},
				'3': 3,
				'1': 7,
				'7': 3,
				'0': 1,
			});
	
			// let pathQuery = '/pets';
			let pathQuery = '/';
			if (useTemplateLiteral) {
				pathQuery = `{
					pets: {}
				}`
			}
	
			let result = await jajav33Ref.getData(pathQuery);
	
			return result;
		} catch (e) {
			throw e;
		}
	}

	async getInNode() {
		let g = new Grafiki();
		let newRef = await g.ref('/new/path');

		return newRef;
	}

	async perisistentDataPut () {
		let g = new Grafiki({
			// nodeOptions: {root: undefined},
			rootOptions: {localStoragePath: 'persistent/path/to'}
		})
		return await this.putInNode(g);
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
