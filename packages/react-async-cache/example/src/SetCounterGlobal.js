import React from 'react';
import { useAsyncCache } from 'react-async-cache';
import { api } from './mockapi';

export const SetCounterGlobal = () => {
    // Use global cache
    const { update, cache } = useAsyncCache();
    const onReset = async () => {
        // Call api to update the counter
        const response = await api('/counter', 'POST', { value: 1 });
        // Update the cache to populate the response to the other component
        await update(response, () => api('/counter'));
    }
    const onIncrement = async () => {
        // Load count value from cache
        const count = cache(() => api('/counter'));
        // Call api
        const response = await api('/counter', 'POST', { value: count + 1 });
        // Update cache
        await update(response, () => api('/counter'));
    }
    return (
        <div>
            <button onClick={onIncrement}>+</button> <button onClick={onReset}>Reset</button>
        </div>
    );
}