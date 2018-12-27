"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GUID_MANAGER_1 = require("./GUID_MANAGER");
/**
 * Singleton used to generate uids for nodes.
 *
 * @export
 * @class GUID_NODES
 */
var GUID_NODES = /** @class */ (function () {
    function GUID_NODES() {
    }
    Object.defineProperty(GUID_NODES, "__MANAGER", {
        get: function () {
            if (!GUID_NODES.__manager)
                GUID_NODES.__manager = new GUID_MANAGER_1.GUID_MANAGER('GUID_NODES');
            return GUID_NODES.__manager;
        },
        enumerable: true,
        configurable: true
    });
    GUID_NODES.key = function () {
        return GUID_NODES.__MANAGER.key();
    };
    return GUID_NODES;
}());
exports.GUID_NODES = GUID_NODES;
