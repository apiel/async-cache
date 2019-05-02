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

export interface UseAsyncCacheReturn<T = any> {
    call: Call;
    response: T;
    update: Update;
    cache: Cache;
    error: any;
};

export const AsyncCacheContext = createContext({
    call: async (fn: Fn, ...args: any) => '',
    update: async (response: any, fn: Fn, ...args: any) => { },
    cache: (fn: Fn, ...args: any): any => { },
    ...initialState,
});

export function useAsyncCache<T = any>(): UseAsyncCacheReturn<T> {
    const { call, responses, ...rest } = useContext(AsyncCacheContext);
    const [id, setId] = useState();
    const [response, setResponse] = useState();
    const [error, setError] = useState();
    const myCall = async (fn: Fn, ...args: any) => {
        setId(getId(fn, args));
        return call(fn, ...args);
    };
    useEffect(() => {
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
    return { call: myCall, response, error, ...rest };
}

export function useAsyncCacheEffect<T = any>(deps: readonly any[], fn: Fn, ...args: any): UseAsyncCacheReturn<T> & { load: () => Promise<any> };
export function useAsyncCacheEffect<T = any>(fn: Fn, ...args: any): UseAsyncCacheReturn<T> & { load: () => Promise<any> };
export function useAsyncCacheEffect<T = any>(...params: any): UseAsyncCacheReturn<T> & { load: () => Promise<any> } {
    let [deps, fn, ...args] = typeof (params[0]) === 'function' ? [[], ...params] : params;

    const { call, ...rest } = useAsyncCache();
    const load = async () => {
        return call(fn, ...args);
    }
    React.useEffect(() => {
        load();
    }, deps);
    return { load, call, ...rest };
}

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

    call: Call = (fn: Fn, ...args: any) => {
        return this.asyncCache.call(fn, ...args);
    }

    update: Update = (response: any, fn: Fn, ...args: any) => {
        return this.asyncCache.update(response, fn, ...args);
    }

    cache: Cache = (fn: Fn, ...args: any) => {
        return this.asyncCache.cache(fn, ...args);
    }

    render() {
        return (
            <AsyncCacheContext.Provider value={{
                call: this.call,
                responses: this.state.responses,
                update: this.update,
                cache: this.cache,
            }}>
                {this.props.children}
            </AsyncCacheContext.Provider>
        );
    }
}
