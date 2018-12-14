// similar to azu's localStorage-ponyfill but without the dependencies.
import {mkDirPSync} from '../functions/mkdirp';

export type LocalStoragePonyfillMode = "browser" | "node" | "memory"

export interface LocalStoragePonyfillOptions {
    // "auto" by default
    mode?: "auto" | LocalStoragePonyfillMode;
    // save file path. that is used in "node" mode
    storeFilePath?: string;
}

export interface ILocalStorage {
    readonly length: number;

    clear(): void;

    getItem(key: string): string | null;

    key(index: number): string | null;

    removeItem(key: string): void;

    setItem(key: string, data: string): void;

    [key: string]: any;

    [index: number]: string;
}

const autoSelectMode = (): LocalStoragePonyfillMode => {
	const globalAny:any = global; // to avoid tslin error of localstorage not found in global.
    if (typeof globalAny === "object" && globalAny.localStorage) {
        return "browser";
    } else {
        return "node";
    }
};

export function createLocalStorage(options: LocalStoragePonyfillOptions = {}): ILocalStorage {
	const globalAny:any = global; // to avoid tslin error of localstorage not found in global.
    const mode = options.mode || "auto";
    const actualMode: LocalStoragePonyfillMode = mode === "auto" ? autoSelectMode() : mode;
    if (actualMode === "browser") {
        return globalAny.localStorage;
    } else if (actualMode === "node") {
        const appRoot = '../tmp/localStorage/'; // require('app-root-path');
        const path = require("path");
        const LocalStorage = require('node-localstorage').LocalStorage;
        const defaultCacheDir = path.join(appRoot.toString(), ".cache");
        if (!options.storeFilePath) {
            mkDirPSync(defaultCacheDir);
        }
        const saveFilePath = options.storeFilePath ? options.storeFilePath : path.join(defaultCacheDir, "localstorage-ponyfill");
        return new LocalStorage(saveFilePath);
	}

    throw new Error("Unknown mode:" + actualMode);
}