interface IState {
    message: string;
    tolerant: boolean;
    warnings: Array<IWarning> | boolean;
    reviver: Function;
    relaxed: boolean;
    duplicate: boolean;
}
interface IWarning {
    message: string;
    line: number;
}
export declare class RelaxedJSON {
    private __lexer;
    private __strictLexer;
    constructor();
    private __some;
    private __makeLexer;
    private __fStringSingle;
    private __fStringDouble;
    private __fIdentifier;
    private __fComment;
    private __fNumber;
    private __fKeyword;
    private __makeTokenSpecs;
    private __previousNWSToken;
    private __stripTrailingComma;
    transform(text: any): any;
    private __popToken;
    private __strToken;
    private __skipColon;
    private __skipPunctuation;
    private __raiseError;
    private __raiseUnexpected;
    private __checkDuplicates;
    private __appendPair;
    private __parsePair;
    private __parseElement;
    private __parseObject;
    private __parseArray;
    private __parseMany;
    private __endChecks;
    private __parseAny;
    parse(text: any, opts?: IState): any;
    private __stringifyPair;
    stringify(obj: any): any;
}
export default RelaxedJSON;
