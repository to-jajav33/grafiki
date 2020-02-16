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
var GNode_1 = require("./GNode");
var LocalStorage_1 = require("./LocalStorage");
var KEY_PATH_ROOT = '##grafiki##';
var GNodeRoot = /** @class */ (function (_super) {
    __extends(GNodeRoot, _super);
    function GNodeRoot(params) {
        var _this = this;
        var nodeOptions = (params) ? params.nodeOptions : undefined;
        var rootOptions = params ? params.rootOptions || {} : {};
        var localStoragePath = rootOptions.localStoragePath, data = rootOptions.data;
        var isPersistent = !!localStoragePath;
        if (isPersistent && localStoragePath.startsWith('/')) {
            localStoragePath = '.' + localStoragePath;
        }
        else if (isPersistent && !localStoragePath.startsWith('./')) {
            localStoragePath = './' + localStoragePath;
        }
        var localStorageInst = (isPersistent) ? LocalStorage_1.createLocalStorage({ storeFilePath: localStoragePath }) : undefined;
        // load persistent data into the root node if it exists.
        if (isPersistent) {
            var keyPath = KEY_PATH_ROOT + localStoragePath;
            var persistentDataString = localStorageInst.getItem(keyPath);
            if (persistentDataString) {
                var persistentData = JSON.parse(persistentDataString);
                // pass this data to the GNode constructor.
                nodeOptions.data = persistentData.jsonNodes[persistentData.root];
            }
        }
        else if (data) {
            nodeOptions.data = data.jsonNodes[data.root];
        }
        _this = _super.call(this, nodeOptions) || this;
        _this.__localStorage = localStorageInst;
        _this.__localStoragePath = localStoragePath;
        _this.__isPersistent = !!localStoragePath;
        var initJsonNodes = (!isPersistent && data.jsonNodes) ? data.jsonNodes : undefined;
        _this.__initWorldNet(initJsonNodes); // initialize worldnet
        // save this root node to the world net
        _this.__worldNet.jsonNodes[_this.data.nodeId] = _this.data;
        _this.__worldNet.gNodes[_this.data.nodeId] = _this;
        return _this;
    }
    Object.defineProperty(GNodeRoot.prototype, "worldNet", {
        get: function () {
            this.__initWorldNet();
            // Deref the object so it cannot be manipulated by reference.
            return this.__worldNet;
        },
        set: function (val) {
            // only null or undefined will reset the world net
            this.worldNet = val;
        },
        enumerable: true,
        configurable: true
    });
    GNodeRoot.prototype.__initWorldNet = function (paramInitObj) {
        if (!this.__worldNet) {
            this.__worldNet = {
                jsonNodes: paramInitObj ? paramInitObj : {},
                gNodes: {}
            };
            if (this.__isPersistent) {
                var keyPath = KEY_PATH_ROOT + this.__localStoragePath;
                var persistentDataString = this.__localStorage.getItem(keyPath);
                if (persistentDataString) {
                    var persistentData = JSON.parse(persistentDataString);
                    // pass this data to the GNode constructor.
                    this.__worldNet.jsonNodes = persistentData.jsonNodes;
                }
            }
        }
    };
    Object.defineProperty(GNodeRoot.prototype, "isPersistent", {
        get: function () {
            return this.__isPersistent;
        },
        enumerable: true,
        configurable: true
    });
    GNodeRoot.prototype.savePersistentData = function () {
        if (this.isPersistent) {
            var keyPath = KEY_PATH_ROOT + this.__localStoragePath;
            var saveData = { root: this.__data.nodeId, jsonNodes: this.worldNet.jsonNodes };
            this.__localStorage.setItem(keyPath, JSON.stringify(saveData));
        }
    };
    GNodeRoot.prototype.newNode = function (id) {
        var worldNet = this.worldNet; // this initializes worldNet, read only
        var newNode;
        if (typeof id === 'string') {
            id = id;
        }
        else if (id) {
            id = id.nodeId;
        }
        if (typeof id === 'string') {
            newNode = worldNet.gNodes[id];
        }
        if (!newNode) {
            id = id;
            // if there is persistent data, use that
            var data = this.__worldNet.jsonNodes[id];
            // create the new node.
            newNode = new GNode_1.GNode({ root: this, data: data });
        }
        // add it to the world.
        this.__worldNet.jsonNodes[newNode.data.nodeId] = newNode.data;
        this.__worldNet.gNodes[newNode.data.nodeId] = newNode;
        return newNode;
    };
    return GNodeRoot;
}(GNode_1.GNode));
exports.GNodeRoot = GNodeRoot;
//# sourceMappingURL=GNodeRoot.js.map