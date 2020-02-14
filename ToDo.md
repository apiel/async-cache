- update from useAsyncCacheWatch should not need fn and args
- same with cache

- unit test > to be able to be v1.0.0

--> use
function hello(fn) { console.log('fn', fn.toString()); }
undefined
hello(async() => { console.log('yo')} )
VM478:1 fn async() => { console.log('yo')}
