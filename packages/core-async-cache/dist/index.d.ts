export interface Res {
    name: string;
    response: any;
    requestTime: number;
    error: any;
}
export declare type Responses = {
    [id: string]: Res;
};
export declare type Fn = (...args: any) => Promise<any>;
export declare type Update<T = any> = (response: T, fn: Fn) => Promise<void>;
export declare type Call = (fn: Fn) => Promise<string>;
export declare type Cache<T = any> = (fn: Fn) => T;
export interface UseAsyncCacheReturn<T = any> {
    call: Call;
    response: T;
    update: Update;
    cache: Cache;
    error: any;
}
export declare function getId(fn: Fn): string;
export declare class AsyncCache {
    private updateState;
    state: {
        responses: Responses;
    };
    constructor(updateState: (responses: Responses, asyncCache?: AsyncCache) => any);
    call: Call;
    update: Update;
    cache: Cache;
    private setResponse;
    private setRequestTime;
    private setError;
    private isAlreadyRequesting;
}
