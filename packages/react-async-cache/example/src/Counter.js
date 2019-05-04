import React from 'react';
import { useAsyncCacheWatch } from 'react-async-cache';
import { api } from './mockapi';

export const Counter = () => {
    const { call, response } = useAsyncCacheWatch(api, '/counter');

    React.useEffect(() => {
        // call api to get current counter value and cache it
        // it will avoid unecessary simultanous call
        call();
    });
    return (
        <div>
            Counter: { response || 'loading...'}
        </div>
    );
}