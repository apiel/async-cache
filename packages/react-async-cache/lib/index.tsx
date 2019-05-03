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
    cache: Cache;
};

export function useAsyncCache<T = any>(): UseAsyncCacheReturn<T> & { responses: Responses } {
    return useContext(AsyncCacheContext);
}

export interface UseAsyncCacheWatchReturn<T = any> extends UseAsyncCacheReturn<T> {
    load: () => Promise<string>;
    response: T;
    error: any;
};

// we need to find a way to rerender only if necessary
export function useAsyncCacheWatch<T = any>(fn: Fn, ...args: any): UseAsyncCacheWatchReturn<T> {
    const { call, responses, ...rest } = useAsyncCache<T>();
    const [response, setResponse] = useState();
    const [error, setError] = useState();

    const load = async() => { // can make arrow fn
        return call(fn, ...args);
    }
    useEffect(() => {
        const id = getId(fn, args);
        const storeResponse: Res = responses[id];
        if (storeResponse) {
            if (!response || JSON.stringify(response) !== JSON.stringify(storeResponse.response)) {
                setResponse(storeResponse.response);
            }
            if (!error || JSON.stringify(error) !== JSON.stringify(storeResponse.error)) {
                setError(storeResponse.error);
            }
        }
    }); // , [responses]
    return { load, call, response, error, ...rest };
}

export function useAsyncCacheEffect<T = any>(deps: readonly any[], fn: Fn, ...args: any): UseAsyncCacheWatchReturn<T>;
export function useAsyncCacheEffect<T = any>(fn: Fn, ...args: any): UseAsyncCacheWatchReturn<T>;
export function useAsyncCacheEffect<T = any>(...params: any): UseAsyncCacheWatchReturn<T> {
    let [deps, fn, ...args] = typeof (params[0]) === 'function' ? [[], ...params] : params;

    const { load, ...rest } = useAsyncCacheWatch(fn, ...args);
    React.useEffect(() => {
        load();
    }, deps);
    return { load, ...rest };
}
