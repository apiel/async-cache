import md5 from 'md5';

export interface Res {
    name: string;
    response: any;
    requestTime: number;
    error: any;
}

export type Responses = { [id: string]: Res };

export type Fn = (...args: any) => Promise<any>;
export type Update<T = any> = (
    response: T,
    fn: Fn,
) => Promise<void>;
export type Call = (fn: Fn) => Promise<string>;
export type Cache<T = any> = (fn: Fn) => T;

// should this be removed?
export interface UseAsyncCacheReturn<T = any> {
    call: Call;
    response: T;
    update: Update;
    cache: Cache;
    error: any;
}

export function getId(fn: Fn): string {
    return md5(fn.toString());
}

export class AsyncCache {
    public state: { responses: Responses } = {
        responses: {},
    };

    constructor(
        private updateState: (responses: Responses, asyncCache?: AsyncCache) => any,
    ) { }

    public call: Call = async (fn: Fn) => {
        const id = getId(fn);
        if (!this.isAlreadyRequesting(id)) {
            const requestTime = await this.setRequestTime(id, fn);
            try {
                const response = await fn();
                await this.setResponse(id, fn, requestTime, response, null);
            } catch (error) {
                this.setError(id, fn, error.toString());
            }
        }
        return id;
    }

    public update: Update = async (response: any, fn: Fn) => {
        const id = getId(fn);
        await this.setResponse(id, fn, Date.now(), response, null);
    }

    public cache: Cache = (fn: Fn) => {
        const id = getId(fn);
        return this.state.responses[id] && this.state.responses[id].response;
    }

    private setResponse = (
        id: string,
        fn: Fn,
        requestTime: number,
        response: any,
        error: any,
    ) => {
        const { name } = fn;
        const { responses } = this.state;
        responses[id] = { name, response, requestTime, error };
        // console.log('setResponse', id, responses[id]);
        return this.updateState(responses, this);
    }

    private setRequestTime = async (id: string, fn: Fn) => {
        const requestTime = Date.now();
        const data = this.state.responses[id];
        const response = data ? data.response : null;
        await this.setResponse(id, fn, requestTime, response, null);
        return requestTime;
    }

    private setError = async (
        id: string,
        fn: Fn,
        error: any,
    ) => {
        const data = this.state.responses[id];
        const response = data ? data.response : null;
        await this.setResponse(id, fn, data.requestTime, response, error);
    }

    private isAlreadyRequesting = (id: string): boolean => {
        const data = this.state.responses[id];
        return data && (Date.now() - data.requestTime) < 200;
    }
}
