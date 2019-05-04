import {
    getId,
    AsyncCache,
    Responses,
    Call,
    Fn,
    Update,
    Cache,
} from 'core-async-cache';

export {
    getId,
    AsyncCache,
    Responses,
    Res,
    Call,
    Fn,
    Update,
    Cache,
} from 'core-async-cache';

export const asyncCache = new AsyncCache(
    (responses: Responses, asyncCache?: AsyncCache) => {
        asyncCache!.state.responses = { ...asyncCache!.state.responses, ...responses};
    },
);

export function useAsyncCacheWatch(fn: Fn, ...args: any) {
    const id = getId(fn, args);
    const call = () => asyncCache.call(fn, ...args);
    const update = (response: any) => asyncCache.update(response, fn, ...args);
    const cache = () => asyncCache.cache(fn, ...args);
    const getResponse = () => asyncCache.state.responses[id] && asyncCache.state.responses[id].response;
    const getError = () => asyncCache.state.responses[id] && asyncCache.state.responses[id].error;

    return { call, update, cache, getResponse, getError, asyncCache };
}