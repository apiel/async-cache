import React from 'react';
import { AsyncCache, Responses, Call, Fn, Update, Cache } from 'core-async-cache';
export { getId, AsyncCache, Responses, Res, Call, Fn, Update, Cache, } from 'core-async-cache';
export interface UseAsyncCacheReturn<T = any> {
    call: Call;
    response: T;
    update: Update;
    cache: Cache;
    error: any;
}
export declare const AsyncCacheContext: React.Context<{
    responses: Responses;
    call: (fn: Fn, ...args: any) => Promise<string>;
    update: (response: any, fn: Fn, ...args: any) => Promise<void>;
    cache: (fn: Fn, ...args: any) => any;
}>;
export declare function useAsyncCache<T = any>(): UseAsyncCacheReturn<T>;
export declare function useAsyncCacheEffect<T = any>(deps: readonly any[], fn: Fn, ...args: any): UseAsyncCacheReturn<T> & {
    load: () => Promise<any>;
};
export declare function useAsyncCacheEffect<T = any>(fn: Fn, ...args: any): UseAsyncCacheReturn<T> & {
    load: () => Promise<any>;
};
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
