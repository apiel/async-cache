var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
import Vue from 'vue';
import { getId, AsyncCache, } from 'core-async-cache';
export { getId, AsyncCache, } from 'core-async-cache';
export var cache = new AsyncCache(function (responses, asyncCache) {
    Vue.set(asyncCache.state.responses, 'responses', responses);
});
var UseAsyncCache = /** @class */ (function () {
    function UseAsyncCache() {
        var _this = this;
        this.state = {
            id: '',
            response: null,
        };
        this.call = function (fn) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                var id;
                return __generator(this, function (_a) {
                    id = getId(fn, args);
                    Vue.set(this.state, 'id', id);
                    return [2 /*return*/, cache.call.apply(cache, __spread([fn], args))];
                });
            });
        };
        this.update = function (response, fn) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, cache.update.apply(cache, __spread([response, fn], args))];
                });
            });
        };
        this.cache = function (fn) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return cache.cache.apply(cache, __spread([fn], args));
        };
    }
    Object.defineProperty(UseAsyncCache.prototype, "response", {
        get: function () {
            return cache.state.responses[this.state.id];
        },
        enumerable: true,
        configurable: true
    });
    return UseAsyncCache;
}());
export { UseAsyncCache };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEdBQUcsTUFBTSxLQUFLLENBQUM7QUFDdEIsT0FBTyxFQUNILEtBQUssRUFDTCxVQUFVLEdBTWIsTUFBTSxrQkFBa0IsQ0FBQztBQUUxQixPQUFPLEVBQ0gsS0FBSyxFQUNMLFVBQVUsR0FPYixNQUFNLGtCQUFrQixDQUFDO0FBRTFCLE1BQU0sQ0FBQyxJQUFNLEtBQUssR0FBRyxJQUFJLFVBQVUsQ0FDL0IsVUFBQyxTQUFvQixFQUFFLFVBQWtDO0lBQ3JELEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ2pFLENBQUMsQ0FDSixDQUFDO0FBRUY7SUFBQTtRQUFBLGlCQXVCQztRQXRCVSxVQUFLLEdBQWtDO1lBQzFDLEVBQUUsRUFBRSxFQUFFO1lBQ04sUUFBUSxFQUFFLElBQUk7U0FDakIsQ0FBQztRQUVLLFNBQUksR0FBUyxVQUFPLEVBQU07WUFBRSxjQUFZO2lCQUFaLFVBQVksRUFBWixxQkFBWSxFQUFaLElBQVk7Z0JBQVosNkJBQVk7Ozs7O29CQUNyQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDM0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDOUIsc0JBQU8sS0FBSyxDQUFDLElBQUksT0FBVixLQUFLLFlBQU0sRUFBRSxHQUFLLElBQUksSUFBRTs7O1NBQ2xDLENBQUE7UUFFTSxXQUFNLEdBQVcsVUFBTyxRQUFhLEVBQUUsRUFBTTtZQUFFLGNBQVk7aUJBQVosVUFBWSxFQUFaLHFCQUFZLEVBQVosSUFBWTtnQkFBWiw2QkFBWTs7OztvQkFDOUQsc0JBQU8sS0FBSyxDQUFDLE1BQU0sT0FBWixLQUFLLFlBQVEsUUFBUSxFQUFFLEVBQUUsR0FBSyxJQUFJLElBQUU7OztTQUM5QyxDQUFBO1FBRU0sVUFBSyxHQUFVLFVBQUMsRUFBTTtZQUFFLGNBQVk7aUJBQVosVUFBWSxFQUFaLHFCQUFZLEVBQVosSUFBWTtnQkFBWiw2QkFBWTs7WUFDdkMsT0FBTyxLQUFLLENBQUMsS0FBSyxPQUFYLEtBQUssWUFBTyxFQUFFLEdBQUssSUFBSSxHQUFFO1FBQ3BDLENBQUMsQ0FBQTtJQUtMLENBQUM7SUFIRyxzQkFBSSxtQ0FBUTthQUFaO1lBQ0ksT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hELENBQUM7OztPQUFBO0lBQ0wsb0JBQUM7QUFBRCxDQUFDLEFBdkJELElBdUJDIn0=