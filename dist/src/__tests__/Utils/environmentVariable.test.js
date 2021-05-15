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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var environmentVariable_1 = require("../../Utils/environmentVariable");
var webAPI_1 = __importDefault(require("../../../__mocks__/webAPI"));
debugger;
describe('String', function () {
    beforeEach(function () {
        webAPI_1.default.retrieveMultipleRecords.mockClear();
        sessionStorage.clear();
        environmentVariable_1.clearCache();
    });
    test('Only default was set', function () { return __awaiter(void 0, void 0, void 0, function () {
        var name, val;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = "string1";
                    webAPI_1.default.retrieveMultipleRecords.mockResolvedValueOnce({
                        entities: [{
                                schemaname: name,
                                defaultvalue: "ok default",
                                environmentvariabledefinition_environmentvariablevalue: []
                            }]
                    });
                    return [4 /*yield*/, environmentVariable_1.getString(webAPI_1.default, name)];
                case 1:
                    val = _a.sent();
                    expect(webAPI_1.default.retrieveMultipleRecords).toHaveBeenCalledTimes(1);
                    expect(webAPI_1.default.retrieveMultipleRecords).toHaveBeenLastCalledWith("environmentvariabledefinition", "?$select=schemaname,defaultvalue,displayname&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)&$filter=schemaname eq '" + name + "' and type eq " + environmentVariable_1.EnvironmentVariableTypes.String);
                    expect(val).toBe("ok default");
                    return [2 /*return*/];
            }
        });
    }); });
    test('Value was set', function () { return __awaiter(void 0, void 0, void 0, function () {
        var name, val;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = "string1";
                    webAPI_1.default.retrieveMultipleRecords.mockResolvedValueOnce({
                        entities: [{
                                schemaname: name,
                                defaultvalue: "this was default",
                                environmentvariabledefinition_environmentvariablevalue: [{ value: "ok" }]
                            }]
                    });
                    return [4 /*yield*/, environmentVariable_1.getString(webAPI_1.default, name)];
                case 1:
                    val = _a.sent();
                    expect(webAPI_1.default.retrieveMultipleRecords).toHaveBeenLastCalledWith("environmentvariabledefinition", "?$select=schemaname,defaultvalue,displayname&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)&$filter=schemaname eq '" + name + "' and type eq " + environmentVariable_1.EnvironmentVariableTypes.String);
                    expect(val).toBe("ok");
                    return [2 /*return*/];
            }
        });
    }); });
    test('Solution name set', function () { return __awaiter(void 0, void 0, void 0, function () {
        var name, val;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = "string1";
                    webAPI_1.default.retrieveMultipleRecords.mockResolvedValueOnce({
                        entities: [{
                                schemaname: name,
                                defaultvalue: "this was default",
                                environmentvariabledefinition_environmentvariablevalue: [{ value: "ok" }]
                            }]
                    });
                    return [4 /*yield*/, environmentVariable_1.getString(webAPI_1.default, name)];
                case 1:
                    val = _a.sent();
                    expect(webAPI_1.default.retrieveMultipleRecords).toHaveBeenLastCalledWith("environmentvariabledefinition", "?$select=schemaname,defaultvalue,displayname&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)&$filter=schemaname eq '" + name + "' and type eq " + environmentVariable_1.EnvironmentVariableTypes.String);
                    expect(val).toBe("ok");
                    return [2 /*return*/];
            }
        });
    }); });
    test('not found (solution name not found)', function () { return __awaiter(void 0, void 0, void 0, function () {
        var name, val;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = "string1";
                    webAPI_1.default.retrieveMultipleRecords.mockResolvedValueOnce({
                        entities: []
                    });
                    return [4 /*yield*/, environmentVariable_1.getString(webAPI_1.default, name)];
                case 1:
                    val = _a.sent();
                    expect(webAPI_1.default.retrieveMultipleRecords).toHaveBeenLastCalledWith("environmentvariabledefinition", "?$select=schemaname,defaultvalue,displayname&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)&$filter=schemaname eq '" + name + "' and type eq " + environmentVariable_1.EnvironmentVariableTypes.String);
                    expect(val).not.toBeDefined();
                    return [2 /*return*/];
            }
        });
    }); });
    test('raise an error', function () {
        //setup
        var name = "string1";
        webAPI_1.default.retrieveMultipleRecords.mockRejectedValueOnce('Could not be resolved');
        //test
        return expect(environmentVariable_1.getString(webAPI_1.default, name)).rejects.toEqual('Could not be resolved');
    });
});
describe('JSON', function () {
    beforeEach(function () {
        webAPI_1.default.retrieveMultipleRecords.mockClear();
        sessionStorage.clear();
        environmentVariable_1.clearCache();
    });
    test('Only default was set', function () { return __awaiter(void 0, void 0, void 0, function () {
        var name, val;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = "json1";
                    webAPI_1.default.retrieveMultipleRecords.mockResolvedValueOnce({
                        entities: [{
                                schemaname: name,
                                defaultvalue: '{"prop": "ok default"}',
                                environmentvariabledefinition_environmentvariablevalue: []
                            }]
                    });
                    return [4 /*yield*/, environmentVariable_1.getJSON(webAPI_1.default, name)];
                case 1:
                    val = _a.sent();
                    expect(webAPI_1.default.retrieveMultipleRecords).toHaveBeenCalledTimes(1);
                    expect(webAPI_1.default.retrieveMultipleRecords).toHaveBeenLastCalledWith("environmentvariabledefinition", "?$select=schemaname,defaultvalue,displayname&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)&$filter=schemaname eq '" + name + "' and type eq " + environmentVariable_1.EnvironmentVariableTypes.JSON);
                    expect(val).toHaveProperty("prop");
                    expect(val.prop).toBe("ok default");
                    return [2 /*return*/];
            }
        });
    }); });
    test('Value was set', function () { return __awaiter(void 0, void 0, void 0, function () {
        var name, val;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = "json1";
                    webAPI_1.default.retrieveMultipleRecords.mockResolvedValueOnce({
                        entities: [{
                                schemaname: name,
                                defaultvalue: '{"prop": "ok default"}',
                                environmentvariabledefinition_environmentvariablevalue: [{ value: '{"prop": "ok"}' }]
                            }]
                    });
                    return [4 /*yield*/, environmentVariable_1.getJSON(webAPI_1.default, name)];
                case 1:
                    val = _a.sent();
                    expect(webAPI_1.default.retrieveMultipleRecords).toHaveBeenLastCalledWith("environmentvariabledefinition", "?$select=schemaname,defaultvalue,displayname&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)&$filter=schemaname eq '" + name + "' and type eq " + environmentVariable_1.EnvironmentVariableTypes.JSON);
                    expect(val).toHaveProperty("prop");
                    expect(val.prop).toBe("ok");
                    return [2 /*return*/];
            }
        });
    }); });
    test('Solution name set', function () { return __awaiter(void 0, void 0, void 0, function () {
        var name, val;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = "json1";
                    webAPI_1.default.retrieveMultipleRecords.mockResolvedValueOnce({
                        entities: [{
                                schemaname: name,
                                defaultvalue: '{"prop": "ok default"}',
                                environmentvariabledefinition_environmentvariablevalue: [{ value: '{"prop": "ok"}' }]
                            }]
                    });
                    return [4 /*yield*/, environmentVariable_1.getJSON(webAPI_1.default, name)];
                case 1:
                    val = _a.sent();
                    expect(webAPI_1.default.retrieveMultipleRecords).toHaveBeenLastCalledWith("environmentvariabledefinition", "?$select=schemaname,defaultvalue,displayname&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)&$filter=schemaname eq '" + name + "' and type eq " + environmentVariable_1.EnvironmentVariableTypes.JSON);
                    expect(val).toHaveProperty("prop");
                    expect(val === null || val === void 0 ? void 0 : val.prop).toBe("ok");
                    return [2 /*return*/];
            }
        });
    }); });
    test('not found (solution name not found)', function () { return __awaiter(void 0, void 0, void 0, function () {
        var name, val;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = "json1";
                    webAPI_1.default.retrieveMultipleRecords.mockResolvedValueOnce({
                        entities: []
                    });
                    return [4 /*yield*/, environmentVariable_1.getJSON(webAPI_1.default, name)];
                case 1:
                    val = _a.sent();
                    expect(webAPI_1.default.retrieveMultipleRecords).toHaveBeenLastCalledWith("environmentvariabledefinition", "?$select=schemaname,defaultvalue,displayname&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)&$filter=schemaname eq '" + name + "' and type eq " + environmentVariable_1.EnvironmentVariableTypes.JSON);
                    expect(val).not.toBeDefined();
                    return [2 /*return*/];
            }
        });
    }); });
    test('raise an error', function () {
        //setup
        var name = "string1";
        webAPI_1.default.retrieveMultipleRecords.mockRejectedValueOnce('Could not be resolved');
        //test
        return expect(environmentVariable_1.getJSON(webAPI_1.default, name)).rejects.toEqual('Could not be resolved');
    });
    test('defaultValue is not a JSON', function () {
        //setup
        var name = "json1";
        webAPI_1.default.retrieveMultipleRecords.mockResolvedValueOnce({
            entities: [{
                    schemaname: name,
                    defaultvalue: 'This is NOT a JSON and should throw an error',
                    environmentvariabledefinition_environmentvariablevalue: []
                }]
        });
        //test
        return expect(environmentVariable_1.getJSON(webAPI_1.default, name)).rejects.toThrowError();
    });
    test('value is not a JSON', function () {
        //setup
        var name = "json1";
        webAPI_1.default.retrieveMultipleRecords.mockResolvedValueOnce({
            entities: [{
                    schemaname: name,
                    defaultvalue: "{'value': 'default value'}",
                    environmentvariabledefinition_environmentvariablevalue: [{ value: 'NOT a JSON, will throw an error' }]
                }]
        });
        //test
        return expect(environmentVariable_1.getJSON(webAPI_1.default, name)).rejects.toThrowError();
    });
});
describe('JSON', function () {
    beforeEach(function () {
        webAPI_1.default.retrieveMultipleRecords.mockClear();
        sessionStorage.clear();
        environmentVariable_1.clearCache();
    });
    test('Only default was set', function () { return __awaiter(void 0, void 0, void 0, function () {
        var name, val, val1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = "SuperEnvVar";
                    webAPI_1.default.retrieveMultipleRecords.mockResolvedValueOnce({
                        entities: [{
                                schemaname: name,
                                defaultvalue: '{"prop": "ok default"}',
                                environmentvariabledefinition_environmentvariablevalue: []
                            }]
                    });
                    return [4 /*yield*/, environmentVariable_1.getJSON(webAPI_1.default, name)];
                case 1:
                    val = _a.sent();
                    expect(webAPI_1.default.retrieveMultipleRecords).toHaveBeenCalledTimes(1);
                    expect(webAPI_1.default.retrieveMultipleRecords).toHaveBeenLastCalledWith("environmentvariabledefinition", "?$select=schemaname,defaultvalue,displayname&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)&$filter=schemaname eq '" + name.toLowerCase() + "' and type eq " + environmentVariable_1.EnvironmentVariableTypes.JSON);
                    expect(val).toHaveProperty("prop");
                    expect(val === null || val === void 0 ? void 0 : val.prop).toBe("ok default");
                    return [4 /*yield*/, environmentVariable_1.getJSON(webAPI_1.default, name)];
                case 2:
                    val1 = _a.sent();
                    expect(webAPI_1.default.retrieveMultipleRecords).toHaveBeenCalledTimes(1);
                    expect(val1).toHaveProperty("prop");
                    expect(val1 === null || val1 === void 0 ? void 0 : val1.prop).toBe("ok default");
                    return [2 /*return*/];
            }
        });
    }); });
    test('Only default was set', function () { return __awaiter(void 0, void 0, void 0, function () {
        var name1, val, name2, val2, valStorage, val2Storage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name1 = "SuperEnvVar";
                    webAPI_1.default.retrieveMultipleRecords.mockResolvedValueOnce({
                        entities: [{
                                schemaname: name1,
                                defaultvalue: '{"prop": "ok default"}',
                                environmentvariabledefinition_environmentvariablevalue: []
                            }]
                    });
                    return [4 /*yield*/, environmentVariable_1.getJSON(webAPI_1.default, name1)];
                case 1:
                    val = _a.sent();
                    expect(webAPI_1.default.retrieveMultipleRecords).toHaveBeenCalledTimes(1);
                    expect(webAPI_1.default.retrieveMultipleRecords).toHaveBeenLastCalledWith("environmentvariabledefinition", "?$select=schemaname,defaultvalue,displayname&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)&$filter=schemaname eq '" + name1.toLowerCase() + "' and type eq " + environmentVariable_1.EnvironmentVariableTypes.JSON);
                    expect(val).toHaveProperty("prop");
                    expect(val === null || val === void 0 ? void 0 : val.prop).toBe("ok default");
                    name2 = "AnotherEnvVar";
                    webAPI_1.default.retrieveMultipleRecords.mockResolvedValueOnce({
                        entities: [{
                                schemaname: name2,
                                defaultvalue: '{"prop": "super value"}',
                                environmentvariabledefinition_environmentvariablevalue: []
                            }]
                    });
                    return [4 /*yield*/, environmentVariable_1.getJSON(webAPI_1.default, name2)];
                case 2:
                    val2 = _a.sent();
                    expect(webAPI_1.default.retrieveMultipleRecords).toHaveBeenCalledTimes(2);
                    expect(val2).toHaveProperty("prop");
                    expect(val2 === null || val2 === void 0 ? void 0 : val2.prop).toBe("super value");
                    return [4 /*yield*/, environmentVariable_1.getJSON(webAPI_1.default, name1)];
                case 3:
                    valStorage = _a.sent();
                    expect(webAPI_1.default.retrieveMultipleRecords).toHaveBeenCalledTimes(2); //no new request
                    expect(valStorage).toHaveProperty("prop");
                    expect(valStorage === null || valStorage === void 0 ? void 0 : valStorage.prop).toBe("ok default");
                    return [4 /*yield*/, environmentVariable_1.getJSON(webAPI_1.default, name2)];
                case 4:
                    val2Storage = _a.sent();
                    expect(webAPI_1.default.retrieveMultipleRecords).toHaveBeenCalledTimes(2); //no new request
                    expect(val2Storage).toHaveProperty("prop");
                    expect(val2Storage === null || val2Storage === void 0 ? void 0 : val2Storage.prop).toBe("super value");
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('generic get', function () {
    beforeEach(function () {
        webAPI_1.default.retrieveMultipleRecords.mockClear();
        sessionStorage.clear();
        environmentVariable_1.clearCache();
    });
    test('as a string', function () { return __awaiter(void 0, void 0, void 0, function () {
        var name, value, resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = "EnvVarGerericString";
                    value = "Hello World String";
                    webAPI_1.default.retrieveMultipleRecords.mockResolvedValueOnce({
                        entities: [{
                                schemaname: name,
                                defaultvalue: value,
                                environmentvariabledefinition_environmentvariablevalue: []
                            }]
                    });
                    return [4 /*yield*/, environmentVariable_1.get(webAPI_1.default, name, environmentVariable_1.EnvironmentVariableTypes.String)];
                case 1:
                    resp = _a.sent();
                    expect(resp.value).toBe(value);
                    expect(typeof resp.value).toBe("string");
                    return [2 /*return*/];
            }
        });
    }); });
});
