# react-async-cache

`react-async-cache` is a library to cache asynchrone function call between different component.
It was initially build to improve cache of api call while using [isomor](https://github.com/apiel/isomor) with react. This library can be especially useful to cache some fetch query, for example using axios. The concept was inspired from Apollo cache, even if it is far from being comparable.

The library take care to save the response of the async function and share it between components using context api. It will also avoid unnecessary call made simultaneously to the same async function. It will identify the cache id base on the name of the function and the parameters passed. So if you call multiple times the same function with different parameters, it will not use the same cache. Example:

api is an async function
```js
export api = async (param1, param2) => ...
```

```js
  call(api, '/counter');
  call(api, '/timer');
```
This 2 call to `api` function will have different cache because they don't share the same parameters.

```js
  call(api, '/counter');
  call(api, '/counter');
```
This 2 call to `api` function will have the same cache and `api` will be called only once.

## Example

See full example at [here](https://github.com/apiel/react-async-cache/tree/master/example).

![counter-example](https://github.com/apiel/react-async-cache/blob/master/media/react-async-cache.gif?raw=true)

counter.js
```jsx
import React from 'react';
import { useAsyncCache } from 'react-async-cache';
import { api } from './mockapi';

export const Counter = () => {
    const { call, response } = useAsyncCache();
    React.useEffect(() => {
        // call api to get current counter value and cache it
        // it will avoid unnecessary simultanous call
        call(api, '/counter');
    });
    return (
        <div>
            Counter: { response || 'loading...'}
        </div>
    );
}
```

app.js
```jsx
import React from 'react';
import { AsyncCacheProvider } from 'react-async-cache';
import { Counter } from './Counter';

const App = () => {
  return (
    <AsyncCacheProvider>
      <Counter />
      <Counter />
    </AsyncCacheProvider>
  );
}
```
In this example, without cache there would have been 2 calls to the api, but using `react-async-cache` there is only 1 call. The library will take care to populate the response to all the components.

## update cache

`react-async-cache` provide as well different way to interact with the cache:

```jsx
import React from 'react';
import { useAsyncCache } from 'react-async-cache';
import { api } from './mockapi';

export const SetCounter = () => {
    const { update, cache } = useAsyncCache();
    const onReset = async () => {
        // Call api to update the counter
        const response = await api('/counter', 'POST', { value: 1 });
        // Update the cache to populate the response to the other component
        await update(response, api, '/counter');
    }
    const onIncrement = async () => {
        // Load count value from cache
        const count = cache(api, '/counter');
        // Call api
        const response = await api('/counter', 'POST', { value: count + 1 });
        // Update cache
        await update(response, api, '/counter');
    }
    return (
        <div>
            <button onClick={onIncrement}>+</button> <button onClick={onReset}>Reset</button>
        </div>
    );
}
```

## How to use it

`react-async-cache` is using the context api to share the state between component. So the first thing to do is to call the context provider in the root of the app:

```tsx
import { AsyncCacheProvider } from 'react-async-cache';

ReactDOM.render((
    <AsyncCacheProvider>
        <App />
    </AsyncCacheProvider>
), document.getElementById('root'));

```

### useAsyncCache

Then use the hook `useAsyncCache` in the components. This hook return an object of 5 properties: `call`, `update`, `response`, `error` and `cache`.

```tsx
import { useAsyncCache } from 'react-async-cache';

export const MyComponent = () => {
    const { call, response, update } = useAsyncCache();
    ...
}
```

`call` is a function that allow to cache the original function call. The first given parameter to `call` is the function you want to cache. The next parameters are the parameters you would have providen to the function you want to cache.

```tsx
async call(fn: (...args: any) => Promise<any>, ...args: any)
```

eg.:
```tsx
await call(getItems);
await call(getItem, 'id-20', { withComment: true });
```

`response` is the response received after the function has been called.

`error` is the error received if the function called failed.

`update` is a function that allow to update the cache without to make a call to the server. The first parameter is the new response you want to set. The second parameter is the cached function. The next parameter are the parameters you would have providen to the cached function.

eg.:

```tsx
await update([
    {id:'id-1', title: 'hello'},
    {id:'id-2', title: 'hello2'},
], getItems);
await update({
    id:'id-1',
    title: 'hello',
    content: 'Lorem ipsum dolor sit amet, ac augue malesuada, tellus amet',
    comments: [],
}, getItem, 'id-20', { withComment: true });
```

`cache` is a function to access the cache. It work the same way as the `call` function, but it will get the `response` from the cache, instead to call the async function.

### useAsyncCacheEffect

`useAsyncCacheEffect` combine `useAsyncCache` with `React.useEffect`. The following code is very recurrent:

```js
    const { call, response } = useAsyncCache();
    const load = async() => {
      await call(someAsyncFunc, someParams);
    }
    React.useEffect(() => {
        load();
    });
```

Therefor `react-async-cache` provide `useAsyncCacheEffect` to simplify it to:

```js
    const { response, load } = useAsyncCacheEffect(someAsyncFunc, someParams);
    // or
    const { response, load } = useAsyncCacheEffect([], someAsyncFunc, someParams); // where [] is the deps from React.useEffect
```
`useAsyncCacheEffect` get the same parameters as `call` function from `useAsyncCache`.

The first given parameter is the function you want to cache. The next parameters are the parameters you would have providen to the function you want to cache.

You can also provide the deps from `React.useEffect` as first parameters, then come the others params.

It will return the same properties as `useAsyncCache` plus the `load` function.


## Use with isomor

https://apiel.github.io/isomor/#/?id=react-async-cache
