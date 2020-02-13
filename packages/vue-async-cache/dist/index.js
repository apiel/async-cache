var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { getId, AsyncCache, } from 'core-async-cache';
export { getId, AsyncCache, } from 'core-async-cache';
export var asyncCache = new AsyncCache(function (responses, asyncCache) {
    asyncCache.state.responses = __assign({}, asyncCache.state.responses, responses);
});
export function useAsyncCacheWatch(fn) {
    var id = getId(fn);
    var call = function () { return asyncCache.call(fn); };
    var update = function (response) { return asyncCache.update(response, fn); };
    var cache = function () { return asyncCache.cache(fn); };
    var getResponse = function () { return asyncCache.state.responses[id] && asyncCache.state.responses[id].response; };
    var getError = function () { return asyncCache.state.responses[id] && asyncCache.state.responses[id].error; };
    return { call: call, update: update, cache: cache, getResponse: getResponse, getError: getError, asyncCache: asyncCache };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUNILEtBQUssRUFDTCxVQUFVLEdBR2IsTUFBTSxrQkFBa0IsQ0FBQztBQUUxQixPQUFPLEVBQ0gsS0FBSyxFQUNMLFVBQVUsR0FPYixNQUFNLGtCQUFrQixDQUFDO0FBRTFCLE1BQU0sQ0FBQyxJQUFNLFVBQVUsR0FBRyxJQUFJLFVBQVUsQ0FDcEMsVUFBQyxTQUFvQixFQUFFLFVBQXVCO0lBQzFDLFVBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxnQkFBUSxVQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBSyxTQUFTLENBQUMsQ0FBQztBQUNsRixDQUFDLENBQ0osQ0FBQztBQUVGLE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxFQUFNO0lBQ3JDLElBQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQixJQUFNLElBQUksR0FBRyxjQUFNLE9BQUEsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBbkIsQ0FBbUIsQ0FBQztJQUN2QyxJQUFNLE1BQU0sR0FBRyxVQUFDLFFBQWEsSUFBSyxPQUFBLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUEvQixDQUErQixDQUFDO0lBQ2xFLElBQU0sS0FBSyxHQUFHLGNBQU0sT0FBQSxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFwQixDQUFvQixDQUFDO0lBQ3pDLElBQU0sV0FBVyxHQUFHLGNBQU0sT0FBQSxVQUFVLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQXpFLENBQXlFLENBQUM7SUFDcEcsSUFBTSxRQUFRLEdBQUcsY0FBTSxPQUFBLFVBQVUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBdEUsQ0FBc0UsQ0FBQztJQUU5RixPQUFPLEVBQUUsSUFBSSxNQUFBLEVBQUUsTUFBTSxRQUFBLEVBQUUsS0FBSyxPQUFBLEVBQUUsV0FBVyxhQUFBLEVBQUUsUUFBUSxVQUFBLEVBQUUsVUFBVSxZQUFBLEVBQUUsQ0FBQztBQUN0RSxDQUFDIn0=