"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GDataResponse = /** @class */ (function () {
    function GDataResponse(options) {
        this.__pathRef = options.pathRef || null;
        this.__data = options.data || undefined;
    }
    GDataResponse.prototype.path = function () {
        var outPath;
        if (this.__pathRef && typeof this.__pathRef === 'object') {
            outPath = JSON.parse(JSON.stringify(this.__pathRef));
        }
        else {
            outPath = this.__pathRef;
        }
        return outPath;
    };
    GDataResponse.prototype.val = function () {
        var outVal;
        if (this.__data && typeof this.__data === 'object') {
            outVal = JSON.parse(JSON.stringify(this.__data));
        }
        else {
            outVal = this.__data;
        }
        return outVal;
    };
    return GDataResponse;
}());
exports.GDataResponse = GDataResponse;
//# sourceMappingURL=GDataResponse.js.map