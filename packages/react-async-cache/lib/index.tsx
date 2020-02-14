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
    call: async (fn: Fn) => '',
    update: async (response: any, fn: Fn) => { },
    cache: (fn: Fn): any => { },
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
    update: (response: T) => Promise<void>;
    cache: () => T;
};

export function useAsyncCache<T = any>(fn: Fn): UseAsyncCacheReturnBound<T> & { responses: Responses };
export function useAsyncCache<T = any>(): UseAsyncCacheReturn<T> & { responses: Responses };
export function useAsyncCache<T = any>(fn?: Fn): (UseAsyncCacheReturn<T> | UseAsyncCacheReturnBound<T>) & { responses: Responses } {
    const asyncCache = useContext(AsyncCacheContext);
    const { call, update, cache, ...rest } = asyncCache;
    return fn ? {
        call: () => call(fn),
        cache: () => cache(fn),
        update: (response: any) => update(response, fn),
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
export function useAsyncCacheWatch<T = any>(fn: Fn): UseAsyncCacheWatchReturn<T> {
    const { responses, ...rest } = useAsyncCache(fn);
    const [response, setResponse] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        const id = getId(fn);
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

export function useAsyncCacheEffect<T = any>(
    fn: Fn,
    deps: any[] = [],
): UseAsyncCacheWatchReturn<T> {
    const { call, ...rest } = useAsyncCacheWatch(fn);
    React.useEffect(() => {
        call();
    }, deps);
    return { call, ...rest };
}
