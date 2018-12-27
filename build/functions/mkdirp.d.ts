/// <reference types="node" />
import fs = require('fs');
export interface IMkdirOptions extends fs.MakeDirectoryOptions {
    fs?: any;
}
export declare function mkdirP(p: any, opts: any, f: any, made?: any): void;
export declare function mkDirPSync(p: fs.PathLike, opts?: number | string | IMkdirOptions | null, made?: any): any;
