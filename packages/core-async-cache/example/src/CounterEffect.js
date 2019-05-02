import React from 'react';
import { useAsyncCacheEffect } from 'react-async-cache';
import { api } from './mockapi';

export const CounterEffect = () => {
    const { response } = useAsyncCacheEffect(api, '/counter');
    return (
        <div>
            Counter using useAsyncCacheEffect: { response || 'loading...'}
        </div>
    );
}