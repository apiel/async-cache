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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import { getId, AsyncCache, } from 'core-async-cache';
export { getId, AsyncCache, } from 'core-async-cache';
export var asyncCache = new AsyncCache(function (responses, asyncCache) {
    asyncCache.state.responses = __assign({}, asyncCache.state.responses, responses);
});
export function useAsyncCacheWatch(fn) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var id = getId(fn, args);
    var load = function () { return asyncCache.call.apply(asyncCache, __spread([fn], args)); };
    var getResponse = function () { return asyncCache.state.responses[id] && asyncCache.state.responses[id].response; };
    return __assign({ load: load, getResponse: getResponse }, asyncCache);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQ0gsS0FBSyxFQUNMLFVBQVUsR0FNYixNQUFNLGtCQUFrQixDQUFDO0FBRTFCLE9BQU8sRUFDSCxLQUFLLEVBQ0wsVUFBVSxHQU9iLE1BQU0sa0JBQWtCLENBQUM7QUFFMUIsTUFBTSxDQUFDLElBQU0sVUFBVSxHQUFHLElBQUksVUFBVSxDQUNwQyxVQUFDLFNBQW9CLEVBQUUsVUFBdUI7SUFDMUMsVUFBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLGdCQUFRLFVBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFLLFNBQVMsQ0FBQyxDQUFDO0FBQ2xGLENBQUMsQ0FDSixDQUFDO0FBRUYsTUFBTSxVQUFVLGtCQUFrQixDQUFDLEVBQU07SUFBRSxjQUFZO1NBQVosVUFBWSxFQUFaLHFCQUFZLEVBQVosSUFBWTtRQUFaLDZCQUFZOztJQUNuRCxJQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNCLElBQU0sSUFBSSxHQUFHLGNBQU0sT0FBQSxVQUFVLENBQUMsSUFBSSxPQUFmLFVBQVUsWUFBTSxFQUFFLEdBQUssSUFBSSxJQUEzQixDQUE0QixDQUFDO0lBQ2hELElBQU0sV0FBVyxHQUFHLGNBQU0sT0FBQSxVQUFVLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQXpFLENBQXlFLENBQUM7SUFFcEcsa0JBQVMsSUFBSSxNQUFBLEVBQUUsV0FBVyxhQUFBLElBQUssVUFBVSxFQUFHO0FBQ2hELENBQUMifQ==