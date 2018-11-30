import { GUID_MANAGER } from "./GUID_MANAGER";

/**
 * Singleton used to generate uids for nodes.
 *
 * @export
 * @class GUID_NODES
 */
export class GUID_NODES {
	private static __manager : GUID_MANAGER;

	private static get __MANAGER () : GUID_MANAGER {
		if (!GUID_NODES.__manager) GUID_NODES.__manager = new GUID_MANAGER('GUID_NODES');
		return GUID_NODES.__manager;
	}

	static key () {
		return GUID_NODES.__MANAGER.key();
	}
}
