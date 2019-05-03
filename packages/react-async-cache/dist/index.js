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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var _this = this;
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getId, AsyncCache, } from 'core-async-cache';
export { getId, AsyncCache, } from 'core-async-cache';
var initialState = {
    responses: {},
};
;
export var AsyncCacheContext = createContext(__assign({ call: function (fn) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, ''];
        }); });
    }, update: function (response, fn) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    }, cache: function (fn) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
    } }, initialState));
export function useAsyncCache() {
    var _this = this;
    var _a = useContext(AsyncCacheContext), call = _a.call, responses = _a.responses, rest = __rest(_a, ["call", "responses"]);
    var _b = __read(useState(), 2), id = _b[0], setId = _b[1];
    var _c = __read(useState(), 2), response = _c[0], setResponse = _c[1];
    var _d = __read(useState(), 2), error = _d[0], setError = _d[1];
    var myCall = function (fn) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                setId(getId(fn, args));
                return [2 /*return*/, call.apply(void 0, __spread([fn], args))];
            });
        });
    };
    useEffect(function () {
        var storeResponse = responses[id];
        if (storeResponse) {
            if (!response || JSON.stringify(response) !== JSON.stringify(storeResponse.response)) {
                setResponse(storeResponse.response);
            }
            if (!error || JSON.stringify(error) !== JSON.stringify(storeResponse.error)) {
                setError(storeResponse.error);
            }
        }
    }); // , [responses]
    return __assign({ call: myCall, response: response, error: error }, rest);
}
export function useAsyncCacheEffect() {
    var _this = this;
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    var _a = __read(typeof (params[0]) === 'function' ? __spread([[]], params) : params), deps = _a[0], fn = _a[1], args = _a.slice(2);
    var _b = useAsyncCache(), call = _b.call, rest = __rest(_b, ["call"]);
    var load = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, call.apply(void 0, __spread([fn], args))];
        });
    }); };
    React.useEffect(function () {
        load();
    }, deps);
    return __assign({ load: load, call: call }, rest);
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQkFpSEE7QUFqSEEsT0FBTyxLQUFLLEVBQUUsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDOUUsT0FBTyxFQUNILEtBQUssRUFDTCxVQUFVLEdBT2IsTUFBTSxrQkFBa0IsQ0FBQztBQUUxQixPQUFPLEVBQ0gsS0FBSyxFQUNMLFVBQVUsR0FPYixNQUFNLGtCQUFrQixDQUFDO0FBRTFCLElBQU0sWUFBWSxHQUFHO0lBQ2pCLFNBQVMsRUFBRSxFQUFlO0NBQzdCLENBQUM7QUFRRCxDQUFDO0FBRUYsTUFBTSxDQUFDLElBQU0saUJBQWlCLEdBQUcsYUFBYSxZQUMxQyxJQUFJLEVBQUUsVUFBTyxFQUFNO1FBQUUsY0FBWTthQUFaLFVBQVksRUFBWixxQkFBWSxFQUFaLElBQVk7WUFBWiw2QkFBWTs7O1lBQUssc0JBQUEsRUFBRSxFQUFBOztLQUFBLEVBQ3hDLE1BQU0sRUFBRSxVQUFPLFFBQWEsRUFBRSxFQUFNO1FBQUUsY0FBWTthQUFaLFVBQVksRUFBWixxQkFBWSxFQUFaLElBQVk7WUFBWiw2QkFBWTs7Ozs7S0FBUSxFQUMxRCxLQUFLLEVBQUUsVUFBQyxFQUFNO1FBQUUsY0FBWTthQUFaLFVBQVksRUFBWixxQkFBWSxFQUFaLElBQVk7WUFBWiw2QkFBWTs7SUFBWSxDQUFDLElBQ3RDLFlBQVksRUFDakIsQ0FBQztBQUVILE1BQU0sVUFBVSxhQUFhO0lBQTdCLGlCQXFCQztJQXBCRyxJQUFNLGtDQUE0RCxFQUExRCxjQUFJLEVBQUUsd0JBQVMsRUFBRSx3Q0FBeUMsQ0FBQztJQUM3RCxJ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