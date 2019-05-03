import md5 from 'md5';
import Vue from 'vue';

export interface Res {
    name: string;
    args: any;
    response: any;
    requestTime: number;
    error: any;
}

export type Responses = { [id: string]: Res };

export type Fn = (...args: any) => Promise<any>;
export type Update<T = any> = (
    response: T,
    fn: Fn,
    ...args: any
) => Promise<void>;
export type Call = (fn: Fn, ...args: any) => Promise<string>;
export type Cache<T = any> = (fn: Fn, ...args: any) => T;

export interface UseAsyncCacheReturn<T = any> {
    call: Call;
    response: T;
    update: Update;
    cache: Cache;
    error: any;
}

export function getId(fn: Fn, args: any): string {
    return md5(`${fn.name}::${JSON.stringify(args)}`);
}

export class AsyncCache {
    public state: { responses: Responses } = {
        responses: {},
    };

    // constructor(
    //     private updateState: (responses: Responses, asyncCache?: AsyncCache) => any,
    // ) {}

    public setResponse = (
        id: string,
        fn: Fn,
        args: any,
        requestTime: number,
        response: any,
        error: any,
    ) => {
        const { name } = fn;
        const { responses } = this.state;
        responses[id] = { name, args, response, requestTime, error };
        // console.log('setResponse', id, responses[id]);
        this.state.responses = { ...this.state.responses, ...responses};
        console.log('this.state.responses', this.state.responses);
    }

    public call: Call = async (fn: Fn, ...args: any) => {
        // const id = getId(fn, args);
        // const responses = this.state.responses;
        // // const requestTime = await this.setRequestTime(id, fn, args);
        // const requestTime = 0;
        // const response = await fn(...args);
        // // // responses[id] = { name: 'api', args: [ '/yo' ], response: 8, requestTime: 0, error: null };
        // // responses[id] = { name, args, response, requestTime: 0, error: null };
        // // this.state.responses = {
        // //     ...this.state.responses,
        // //     ...responses,
        // // };
        // this.setResponse(id, fn, args, requestTime, response, null);

        const id = getId(fn, args);
        if (!this.isAlreadyRequesting(id)) {
            console.log('call function cause not isAlreadyRequesting');
            const requestTime = await this.setRequestTime(id, fn, args);
            // const requestTime = 0;
            try {
                const response = await fn(...args);
                await this.setResponse(id, fn, args, requestTime, response, null);
            } catch (error) {
                this.setError(id, fn, args, error.toString());
            }
        }
        return id;
    }

    public update: Update = async (response: any, fn: Fn, ...args: any) => {
        const id = getId(fn, args);
        await this.setResponse(id, fn, args, Date.now(), response, null);
    }

    public cache: Cache = (fn: Fn, ...args: any) => {
        const id = getId(fn, args);
        return this.state.responses[id].response;
    }

    private setRequestTime = async (
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

    private setError = (
        id: string,
        fn: Fn,
        args: any,
        error: any,
    ) => {
        const data = this.state.responses[id];
        const response = data ? data.response : null;
        this.setResponse(id, fn, args, data.requestTime, response, error);
    }

    private isAlreadyRequesting = (id: string): boolean => {
        const data = this.state.responses[id];
        return data && (Date.now() - data.requestTime) < 200;
    }
}

export const cache = new AsyncCache();

export function useAsyncCacheWatch(fn: Fn, ...args: any) {
    const id = getId(fn, args);
    const load = () => cache.call(fn, ...args);
    const getResponse = () => cache.state.responses[id] && cache.state.responses[id].response;

    return { load, getResponse };
}
