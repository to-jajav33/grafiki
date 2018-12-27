/** Based on the Hypothetical Amnesia Machine thought experiment {@link https://github.com/amark/gun/blob/master/src/HAM.js} */
export declare function ham(machineState: any, incomingState: any, currentState: any, incomingValue: any, currentValue: any): {
    defer: boolean;
    historical?: undefined;
    converge?: undefined;
    incoming?: undefined;
    state?: undefined;
    current?: undefined;
    err?: undefined;
} | {
    historical: boolean;
    defer?: undefined;
    converge?: undefined;
    incoming?: undefined;
    state?: undefined;
    current?: undefined;
    err?: undefined;
} | {
    converge: boolean;
    incoming: boolean;
    defer?: undefined;
    historical?: undefined;
    state?: undefined;
    current?: undefined;
    err?: undefined;
} | {
    state: boolean;
    defer?: undefined;
    historical?: undefined;
    converge?: undefined;
    incoming?: undefined;
    current?: undefined;
    err?: undefined;
} | {
    converge: boolean;
    current: boolean;
    defer?: undefined;
    historical?: undefined;
    incoming?: undefined;
    state?: undefined;
    err?: undefined;
} | {
    err: string;
    defer?: undefined;
    historical?: undefined;
    converge?: undefined;
    incoming?: undefined;
    state?: undefined;
    current?: undefined;
};
