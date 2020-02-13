import {
    getId,
    AsyncCache,
    Responses,
    Fn,
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

export function useAsyncCacheWatch(fn: Fn) {
    const id = getId(fn);
    const call = () => asyncCache.call(fn);
    const update = (response: any) => asyncCache.update(response, fn);
    const cache = () => asyncCache.cache(fn);
    const getResponse = () => asyncCache.state.responses[id] && asyncCache.state.responses[id].response;
    const getError = () => asyncCache.state.responses[id] && asyncCache.state.responses[id].error;

    return { call, update, cache, getResponse, getError, asyncCache };
}