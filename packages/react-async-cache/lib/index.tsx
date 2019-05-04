import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    getId,
    AsyncCache,
    Responses,
    Res,
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

const initialState = {
    responses: {} as Responses,
};

export const AsyncCacheContext = createContext({
    call: async (fn: Fn, ...args: any) => '',
    update: async (response: any, fn: Fn, ...args: any) => { },
    cache: (fn: Fn, ...args: any): any => { },
    ...initialState,
});

interface Props {
    children: React.ReactNode
}

export class AsyncCacheProvider extends React.Component<Props> {
    state = {
        ...initialState,
    };

    asyncCache: AsyncCache;

    constructor(props: Props) {
        super(props);
        this.asyncCache = new AsyncCache(
            (responses: Responses) => {
                return new Promise((resolve) => {
                    this.setState({ responses }, resolve);
                });
            },
        );
    }

    render() {
        return (
            <AsyncCacheContext.Provider value={{
                responses: this.state.responses,
                ...this.asyncCache,
            }}>
                {this.props.children}
            </AsyncCacheContext.Provider>
        );
    }
}

export interface UseAsyncCacheReturn<T = any> {
    call: Call;
    update: Update;
    cache: Cache<T>;
};

export interface UseAsyncCacheReturnBound<T = any> {
    call: () => Promise<string>;
    update: (response: any) => Promise<void>;
    cache: () => T;
};

export function useAsyncCache<T = any>(fn: Fn, ...args: any): UseAsyncCacheReturnBound<T> & { responses: Responses };
export function useAsyncCache<T = any>(): UseAsyncCacheReturn<T> & { responses: Responses };
export function useAsyncCache<T = any>(fn?: Fn, ...args: any): (UseAsyncCacheReturn<T> | UseAsyncCacheReturnBound<T>) & { responses: Responses } {
    const asyncCache = useContext(AsyncCacheContext);
    const { call, update, cache, ...rest } = asyncCache;
    return fn ? {
        call: () => call(fn, ...args),
        cache: () => cache(fn, ...args),
        update: (response: any) => update(response, fn, ...args),
        ...rest,
    } : asyncCache;
}

export interface UseAsyncCacheWatchReturn<T = any> {
    call: () => Promise<string>;
    update: (response: any) => Promise<void>;
    cache: () => T;
    response: T;
    error: any;
};

// we need to find a way to rerender only if necessary
export function useAsyncCacheWatch<T = any>(fn: Fn, ...args: any): UseAsyncCacheWatchReturn<T> {
    const { responses, ...rest } = useAsyncCache(fn, ...args);
    const [response, setResponse] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        const id = getId(fn, args);
        const storeResponse: Res = responses[id];
        if (storeResponse) {
            // use something else than JSON.stringify (should we use immutable instead? After request are as frequent than rendering component, so JSON might be fine as well)
            if (!response || JSON.stringify(response) !== JSON.stringify(storeResponse.response)) {
                setResponse(storeResponse.response);
            }
            if (!error || JSON.stringify(error) !== JSON.stringify(storeResponse.error)) {
                setError(storeResponse.error);
            }
        }
    }); // , [responses]
    return {
        response,
        error,
        ...rest,
    };
}

export function useAsyncCacheEffect<T = any>(deps: readonly any[], fn: Fn, ...args: any): UseAsyncCacheWatchReturn<T>;
export function useAsyncCacheEffect<T = any>(fn: Fn, ...args: any): UseAsyncCacheWatchReturn<T>;
export function useAsyncCacheEffect<T = any>(...params: any): UseAsyncCacheWatchReturn<T> {
    let [deps, fn, ...args] = typeof (params[0]) === 'function' ? [[], ...params] : params;

    const { call, ...rest } = useAsyncCacheWatch(fn, ...args);
    React.useEffect(() => {
        call();
    }, deps);
    return { call, ...rest };
}
