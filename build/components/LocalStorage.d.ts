export declare type LocalStoragePonyfillMode = "browser" | "node" | "memory";
export interface LocalStoragePonyfillOptions {
    mode?: "auto" | LocalStoragePonyfillMode;
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
export declare function createLocalStorage(options?: LocalStoragePonyfillOptions): ILocalStorage;
