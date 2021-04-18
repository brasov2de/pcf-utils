"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentVariable = exports.EVType = void 0;
const STORAGE_PREFIX = "Dianamics.EnvironmentVariables";
var EVType;
(function (EVType) {
    EVType[EVType["String"] = 100000000] = "String";
    EVType[EVType["Number"] = 100000001] = "Number";
    EVType[EVType["Boolean"] = 100000002] = "Boolean";
    EVType[EVType["JSON"] = 100000003] = "JSON"; //,
    //  ConnectionReference=100000004
})(EVType = exports.EVType || (exports.EVType = {}));
let userId;
const cache = {};
const get = async (webApi, name, type) => {
    let val = cache[name];
    if (val != null) {
        return Promise.resolve(JSON.parse(val));
    }
    val = sessionStorage.getItem(`[${STORAGE_PREFIX}] ${name}`);
    if (val != null) {
        return Promise.resolve(JSON.parse(val));
    }
    const filter = [
        name !== undefined ? `schemaname eq '${name}'` : undefined,
        type !== undefined ? `type eq ${type}` : undefined
    ].filter(Boolean).join(" and ");
    const query = [
        "?$select=",
        "schemaname,defaultvalue,displayname",
        "&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)",
        filter !== "" ? `&$filter=${filter}` : ""
    ].join("");
    //console.log(query);
    const results = await webApi.retrieveMultipleRecords("environmentvariabledefinition", query);
    const ev = results.entities[0];
    if (ev == null)
        return {
            value: undefined,
            defaultValue: undefined
        };
    const defaultValue = ev.defaultvalue;
    const valFound = ev.environmentvariabledefinition_environmentvariablevalue?.[0]?.value;
    const ret = {
        value: valFound ?? defaultValue,
        defaultValue: defaultValue,
    };
    cache[name] = JSON.stringify(ret);
    sessionStorage.setItem(`[${STORAGE_PREFIX}] ${name}`, JSON.stringify(ret));
    return ret;
};
const getString = async (webApi, name) => {
    const res = await get(webApi, name?.toLowerCase(), EVType.String);
    return res?.value;
};
const getJSON = async (webApi, name) => {
    const res = await get(webApi, name?.toLowerCase(), EVType.JSON);
    const val = res?.value;
    try {
        return val != null ? JSON.parse(val) : undefined;
    }
    catch (e) {
        return undefined;
    }
};
const getNumber = async (webApi, name) => {
    const res = await get(webApi, name?.toLowerCase(), EVType.Number);
    const val = res?.value;
    return val != null ? Number.parseFloat(val) : undefined;
};
const getBoolean = async (webApi, name) => {
    const res = await get(webApi, name?.toLowerCase(), EVType.Boolean);
    const val = res?.value;
    return val != null ? new Boolean(val) : undefined;
};
exports.EnvironmentVariable = {
    get,
    getString,
    getJSON,
    getNumber,
    getBoolean
};
