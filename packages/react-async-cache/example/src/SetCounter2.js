import React from 'react';
import { useAsyncCache } from 'react-async-cache';
import { api } from './mockapi';

export const SetCounter2 = () => {
    const { update, cache } = useAsyncCache(() => api('/counter2'));
    const onReset = async () => {
        // Call api to update the counter
        const response = await api('/counter2', 'POST', { value: 10 });
        // Update the cache to populate the response to the other component
        await update(response);
    }
    const onIncrement = async () => {
        // Load count value from cache
        const count = cache();
        // Call api
        const response = await api('/counter2', 'POST', { value: count + 10 });
        // Update cache
        await update(response);
    }
    return (
        <div>
            <button onClick={onIncrement}>+</button> <button onClick={onReset}>Reset</button>
        </div>
    );
}