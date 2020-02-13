import { AsyncCache, Fn } from 'core-async-cache';
export { getId, AsyncCache, Responses, Res, Call, Fn, Update, Cache, } from 'core-async-cache';
export declare const asyncCache: AsyncCache;
export declare function useAsyncCacheWatch(fn: Fn, ...args: any): {
    call: () => any;
    update: (response: any) => any;
    cache: () => any;
    getResponse: () => any;
    getError: () => any;
    asyncCache: AsyncCache;
};
