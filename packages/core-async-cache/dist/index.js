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
import md5 from 'md5';
export function getId(fn) {
    return md5(fn.toString());
}
var AsyncCache = /** @class */ (function () {
    function AsyncCache(updateState) {
        var _this = this;
        this.updateState = updateState;
        this.state = {
            responses: {},
        };
        this.call = function (fn) { return __awaiter(_this, void 0, void 0, function () {
            var id, requestTime, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = getId(fn);
                        if (!!this.isAlreadyRequesting(id)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.setRequestTime(id, fn)];
                    case 1:
                        requestTime = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, fn()];
                    case 3:
                        response = _a.sent();
                        return [4 /*yield*/, this.setResponse(id, fn, requestTime, response, null)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        this.setError(id, fn, error_1.toString());
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, id];
                }
            });
        }); };
        this.update = function (response, fn) { return __awaiter(_this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = getId(fn);
                        return [4 /*yield*/, this.setResponse(id, fn, Date.now(), response, null)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.cache = function (fn) {
            var id = getId(fn);
            return _this.state.responses[id] && _this.state.responses[id].response;
        };
        this.setResponse = function (id, fn, requestTime, response, error) {
            var name = fn.name;
            var responses = _this.state.responses;
            responses[id] = { name: name, response: response, requestTime: requestTime, error: error };
            // console.log('setResponse', id, responses[id]);
            return _this.updateState(responses, _this);
        };
        this.setRequestTime = function (id, fn) { return __awaiter(_this, void 0, void 0, function () {
            var requestTime, data, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestTime = Date.now();
                        data = this.state.responses[id];
                        response = data ? data.response : null;
                        return [4 /*yield*/, this.setResponse(id, fn, requestTime, response, null)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, requestTime];
                }
            });
        }); };
        this.setError = function (id, fn, error) { return __awaiter(_this, void 0, void 0, function () {
            var data, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = this.state.responses[id];
                        response = data ? data.response : null;
                        return [4 /*yield*/, this.setResponse(id, fn, data.requestTime, response, error)];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxHQUFHLE1BQU0sS0FBSyxDQUFDO0FBNEJ0QixNQUFNLFVBQVUsS0FBSyxDQUFDLEVBQU07SUFDeEIsT0FBTyxHQUFHLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7QUFDOUIsQ0FBQztBQUVEO0lBS0ksb0JBQ1ksV0FBbUU7UUFEL0UsaUJBRUs7UUFETyxnQkFBVyxHQUFYLFdBQVcsQ0FBd0Q7UUFMeEUsVUFBSyxHQUE2QjtZQUNyQyxTQUFTLEVBQUUsRUFBRTtTQUNoQixDQUFDO1FBTUssU0FBSSxHQUFTLFVBQU8sRUFBTTs7Ozs7d0JBQ3ZCLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7NkJBQ2pCLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxFQUE3Qix3QkFBNkI7d0JBQ1QscUJBQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUE7O3dCQUEvQyxXQUFXLEdBQUcsU0FBaUM7Ozs7d0JBRWhDLHFCQUFNLEVBQUUsRUFBRSxFQUFBOzt3QkFBckIsUUFBUSxHQUFHLFNBQVU7d0JBQzNCLHFCQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxFQUFBOzt3QkFBM0QsU0FBMkQsQ0FBQzs7Ozt3QkFFNUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLE9BQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDOzs0QkFHaEQsc0JBQU8sRUFBRSxFQUFDOzs7YUFDYixDQUFBO1FBRU0sV0FBTSxHQUFXLFVBQU8sUUFBYSxFQUFFLEVBQU07Ozs7O3dCQUMx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