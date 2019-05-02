import Vue from 'vue';
import {
    getId,
    AsyncCache,
    Responses,
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

export const cache = new AsyncCache(
    (responses: Responses, asyncCache: AsyncCache | undefined) => {
        Vue.set(asyncCache!.state.responses, 'responses', responses);
    },
);

export class UseAsyncCache { // tslint:disable-line
    public state: { id: string, response: any } = {
        id: '',
        response: null,
    };

    public call: Call = async (fn: Fn, ...args: any) => {
        const id = getId(fn, args);
        Vue.set(this.state, 'id', id);
        return cache.call(fn, ...args);
    }

    public update: Update = async (response: any, fn: Fn, ...args: any) => {
        return cache.update(response, fn, ...args);
    }

    public cache: Cache = (fn: Fn, ...args: any) => {
        return cache.cache(fn, ...args);
    }

    get response() {
        return cache.state.responses[this.state.id];
    }
}
