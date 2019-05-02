import React from 'react';
import { useAsyncCache } from 'react-async-cache';
import { api } from './mockapi';

export const Counter = () => {
    const { call, response } = useAsyncCache();
    React.useEffect(() => {
        // call api to get current counter value and cache it
        // it will avoid unecessary simultanous call
        call(api, '/counter');
    });
    return (
        <div>
            Counter: { response || 'loading...'}
        </div>
    );
}