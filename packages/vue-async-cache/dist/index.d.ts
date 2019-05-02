import { AsyncCache, Call, Update, Cache } from 'core-async-cache';
export declare const cache: AsyncCache;
export declare class UseAsyncCache {
    state: {
        id: string;
        response: any;
    };
    call: Call;
    update: Update;
    cache: Cache;
    readonly response: import("core-async-cache").Res;
}
