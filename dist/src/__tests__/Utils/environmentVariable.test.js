"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const environmentVariable_1 = require("../../Utils/environmentVariable");
const webAPI_1 = __importDefault(require("../../../__mocks__/webAPI"));
debugger;
describe('String', () => {
    beforeEach(() => {
        webAPI_1.default.retrieveMultipleRecords.mockClear();
        sessionStorage.clear();
    });
    test('Only default was set', async () => {
        //setup
        const name = "string1";
        webAPI_1.default.retrieveMultipleRecords.mockResolvedValueOnce({
            entities: [{
                    schemaname: name,
                    defaultvalue: "ok default",
                    environmentvariabledefinition_environmentvariablevalue: []
                }]
        });
        //test
        const val = await environmentVariable_1.EnvironmentVariable.getString(webAPI_1.default, name);
        expect(webAPI_1.default.retrieveMultipleRecords).toHaveBeenCalledTimes(1);
        expect(webAPI_1.default.retrieveMultipleRecords).toHaveBeenLastCalledWith("environmentvariabledefinition", `?$select=schemaname,defaultvalue,displayname&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)&$filter=schemaname eq '${name}' and type eq ${environmentVariable_1.EVType.String}`);
        expect(val).toBe("ok default");
    });
    test('Value was set', async () => {
        //setup
        const name = "string1";
        webAPI_1.default.retrieveMultipleRecords.mockResolvedValueOnce({
            entities: [{
                    schemaname: name,
                    defaultvalue: "this was default",
                    environmentvariabledefinition_environmentvariablevalue: [{ value: "ok" }]
                }]
        });
        //test
        const val = await environmentVariable_1.EnvironmentVariable.getString(webAPI_1.default, name);
        expect(webAPI_1.default.retrieveMultipleRecords).toHaveBeenLastCalledWith("environmentvariabledefinition", `?$select=schemaname,defaultvalue,displayname&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)&$filter=schemaname eq '${name}' and type eq ${environmentVariable_1.EVType.String}`);
        expect(val).toBe("ok");
    });
    test('Solution name set', async () => {
        //setup
        const name = "string1";
        webAPI_1.default.retrieveMultipleRecords.mockResolvedValueOnce({
            entities: [{
                    schemaname: name,
                    defaultvalue: "this was default",
                    environmentvariabledefinition_environmentvariablevalue: [{ value: "ok" }]
                }]
        });
        //test
        const val = await environmentVariable_1.EnvironmentVariable.getString(webAPI_1.default, name);
        expect(webAPI_1.default.retrieveMultipleRecords).toHaveBeenLastCalledWith("environmentvariabledefinition", `?$select=schemaname,defaultvalue,displayname&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)&$filter=schemaname eq '${name}' and type eq ${environmentVariable_1.EVType.String}`);
        expect(val).toBe("ok");
    });
    test('not found (solution name not found)', async () => {
        //setup
        const name = "string1";
        webAPI_1.default.retrieveMultipleRecords.mockResolvedValueOnce({
            entities: []
        });
        //test
        const val = await environmentVariable_1.EnvironmentVariable.getString(webAPI_1.default, name);
        expect(webAPI_1.default.retrieveMultipleRecords).toHaveBeenLastCalledWith("environmentvariabledefinition", `?$select=schemaname,defaultvalue,displayname&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)&$filter=schemaname eq '${name}' and type eq ${environmentVariable_1.EVType.String}`);
        expect(val).not.toBeDefined();
    });
    test('raise an error', () => {
        //setup
        const name = "string1";
        webAPI_1.default.retrieveMultipleRecords.mockRejectedValueOnce('Could not be resolved');
        //test
        return expect(environmentVariable_1.EnvironmentVariable.getString(webAPI_1.default, name)).rejects.toEqual('Could not be resolved');
    });
});
describe('JSON', () => {
    beforeEach(() => {
        webAPI_1.default.retrieveMultipleRecords.mockClear();
        sessionStorage.clear();
    });
    test('Only default was set', async () => {
        //setup
        const name = "json1";
        webAPI_1.default.retrieveMultipleRecords.mockResolvedValueOnce({
            entities: [{
                    schemaname: name,
                    defaultvalue: '{"prop": "ok default"}',
                    environmentvariabledefinition_environmentvariablevalue: []
                }]
        });
        //test
        const val = await environmentVariable_1.EnvironmentVariable.getJSON(webAPI_1.default, name);
        expect(webAPI_1.default.retrieveMultipleRecords).toHaveBeenCalledTimes(1);
        expect(webAPI_1.default.retrieveMultipleRecords).toHaveBeenLastCalledWith("environmentvariabledefinition", `?$select=schemaname,defaultvalue,displayname&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)&$filter=schemaname eq '${name}' and type eq ${environmentVariable_1.EVType.JSON}`);
        expect(val).toHaveProperty("prop");
        expect(val?.prop).toBe("ok default");
    });
    test('Value was set', async () => {
        //setup
        const name = "json1";
        webAPI_1.default.retrieveMultipleRecords.mockResolvedValueOnce({
            entities: [{
                    schemaname: name,
                    defaultvalue: '{"prop": "ok default"}',
                    environmentvariabledefinition_environmentvariablevalue: [{ value: '{"prop": "ok"}' }]
                }]
        });
        //test
        const val = await environmentVariable_1.EnvironmentVariable.getJSON(webAPI_1.default, name);
        expect(webAPI_1.default.retrieveMultipleRecords).toHaveBeenLastCalledWith("environmentvariabledefinition", `?$select=schemaname,defaultvalue,displayname&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)&$filter=schemaname eq '${name}' and type eq ${environmentVariable_1.EVType.JSON}`);
        expect(val).toHaveProperty("prop");
        expect(val?.prop).toBe("ok");
    });
    test('Solution name set', async () => {
        //setup
        const name = "json1";
        webAPI_1.default.retrieveMultipleRecords.mockResolvedValueOnce({
            entities: [{
                    schemaname: name,
                    defaultvalue: '{"prop": "ok default"}',
                    environmentvariabledefinition_environmentvariablevalue: [{ value: '{"prop": "ok"}' }]
                }]
        });
        //test
        const val = await environmentVariable_1.EnvironmentVariable.getJSON(webAPI_1.default, name);
        expect(webAPI_1.default.retrieveMultipleRecords).toHaveBeenLastCalledWith("environmentvariabledefinition", `?$select=schemaname,defaultvalue,displayname&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)&$filter=schemaname eq '${name}' and type eq ${environmentVariable_1.EVType.JSON}`);
        expect(val).toHaveProperty("prop");
        expect(val?.prop).toBe("ok");
    });
    test('not found (solution name not found)', async () => {
        //setup
        const name = "json1";
        webAPI_1.default.retrieveMultipleRecords.mockResolvedValueOnce({
            entities: []
        });
        //test
        const val = await environmentVariable_1.EnvironmentVariable.getJSON(webAPI_1.default, name);
        expect(webAPI_1.default.retrieveMultipleRecords).toHaveBeenLastCalledWith("environmentvariabledefinition", `?$select=schemaname,defaultvalue,displayname&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)&$filter=schemaname eq '${name}' and type eq ${environmentVariable_1.EVType.JSON}`);
        expect(val).not.toBeDefined();
    });
    test('raise an error', () => {
        //setup
        const name = "string1";
        webAPI_1.default.retrieveMultipleRecords.mockRejectedValueOnce('Could not be resolved');
        //test
        return expect(environmentVariable_1.EnvironmentVariable.getJSON(webAPI_1.default, name)).rejects.toEqual('Could not be resolved');
    });
    test('defaultValue is not a JSON', () => {
        //setup
        const name = "json1";
        webAPI_1.default.retrieveMultipleRecords.mockResolvedValueOnce({
            entities: [{
                    schemaname: name,
                    defaultvalue: 'This is NOT a JSON and should throw an error',
                    environmentvariabledefinition_environmentvariablevalue: []
                }]
        });
        //test
        return expect(environmentVariable_1.EnvironmentVariable.getJSON(webAPI_1.default, name)).rejects.toThrowError();
    });
    test('value is not a JSON', () => {
        //setup
        const name = "json1";
        webAPI_1.default.retrieveMultipleRecords.mockResolvedValueOnce({
            entities: [{
                    schemaname: name,
                    defaultvalue: "{'value': 'default value'}",
                    environmentvariabledefinition_environmentvariablevalue: [{ value: 'NOT a JSON, will throw an error' }]
                }]
        });
        //test
        return expect(environmentVariable_1.EnvironmentVariable.getJSON(webAPI_1.default, name)).rejects.toThrowError();
    });
});
describe('JSON', () => {
    beforeEach(() => {
        webAPI_1.default.retrieveMultipleRecords.mockClear();
        sessionStorage.clear();
    });
    test('Only default was set', async () => {
        //setup
        const name = "SuperEnvVar";
        webAPI_1.default.retrieveMultipleRecords.mockResolvedValueOnce({
            entities: [{
                    schemaname: name,
                    defaultvalue: '{"prop": "ok default"}',
                    environmentvariabledefinition_environmentvariablevalue: []
                }]
        });
        //test
        const val = await environmentVariable_1.EnvironmentVariable.getJSON(webAPI_1.default, name);
        expect(webAPI_1.default.retrieveMultipleRecords).toHaveBeenCalledTimes(1);
        expect(webAPI_1.default.retrieveMultipleRecords).toHaveBeenLastCalledWith("environmentvariabledefinition", `?$select=schemaname,defaultvalue,displayname&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)&$filter=schemaname eq '${name.toLowerCase()}' and type eq ${environmentVariable_1.EVType.JSON}`);
        expect(val).toHaveProperty("prop");
        expect(val?.prop).toBe("ok default");
        const val1 = await environmentVariable_1.EnvironmentVariable.getJSON(webAPI_1.default, name);
        expect(webAPI_1.default.retrieveMultipleRecords).toHaveBeenCalledTimes(1);
        expect(val1).toHaveProperty("prop");
        expect(val1?.prop).toBe("ok default");
    });
    test('Only default was set', async () => {
        //setup
        const name1 = "SuperEnvVar";
        webAPI_1.default.retrieveMultipleRecords.mockResolvedValueOnce({
            entities: [{
                    schemaname: name1,
                    defaultvalue: '{"prop": "ok default"}',
                    environmentvariabledefinition_environmentvariablevalue: []
                }]
        });
        //test
        const val = await environmentVariable_1.EnvironmentVariable.getJSON(webAPI_1.default, name1);
        expect(webAPI_1.default.retrieveMultipleRecords).toHaveBeenCalledTimes(1);
        expect(webAPI_1.default.retrieveMultipleRecords).toHaveBeenLastCalledWith("environmentvariabledefinition", `?$select=schemaname,defaultvalue,displayname&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)&$filter=schemaname eq '${name1.toLowerCase()}' and type eq ${environmentVariable_1.EVType.JSON}`);
        expect(val).toHaveProperty("prop");
        expect(val?.prop).toBe("ok default");
        const name2 = "AnotherEnvVar";
        webAPI_1.default.retrieveMultipleRecords.mockResolvedValueOnce({
            entities: [{
                    schemaname: name2,
                    defaultvalue: '{"prop": "super value"}',
                    environmentvariabledefinition_environmentvariablevalue: []
                }]
        });
        const val2 = await environmentVariable_1.EnvironmentVariable.getJSON(webAPI_1.default, name2);
        expect(webAPI_1.default.retrieveMultipleRecords).toHaveBeenCalledTimes(2);
        expect(val2).toHaveProperty("prop");
        expect(val2?.prop).toBe("super value");
        //first from storage
        const valStorage = await environmentVariable_1.EnvironmentVariable.getJSON(webAPI_1.default, name1);
        expect(webAPI_1.default.retrieveMultipleRecords).toHaveBeenCalledTimes(2); //no new request
        expect(valStorage).toHaveProperty("prop");
        expect(valStorage?.prop).toBe("ok default");
        //second from storage
        const val2Storage = await environmentVariable_1.EnvironmentVariable.getJSON(webAPI_1.default, name2);
        expect(webAPI_1.default.retrieveMultipleRecords).toHaveBeenCalledTimes(2); //no new request
        expect(val2Storage).toHaveProperty("prop");
        expect(val2Storage?.prop).toBe("super value");
    });
});
describe('generic get', () => {
    beforeEach(() => {
        webAPI_1.default.retrieveMultipleRecords.mockClear();
        sessionStorage.clear();
    });
    test('as a string', async () => {
        const name = "EnvVarGerericString";
        const value = "Hello World String";
        webAPI_1.default.retrieveMultipleRecords.mockResolvedValueOnce({
            entities: [{
                    schemaname: name,
                    defaultvalue: value,
                    environmentvariabledefinition_environmentvariablevalue: []
                }]
        });
        //test
        const resp = await environmentVariable_1.EnvironmentVariable.get(webAPI_1.default, name, environmentVariable_1.EVType.String);
        expect(resp.value).toBe(value);
        expect(typeof resp.value).toBe("string");
    });
});
