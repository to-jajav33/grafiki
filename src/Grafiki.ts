
import { GNodeRoot, IGNodeRootOptions } from "./components/GNodeRoot";
import { IGNodeOptions } from "./components/GNode";
// import * as MyWebSocket from 'ws';

export interface IGrafikiParams {
	port ?: number,
	rootOptions ?: IGNodeRootOptions
	nodeOptions ?: IGNodeOptions
}

interface IGrafikiOptions {
	port : number
}


export class Grafiki extends GNodeRoot {
	// private __wsServer : MyWebSocket.Server;
	protected __grafikiOptions : IGrafikiOptions

	constructor (paramOptions : IGrafikiParams = {nodeOptions : {root: undefined}}) {
		paramOptions.nodeOptions = paramOptions.nodeOptions || {root: undefined};
		paramOptions.nodeOptions.root = undefined;
		const {nodeOptions, rootOptions} = paramOptions;

		super({nodeOptions, rootOptions});

		this.__options.root = this;
		this.__grafikiOptions = {
			port: paramOptions.port
		};

		this.__init();
	}

	private __init () {
		// if (this.__wsServer) return;

		// let port : number = this.__grafikiOptions.port;

		// try {
		// 	if (port) {
		// 		this.__onConnection = this.__onConnection.bind(this);
		// 		this.__onMessage = this.__onMessage.bind(this);

		// 		this.__wsServer = new MyWebSocket.Server({port});
	
		// 		this.__wsServer.on('connection', this.__onConnection);
		// 	}
		// } catch (e) {
		// 	return e;
		// }
	}

	/**
	 * Listern for then server connectss.
	 *
	 * @private
	 * @param {*} paramWs
	 * @memberof Grafiki
	 */
	private __onConnection (paramWs) {
		paramWs.on('message', this.__onMessage);
	}

	/**
	 * Listener for when a message is received
	 *
	 * @private
	 * @param {*} paramMessage
	 * @memberof Grafiki
	 */
	private __onMessage (paramMessage) {
		// console.log('received:', paramMessage);
	}
}


