import { AsyncCache, Fn } from 'core-async-cache';
export { getId, AsyncCache, Responses, Res, Call, Fn, Update, Cache, } from 'core-async-cache';
export declare const asyncCache: AsyncCache;
export declare function useAsyncCacheWatch(fn: Fn): {
    call: () => Promise<string>;
    update: (response: any) => Promise<void>;
    cache: () => any;
    getResponse: () => any;
    getError: () => any;
    asyncCache: AsyncCache;
};
