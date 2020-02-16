"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GNodeRoot_1 = require("./components/GNodeRoot");
var Grafiki = /** @class */ (function (_super) {
    __extends(Grafiki, _super);
    function Grafiki(paramOptions) {
        if (paramOptions === void 0) { paramOptions = { nodeOptions: { root: undefined } }; }
        var _this = this;
        paramOptions.nodeOptions = paramOptions.nodeOptions || { root: undefined };
        paramOptions.nodeOptions.root = undefined;
        var nodeOptions = paramOptions.nodeOptions, rootOptions = paramOptions.rootOptions;
        _this = _super.call(this, { nodeOptions: nodeOptions, rootOptions: rootOptions }) || this;
        _this.__options.root = _this;
        _this.__grafikiOptions = {
            port: paramOptions.port
        };
        _this.__init();
        return _this;
    }
    Grafiki.prototype.__init = function () {
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
    };
    /**
     * Listern for then server connectss.
     *
     * @private
     * @param {*} paramWs
     * @memberof Grafiki
     */
    Grafiki.prototype.__onConnection = function (paramWs) {
        paramWs.on('message', this.__onMessage);
    };
    /**
     * Listener for when a message is received
     *
     * @private
     * @param {*} paramMessage
     * @memberof Grafiki
     */
    Grafiki.prototype.__onMessage = function (paramMessage) {
        // console.log('received:', paramMessage);
    };
    return Grafiki;
}(GNodeRoot_1.GNodeRoot));
exports.Grafiki = Grafiki;
//# sourceMappingURL=Grafiki.js.map