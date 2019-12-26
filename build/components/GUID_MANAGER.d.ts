/**
 * Manager that handles creating singletons for generating keys.
 *
 * @export
 * @class GUID_MANAGER
 */
export declare class GUID_MANAGER {
    private __lastPushTime;
    private __lastRandChars;
    private __PUSH_CHARS;
    private __SINGLETONS;
    constructor(id: any);
    key(): string;
}
