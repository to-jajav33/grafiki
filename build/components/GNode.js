"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var GUID_NODES_1 = require("./GUID_NODES");
var Utils_1 = require("./Utils");
/**
 * Node in the graph system.
 *
 * @export
 * @class GNode
 */
var GNode = /** @class */ (function () {
    function GNode(paramOptions) {
        this.__options = paramOptions;
        // add defaults
        this.__data = paramOptions.data || {
            branches: {},
            value: undefined,
            timestamp: Date.now(),
            nodeId: GUID_NODES_1.GUID_NODES.key()
        };
    }
    Object.defineProperty(GNode.prototype, "data", {
        get: function () {
            return this.__data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GNode.prototype, "nodeId", {
        get: function () {
            return this.__data.nodeId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GNode.prototype, "parentNode", {
        get: function () {
            return this.__parentNode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GNode.prototype, "path", {
        get: function () {
            return (Array.isArray(this.__path)) ? this.__path.concat() : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GNode.prototype, "root", {
        get: function () {
            return this.__options.root;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates a uid key and wraps the incoming data in it to create a list.
     *
     * @param {(Array<object|boolean|GNode|number|null|string>|object|boolean|GNode|number|null|string)} paramData
     * @returns {Promise<GNode>} returns itself.
     * @memberof GNode
     */
    GNode.prototype.push = function (paramData) {
        return __awaiter(this, void 0, void 0, function () {
            var pushKey, newData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pushKey = GUID_NODES_1.GUID_NODES.key();
                        newData = {};
                        newData[pushKey] = paramData;
                        return [4 /*yield*/, this.put(newData)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     *
     *
     * @param {(Array<object|boolean|GNode|number|null|string>|object|boolean|GNode|number|null|string)} data
     * @returns {Promise<GNode>} Returns itself
     * @memberof GNode
     */
    GNode.prototype.put = function (paramData) {
        return __awaiter(this, void 0, void 0, function () {
            var objectArrayData, nodeId, oldState, newObj, _a, _b, _i, iPropName, newNode, nonArrayOrObjectVal, newState, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 8, , 9]);
                        objectArrayData = void 0;
                        if (paramData && (paramData instanceof GNode)) {
                            nodeId = paramData.__data.nodeId;
                            objectArrayData = {};
                            objectArrayData[nodeId] = nodeId;
                        }
                        else if (paramData && (typeof paramData === 'object') || (Array.isArray(paramData))) {
                            objectArrayData = paramData;
                        }
                        oldState = void 0;
                        if (!(objectArrayData && (typeof objectArrayData === 'object') || (Array.isArray(objectArrayData)))) return [3 /*break*/, 6];
                        newObj = Array.isArray(objectArrayData) ? Utils_1.Utils.convertArrToObj(objectArrayData) : objectArrayData;
                        _a = [];
                        for (_b in newObj)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        iPropName = _a[_i];
                        newNode = void 0;
                        if (paramData instanceof GNode) {
                            newNode = paramData;
                        }
                        else if (newObj[iPropName] instanceof GNode) {
                            newNode = newObj[iPropName];
                        }
                        else if (paramData) {
                            // if this an a data object of a GNode, lets create the gnode
                            newNode = this.root.newNode(paramData);
                        }
                        else if (newObj[iPropName]) {
                            // if this an a data object of a GNode, lets create the gnode
                            newNode = this.root.newNode(newObj[iPropName]);
                        }
                        else {
                            newNode = this.root.newNode();
                        }
                        // store old state to compare for later.
                        oldState = JSON.stringify(this.__data);
                        if (!(!(paramData instanceof GNode) && !(newObj[iPropName] instanceof GNode))) return [3 /*break*/, 3];
                        return [4 /*yield*/, newNode.put(newObj[iPropName])];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        // now that the new value for the node has been saved, create the branch to activate sorting, and have
                        // reference to the new node.
                        this.__data.branches[iPropName] = newNode.__data.nodeId;
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        nonArrayOrObjectVal = void 0;
                        if (paramData === null || paramData === undefined) {
                            nonArrayOrObjectVal = undefined;
                        }
                        else if (typeof paramData === 'string') {
                            nonArrayOrObjectVal = String(paramData);
                        }
                        else if (typeof paramData === 'number') {
                            nonArrayOrObjectVal = Number(paramData);
                        }
                        else if (typeof paramData === 'boolean') {
                            nonArrayOrObjectVal = Boolean(paramData);
                        }
                        else {
                            nonArrayOrObjectVal = undefined;
                        }
                        // store old state to compare later.
                        oldState = JSON.stringify(this.__data);
                        /** @todo add an even that allows user to cancel write to node,
                         *  or change values like in transactions. */
                        this.__data.value = nonArrayOrObjectVal;
                        _c.label = 7;
                    case 7:
                        newState = JSON.stringify(this.__data);
                        if (oldState !== newState) {
                            this.root.savePersistentData();
                        }
                        return [2 /*return*/, this];
                    case 8:
                        e_1 = _c.sent();
                        throw e_1;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get a node reference to a GNode, at a given path.
     *
     *
     * @param {(Array<string>|string)} paramPath Path is relative to this GNode instance
     * @returns {Promise<GNode>} The GNode at given path. New Gnode are created if path does not exist.
     * @memberof GNode
     */
    GNode.prototype.ref = function (paramPath) {
        return __awaiter(this, void 0, void 0, function () {
            var incomingPathArray, currGNode, i, firstPathName, restOfPathsArr, branchName, branchNodeId, newGNode, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        incomingPathArray = Array.isArray(paramPath) ? paramPath.concat() : String(paramPath).split('/');
                        currGNode = this;
                        if (typeof paramPath === 'string') {
                            // string splicing adds a blank string to the first index at times
                            for (i in incomingPathArray) {
                                if (!incomingPathArray[i]) {
                                    incomingPathArray.splice(0, 1);
                                }
                            }
                        }
                        if (!(incomingPathArray.length > 0)) return [3 /*break*/, 3];
                        firstPathName = incomingPathArray[0], restOfPathsArr = incomingPathArray.slice(1);
                        branchName = firstPathName;
                        branchNodeId = currGNode.__data.branches ? currGNode.__data.branches[branchName] : undefined;
                        if (!branchNodeId) {
                            // if this has branches, it cannot have value
                            currGNode.__data.value = undefined;
                        }
                        newGNode = this.root.newNode(branchNodeId);
                        // add the branch by referencing the branchNode id to the branchName
                        currGNode.__data.branches[branchName] = newGNode.nodeId;
                        if (!(restOfPathsArr && restOfPathsArr.length > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, newGNode.ref(restOfPathsArr)];
                    case 1:
                        currGNode = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        currGNode = newGNode;
                        _a.label = 3;
                    case 3: return [2 /*return*/, currGNode];
                    case 4:
                        e_2 = _a.sent();
                        throw (e_2);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get the data from any path starting at this reference.
     * calling getData('/') is the same as calling val()
     *
     * can use template literals as well, ie: getData(`{}`)
     *
     * @param {string} pathLiteal
     * @param {IGetDataOptions} [options]
     * @returns
     * @memberof GNode
     */
    GNode.prototype.getData = function (pathLiteal, options) {
        return __awaiter(this, void 0, void 0, function () {
            var pathsArr, data, iPath, ref, path, _a, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 8, , 9]);
                        pathsArr = void 0;
                        data = void 0;
                        if (pathLiteal.trim().startsWith('{')) {
                            pathsArr = Utils_1.Utils.literalToPathsArr(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", ""], ["", ""])), pathLiteal);
                        }
                        else {
                            pathsArr = [[pathLiteal]];
                        }
                        iPath = 0;
                        _b.label = 1;
                    case 1:
                        if (!(iPath < pathsArr.length)) return [3 /*break*/, 7];
                        ref = void 0;
                        path = void 0;
                        // eslint-disable-next-line
                        pathsArr[iPath] = pathsArr[iPath];
                        path = pathsArr[iPath].join('/');
                        if (path.startsWith('/')) {
                            path = path.replace('/', '');
                        }
                        if (!(path)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.ref(path)];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a = this;
                        _b.label = 4;
                    case 4:
                        ref = _a;
                        return [4 /*yield*/, ref.val()];
                    case 5:
                        data = _b.sent();
                        _b.label = 6;
                    case 6:
                        iPath++;
                        return [3 /*break*/, 1];
                    case 7: return [2 /*return*/, data];
                    case 8:
                        e_3 = _b.sent();
                        throw e_3;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
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
    GNode.prototype.val = function () {
        return __awaiter(this, void 0, void 0, function () {
            var outObj, iPropName, branchNodeId, gNodeToGetValFrom, value;
            return __generator(this, function (_a) {
                try {
                    if ((this.data.value === undefined || this.data.value === null) && (Object.keys(this.data.branches).length > 0)) {
                        outObj = {};
                        for (iPropName in this.data.branches) {
                            branchNodeId = this.data.branches[iPropName];
                            gNodeToGetValFrom = this.root.worldNet.gNodes[branchNodeId];
                            value = void 0;
                            // with persistent data, the gnode might not exists yet
                            if (!gNodeToGetValFrom) {
                                gNodeToGetValFrom = this.root.newNode(branchNodeId);
                            }
                            // only get values in the first level of the object... going deeper can lead to
                            // infinite loops from circular references.
                            // null is considered a type object
                            value = gNodeToGetValFrom.data.value;
                            if ((Object.keys(gNodeToGetValFrom.data.branches).length > 0) && ((value === undefined) || (value === null))) {
                                value = JSON.parse(JSON.stringify(gNodeToGetValFrom.data.branches));
                            }
                            outObj[iPropName] = value;
                        }
                        return [2 /*return*/, outObj];
                    }
                    else {
                        return [2 /*return*/, this.data.value];
                    }
                }
                catch (e) {
                    throw e;
                }
                return [2 /*return*/];
            });
        });
    };
    return GNode;
}());
exports.GNode = GNode;
var templateObject_1;
