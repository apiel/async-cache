import React, { createContext, useContext, useState, useEffect } from 'react';
import md5 from 'md5';

// use something else than JSON.stringify (should we use immutable instead? After request are as frequent than rendering component, so JSON might be fine as well)

interface Res {
    name: string,
    args: any,
    response: any,
    requestTime: number,
    error: any,
}

type Responses = { [id: string]: Res };

const initialState = {
    responses: {} as Responses,
};

export type Fn = (...args: any) => Promise<any>;
export type Update<T = any> = (response: T, fn: Fn, ...args: any) => Promise<void>;
export type Call = (fn: Fn, ...args: any) => Promise<void>;
export type Cache<T = any> = (fn: Fn, ...args: any) => T;

export interface UseAsyncCacheReturn<T = any> {
    call: Call;
    response: T;
    update: Update;
    cache: Cache;
    error: any;
};

export const AsyncCacheContext = createContext({
    call: async (fn: Fn, ...args: any) => { },
    update: async (response: any, fn: Fn, ...args: any) => { },
    cache: (fn: Fn, ...args: any): any => { },
    ...initialState,
});

interface Props {
    children: React.ReactNode
}

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

function getId(fn: Fn, args: any): string {
    return md5(`${fn.name}::${JSON.stringify(args)}`);
}

export class AsyncCacheProvider extends React.Component<Props> {
    state = {
        ...initialState,
    };

    setResponse = (
        id: string,
        fn: Fn,
        args: any,
        requestTime: number,
        response: any,
        error: any,
    ) => {
        return new Promise((resolve) => {
            const { name } = fn;
            const { responses } = this.state;
            responses[id] = { name, args, response, requestTime, error };
            this.setState({ responses }, resolve);
        });
    }

    setRequestTime = async (
        id: string,
        fn: Fn,
        args: any,
    ) => {
        const requestTime = Date.now();
        const data = this.state.responses[id];
        const response = data ? data.response : null;
        await this.setResponse(id, fn, args, requestTime, response, null);
        return requestTime;
    }

    setError = async (
        id: string,
        fn: Fn,
        args: any,
        error: any,
    ) => {
        const data = this.state.responses[id];
        const response = data ? data.response : null;
        await this.setResponse(id, fn, args, data.requestTime, response, error);
    }

    isAlreadyRequesting = (id: string): boolean => {
        const data = this.state.responses[id];
        return data && (Date.now() - data.requestTime) < 200;
    }

    call: Call = async (fn: Fn, ...args: any) => {
        const id = getId(fn, args);
        if (!this.isAlreadyRequesting(id)) {
            const requestTime = await this.setRequestTime(id, fn, args);
            try {
                const response = await fn(...args);
                await this.setResponse(id, fn, args, requestTime, response, null);
            } catch (error) {
                this.setError(id, fn, args, error);
            }
        }
    }

    update: Update = async (response: any, fn: Fn, ...args: any) => {
        const id = getId(fn, args);
        await this.setResponse(id, fn, args, Date.now(), response, null);
    }

    cache: Cache = (fn: Fn, ...args: any) => {
        const id = getId(fn, args);
        return this.state.responses[id].response;
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
