"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentVariable = exports.EVType = void 0;
var STORAGE_PREFIX = "Dianamics.EnvironmentVariables";
var EVType;
(function (EVType) {
    EVType[EVType["String"] = 100000000] = "String";
    EVType[EVType["Number"] = 100000001] = "Number";
    EVType[EVType["Boolean"] = 100000002] = "Boolean";
    EVType[EVType["JSON"] = 100000003] = "JSON";
    EVType[EVType["ConnectionReference"] = 100000004] = "ConnectionReference";
})(EVType = exports.EVType || (exports.EVType = {}));
var userId;
var cache = {};
var get = function (webApi, name, type) { return __awaiter(void 0, void 0, void 0, function () {
    var val, filter, query, results, ev, defaultValue, valFound, ret;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                val = cache[name];
                if (val != null) {
                    return [2 /*return*/, Promise.resolve(JSON.parse(val))];
                }
                filter = [
                    name !== undefined ? "schemaname eq '" + name + "'" : undefined,
                    type !== undefined ? "type eq " + type : undefined
                ].filter(Boolean).join(" and ");
                query = [
                    "?$select=",
                    "schemaname,defaultvalue,displayname",
                    "&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)",
                    filter !== "" ? "&$filter=" + filter : ""
                ].join("");
                return [4 /*yield*/, webApi.retrieveMultipleRecords("environmentvariabledefinition", query)];
            case 1:
                results = _c.sent();
                ev = results.entities[0];
                if (ev == null)
                    return [2 /*return*/, undefined];
                defaultValue = ev.defaultvalue;
                valFound = (_b = (_a = ev.environmentvariabledefinition_environmentvariablevalue) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value;
                ret = {
                    name: ev.schemaname,
                    value: valFound !== null && valFound !== void 0 ? valFound : defaultValue,
                    defaultValue: defaultValue,
                    displayName: ev.displayname
                };
                cache[name] = JSON.stringify(ret);
                /* todo
                myStorage.setStorageValue(name, JSON.stringify(ret));
                */
                return [2 /*return*/, ret];
        }
    });
}); };
var getString = function (webApi, name) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, get(webApi, name === null || name === void 0 ? void 0 : name.toLowerCase(), EVType.String)];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res === null || res === void 0 ? void 0 : res.value];
        }
    });
}); };
var getJSON = function (webApi, name) { return __awaiter(void 0, void 0, void 0, function () {
    var res, val;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, get(webApi, name === null || name === void 0 ? void 0 : name.toLowerCase(), EVType.JSON)];
            case 1:
                res = _a.sent();
                val = res === null || res === void 0 ? void 0 : res.value;
                return [2 /*return*/, val != null ? JSON.parse(val) : undefined];
        }
    });
}); };
var getNumber = function (webApi, name) { return __awaiter(void 0, void 0, void 0, function () {
    var res, val;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, get(webApi, name === null || name === void 0 ? void 0 : name.toLowerCase(), EVType.Number)];
            case 1:
                res = _a.sent();
                val = res === null || res === void 0 ? void 0 : res.value;
                return [2 /*return*/, val != null ? Number.parseFloat(val) : undefined];
        }
    });
}); };
var getBoolean = function (webApi, name) { return __awaiter(void 0, void 0, void 0, function () {
    var res, val;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, get(webApi, name === null || name === void 0 ? void 0 : name.toLowerCase(), EVType.Boolean)];
            case 1:
                res = _a.sent();
                val = res === null || res === void 0 ? void 0 : res.value;
                return [2 /*return*/, val != null ? new Boolean(val) : undefined];
        }
    });
}); };
exports.EnvironmentVariable = {
    getString: getString,
    getJSON: getJSON,
    getNumber: getNumber,
    getBoolean: getBoolean
};
