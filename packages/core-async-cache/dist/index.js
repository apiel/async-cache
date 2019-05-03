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
import md5 from 'md5';
export function getId(fn, args) {
    return md5(fn.name + "::" + JSON.stringify(args));
}
var AsyncCache = /** @class */ (function () {
    function AsyncCache(updateState) {
        var _this = this;
        this.updateState = updateState;
        this.state = {
            responses: {},
        };
        this.call = function (fn) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                var id, requestTime, response, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = getId(fn, args);
                            if (!!this.isAlreadyRequesting(id)) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.setRequestTime(id, fn, args)];
                        case 1:
                            requestTime = _a.sent();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 5, , 6]);
                            return [4 /*yield*/, fn.apply(void 0, __spread(args))];
                        case 3:
                            response = _a.sent();
                            return [4 /*yield*/, this.setResponse(id, fn, args, requestTime, response, null)];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 6];
                        case 5:
                            error_1 = _a.sent();
                            this.setError(id, fn, args, error_1.toString());
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/, id];
                    }
                });
            });
        };
        this.update = function (response, fn) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                var id;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = getId(fn, args);
                            return [4 /*yield*/, this.setResponse(id, fn, args, Date.now(), response, null)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        this.cache = function (fn) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var id = getId(fn, args);
            return _this.state.responses[id].response;
        };
        this.setResponse = function (id, fn, args, requestTime, response, error) {
            var name = fn.name;
            var responses = _this.state.responses;
            responses[id] = { name: name, args: args, response: response, requestTime: requestTime, error: error };
            // console.log('setResponse', id, responses[id]);
            return _this.updateState(responses, _this);
        };
        this.setRequestTime = function (id, fn, args) { return __awaiter(_this, void 0, void 0, function () {
            var requestTime, data, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestTime = Date.now();
                        data = this.state.responses[id];
                        response = data ? data.response : null;
                        return [4 /*yield*/, this.setResponse(id, fn, args, requestTime, response, null)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, requestTime];
                }
            });
        }); };
        this.setError = function (id, fn, args, error) { return __awaiter(_this, void 0, void 0, function () {
            var data, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = this.state.responses[id];
                        response = data ? data.response : null;
                        return [4 /*yield*/, this.setResponse(id, fn, args, data.requestTime, response, error)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.isAlreadyRequesting = function (id) {
            var data = _this.state.responses[id];
            return data && (Date.now() - data.requestTime) < 200;
        };
    }
    return AsyncCache;
}());
export { AsyncCache };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEdBQUcsTUFBTSxLQUFLLENBQUM7QUErQnRCLE1BQU0sVUFBVSxLQUFLLENBQUMsRUFBTSxFQUFFLElBQVM7SUFDbkMsT0FBTyxHQUFHLENBQUksRUFBRSxDQUFDLElBQUksVUFBSyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBRyxDQUFDLENBQUM7QUFDdEQsQ0FBQztBQUVEO0lBS0ksb0JBQ1ksV0FBbUU7UUFEL0UsaUJBRUk7UUFEUSxnQkFBVyxHQUFYLFdBQVcsQ0FBd0Q7UUFMeEUsVUFBSyxHQUE2QjtZQUNyQyxTQUFTLEVBQUUsRUFBRTtTQUNoQixDQUFDO1FBTUssU0FBSSxHQUFTLFVBQU8sRUFBTTtZQUFFLGNBQVk7aUJBQVosVUFBWSxFQUFaLHFCQUFZLEVBQVosSUFBWTtnQkFBWiw2QkFBWTs7Ozs7Ozs0QkFDckMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7aUNBQ3ZCLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxFQUE3Qix3QkFBNkI7NEJBQ1QscUJBQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFBOzs0QkFBckQsV0FBVyxHQUFHLFNBQXVDOzs7OzRCQUV0QyxxQkFBTSxFQUFFLHdCQUFJLElBQUksSUFBQzs7NEJBQTVCLFFBQVEsR0FBRyxTQUFpQjs0QkFDbEMscUJBQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxFQUFBOzs0QkFBakUsU0FBaUUsQ0FBQzs7Ozs0QkFF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