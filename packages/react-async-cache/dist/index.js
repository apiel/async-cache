var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
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
var _this = this;
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getId, AsyncCache, } from 'core-async-cache';
export { getId, AsyncCache, } from 'core-async-cache';
var initialState = {
    responses: {},
};
export var AsyncCacheContext = createContext(__assign({ call: function (fn) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, ''];
    }); }); }, update: function (response, fn) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); }); }, cache: function (fn) { } }, initialState));
var AsyncCacheProvider = /** @class */ (function (_super) {
    __extends(AsyncCacheProvider, _super);
    function AsyncCacheProvider(props) {
        var _this = _super.call(this, props) || this;
        _this.state = __assign({}, initialState);
        _this.asyncCache = new AsyncCache(function (responses) {
            return new Promise(function (resolve) {
                _this.setState({ responses: responses }, resolve);
            });
        });
        return _this;
    }
    AsyncCacheProvider.prototype.render = function () {
        return (React.createElement(AsyncCacheContext.Provider, { value: __assign({ responses: this.state.responses }, this.asyncCache) }, this.props.children));
    };
    return AsyncCacheProvider;
}(React.Component));
export { AsyncCacheProvider };
;
;
export function useAsyncCache(fn) {
    var asyncCache = useContext(AsyncCacheContext);
    var call = asyncCache.call, update = asyncCache.update, cache = asyncCache.cache, rest = __rest(asyncCache, ["call", "update", "cache"]);
    return fn ? __assign({ call: function () { return call(fn); }, cache: function () { return cache(fn); }, update: function (response) { return update(response, fn); } }, rest) : asyncCache;
}
;
// we need to find a way to rerender only if necessary
export function useAsyncCacheWatch(fn) {
    var _a = useAsyncCache(fn), responses = _a.responses, rest = __rest(_a, ["responses"]);
    var _b = __read(useState(), 2), response = _b[0], setResponse = _b[1];
    var _c = __read(useState(), 2), error = _c[0], setError = _c[1];
    useEffect(function () {
        var id = getId(fn);
        var storeResponse = responses[id];
        if (storeResponse) {
            // use something else than JSON.stringify (should we use immutable instead? After request are as frequent than rendering component, so JSON might be fine as well)
            if (!response || JSON.stringify(response) !== JSON.stringify(storeResponse.response)) {
                setResponse(storeResponse.response);
            }
            if (!error || JSON.stringify(error) !== JSON.stringify(storeResponse.error)) {
                setError(storeResponse.error);
            }
        }
    }); // , [responses]
    return __assign({ responses: responses,
        response: response,
        error: error }, rest);
}
export function useAsyncCacheEffect(fn, deps) {
    if (deps === void 0) { deps = []; }
    var _a = useAsyncCacheWatch(fn), call = _a.call, rest = __rest(_a, ["call"]);
    React.useEffect(function () {
        call();
    }, deps);
    return __assign({ call: call }, rest);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlCQTJJQTtBQTNJQSxPQUFPLEtBQUssRUFBRSxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUM5RSxPQUFPLEVBQ0gsS0FBSyxFQUNMLFVBQVUsR0FPYixNQUFNLGtCQUFrQixDQUFDO0FBRTFCLE9BQU8sRUFDSCxLQUFLLEVBQ0wsVUFBVSxHQU9iLE1BQU0sa0JBQWtCLENBQUM7QUFFMUIsSUFBTSxZQUFZLEdBQUc7SUFDakIsU0FBUyxFQUFFLEVBQWU7Q0FDN0IsQ0FBQztBQUVGLE1BQU0sQ0FBQyxJQUFNLGlCQUFpQixHQUFHLGFBQWEsWUFDMUMsSUFBSSxFQUFFLFVBQU8sRUFBTTtRQUFLLHNCQUFBLEVBQUUsRUFBQTthQUFBLEVBQzFCLE1BQU0sRUFBRSxVQUFPLFFBQWEsRUFBRSxFQUFNOzthQUFRLEVBQzVDLEtBQUssRUFBRSxVQUFDLEVBQU0sSUFBWSxDQUFDLElBQ3hCLFlBQVksRUFDakIsQ0FBQztBQU1IO0lBQXdDLHNDQUFzQjtJQU8xRCw0QkFBWSxLQUFZO1FBQXhCLFlBQ0ksa0JBQU0sS0FBSyxDQUFDLFNBUWY7UUFmRCxXQUFLLGdCQUNFLFlBQVksRUFDakI7UUFNRSxLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksVUFBVSxDQUM1QixVQUFDLFNBQW9CO1lBQ2pCLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPO2dCQUN2QixLQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsU0FBUyxXQUFBLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUMxQyxDQUFDLENBQUMsQ0FBQztRQUNQ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