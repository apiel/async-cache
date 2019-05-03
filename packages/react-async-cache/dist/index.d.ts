import React from 'react';
import { AsyncCache, Responses, Call, Fn, Update, Cache } from 'core-async-cache';
export { getId, AsyncCache, Responses, Res, Call, Fn, Update, Cache, } from 'core-async-cache';
export declare const AsyncCacheContext: React.Context<{
    responses: Responses;
    call: (fn: Fn, ...args: any) => Promise<string>;
    update: (response: any, fn: Fn, ...args: any) => Promise<void>;
    cache: (fn: Fn, ...args: any) => any;
}>;
interface Props {
    children: React.ReactNode;
}
export declare class AsyncCacheProvider extends React.Component<Props> {
    state: {
        responses: Responses;
    };
    asyncCache: AsyncCache;
    constructor(props: Props);
    render(): JSX.Element;
}
export interface UseAsyncCacheReturn<T = any> {
    call: Call;
    update: Update;
    cache: Cache;
}
export declare function useAsyncCache<T = any>(): UseAsyncCacheReturn<T> & {
    responses: Responses;
};
export interface UseAsyncCacheWatchReturn<T = any> extends UseAsyncCacheReturn<T> {
    load: () => Promise<string>;
    response: T;
    error: any;
}
export declare function useAsyncCacheWatch<T = any>(fn: Fn, ...args: any): UseAsyncCacheWatchReturn<T>;
export declare function useAsyncCacheEffect<T = any>(deps: readonly any[], fn: Fn, ...args: any): UseAsyncCacheWatchReturn<T>;
export declare function useAsyncCacheEffect<T = any>(fn: Fn, ...args: any): UseAsyncCacheWatchReturn<T>;
