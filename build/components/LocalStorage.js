"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// similar to azu's localStorage-ponyfill but without the dependencies.
var mkdirp_1 = require("../functions/mkdirp");
var autoSelectMode = function () {
    var globalAny = global; // to avoid tslin error of localstorage not found in global.
    if (typeof globalAny === "object" && globalAny.localStorage) {
        return "browser";
    }
    else {
        return "node";
    }
};
function createLocalStorage(options) {
    if (options === void 0) { options = {}; }
    var globalAny = global; // to avoid tslin error of localstorage not found in global.
    var mode = options.mode || "auto";
    var actualMode = mode === "auto" ? autoSelectMode() : mode;
    if (actualMode === "browser") {
        return globalAny.localStorage;
    }
    else if (actualMode === "node") {
        var appRoot = './tmp/localStorage/'; // require('app-root-path');
        var path = require("path");
        var LocalStorage = require('node-localstorage').LocalStorage;
        var defaultCacheDir = path.join(appRoot.toString(), ".cache");
        // if (!options.storeFilePath) {
        //     mkDirPSync(defaultCacheDir);
        // }
        var saveFilePath = options.storeFilePath ? path.join(defaultCacheDir, options.storeFilePath) : path.join(defaultCacheDir, "localstorage-ponyfill");
        mkdirp_1.mkDirPSync(saveFilePath);
        return new LocalStorage(saveFilePath);
    }
    throw new Error("Unknown mode:" + actualMode);
}
exports.createLocalStorage = createLocalStorage;
