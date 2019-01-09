"use strict";
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
var Utils_1 = require("./Utils");
var GDataQuery = /** @class */ (function () {
    function GDataQuery() {
        this.__isQuerySuccess = false;
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
    GDataQuery.getQueryInString = function (paramStr) {
        paramStr = paramStr || '()';
        var regExp = /\(([^)]+)\)/;
        var matches = regExp.exec(paramStr) || [];
        var innerStr = matches.length > 1 ? matches[1] : undefined;
        if (!innerStr) {
            innerStr = '{}';
        }
        innerStr.trim();
        var queryObj = Utils_1.Utils.JSON_PARSER.parse(innerStr);
        queryObj = Array.isArray(queryObj) ? Utils_1.Utils.convertArrToObj(queryObj) : queryObj;
        return queryObj;
    };
    Object.defineProperty(GDataQuery.prototype, "isQuerySuccessful", {
        get: function () {
            return this.__isQuerySuccess;
        },
        enumerable: true,
        configurable: true
    });
    GDataQuery.prototype.query = function (paramQueryStr, data) {
        return __awaiter(this, void 0, void 0, function () {
            var queryObj, shouldQueryBranches, keys, keysLength, requestedLength, outBranches, getFirst, finalLen, i, index, branchName, outResult, resultBool, iProp;
            return __generator(this, function (_a) {
                try {
                    this.__isQuerySuccess = false;
                    if (!data) {
                        return [2 /*return*/];
                    }
                    queryObj = GDataQuery.getQueryInString(paramQueryStr);
                    shouldQueryBranches = false;
                    if ((data.value === undefined || data.value === null) && (Object.keys(data.branches).length > 0)) {
                        shouldQueryBranches = true;
                        this.__isQuerySuccess = true;
                    }
                    if (shouldQueryBranches) {
                        keys = void 0;
                        keysLength = void 0;
                        requestedLength = void 0;
                        outBranches = {};
                        getFirst = true;
                        keys = Object.keys(data.branches);
                        keysLength = keys.length;
                        if (queryObj.first === '*') {
                            getFirst = true;
                            requestedLength = keysLength;
                        }
                        else if (queryObj.last === '*') {
                            getFirst = false;
                            keys.reverse();
                            requestedLength = keysLength;
                        }
                        else if (!isNaN(queryObj.last)) {
                            getFirst = false;
                            keys.reverse();
                            requestedLength = Number(queryObj.last);
                            if (requestedLength < 0) {
                                getFirst = true;
                                requestedLength = Math.abs(requestedLength);
                            }
                        }
                        else if (!isNaN(queryObj.first)) {
                            getFirst = true;
                            requestedLength = Number(queryObj.first);
                            if (requestedLength < 0) {
                                getFirst = false;
                                requestedLength = Math.abs(requestedLength);
                            }
                        }
                        else {
                            requestedLength = 0;
                        }
                        finalLen = Math.min(requestedLength, keysLength);
                        for (i = 0; i < finalLen; i++) {
                            index = (getFirst) ? i : (finalLen - 1) - i;
                            branchName = keys[index];
                            outBranches[branchName] = {};
                        }
                        return [2 /*return*/, outBranches];
                    }
                    else {
                        outResult = void 0;
                        resultBool = void 0;
                        if (queryObj.if === undefined) {
                            queryObj.if = { '*': null };
                        }
                        if (queryObj.if) {
                            for (iProp in queryObj.if) {
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
                        return [2 /*return*/, outResult];
                    }
                }
                catch (e) {
                    throw (e);
                }
                return [2 /*return*/];
            });
        });
    };
    return GDataQuery;
}());
exports.GDataQuery = GDataQuery;
