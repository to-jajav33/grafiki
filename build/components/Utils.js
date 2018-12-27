"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RelaxedJSON_1 = require("./RelaxedJSON");
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Object.defineProperty(Utils, "JSON_PARSER", {
        get: function () {
            if (!Utils.__JSON_PARSER) {
                Utils.__JSON_PARSER = new RelaxedJSON_1.RelaxedJSON();
            }
            return Utils.__JSON_PARSER;
        },
        enumerable: true,
        configurable: true
    });
    Utils.convertArrToObj = function (paramArr, paramOutObj) {
        var o = paramOutObj || {};
        var cur;
        var keys;
        paramArr.forEach(function (a) {
            keys = a.slice(0, a.length - 2);
            cur = o;
            keys.forEach(function (k) {
                if (cur[k] == null) {
                    cur[k] = {};
                }
                cur = cur[k];
            });
            cur[a[a.length - 2]] = a[a.length - 1];
        });
        return o;
    };
    Utils.convertStrToObj = function (str) {
        try {
            if (typeof str === 'string') {
                return Utils.JSON_PARSER.parse(str);
            }
        }
        catch (e) {
            throw (e);
        }
    };
    Utils.__handleCreatePathsIter = function (o, p, result) {
        var keys = Object.keys(o);
        if (keys.length) {
            return keys.forEach(function (k) {
                Utils.__handleCreatePathsIter(o[k], p.concat(k), result);
            });
        }
        result.push(p);
    };
    Utils.handleCreatePaths = function (object) {
        try {
            var result = [];
            Utils.__handleCreatePathsIter(object, [], result);
            return result;
        }
        catch (e) {
            throw (e);
        }
    };
    Utils.literalToPathsArr = function (strings) {
        var listOfExps = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            listOfExps[_i - 1] = arguments[_i];
        }
        try {
            var rawString = '';
            for (var iStr = 0; iStr < strings.length; iStr++) {
                rawString = rawString + strings[iStr];
                // now add the variables passed in
                if (iStr < listOfExps.length) {
                    rawString = rawString + listOfExps[iStr];
                }
            }
            // Strip insignificant whitespace
            // Note that this could do a lot more, such as reorder fields etc.
            // normalize
            rawString = rawString.replace(/[\s,]+/g, ' ').trim();
            var pathsArr = Utils.handleCreatePaths(Utils.convertStrToObj(rawString));
            return pathsArr;
        }
        catch (e) {
            throw (e);
        }
    };
    // basic implementation (pivot is the first element of the array)
    Utils.quicksortBasic = function (array, sortCb) {
        try {
            var length = void 0;
            length = array.length;
            if (length < 2) {
                return array;
            }
            else {
                var isGreater = void 0;
                var pivot = array.splice(0, 1)[0];
                var lesser = [];
                var greater = [];
                for (var i in array) {
                    if (typeof sortCb === 'function') {
                        isGreater = sortCb(pivot, array[i]);
                    }
                    else {
                        isGreater = (array[i] > pivot);
                    }
                    // if its greate push to greater.
                    if (isGreater) {
                        greater.push(array[i]);
                    }
                    else {
                        lesser.push(array[i]);
                    }
                }
                var newArray = Utils.quicksortBasic(lesser, sortCb).concat(pivot, Utils.quicksortBasic(greater, sortCb));
                return newArray;
            }
        }
        catch (e) {
            throw e;
        }
    };
    return Utils;
}());
exports.Utils = Utils;
