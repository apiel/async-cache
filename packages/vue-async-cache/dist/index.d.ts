import { AsyncCache, Responses, Call, Fn, Update, Cache } from 'core-async-cache';
export { getId, AsyncCache, Responses, Res, Call, Fn, Update, Cache, } from 'core-async-cache';
export declare const asyncCache: AsyncCache;
export declare function useAsyncCacheWatch(fn: Fn, ...args: any): {
    state: {
        responses: Responses;
    };
    call: Call;
    update: Update<any>;
    cache: Cache<any>;
    load: () => Promise<string>;
    getResponse: () => any;
    getError: () => any;
};
