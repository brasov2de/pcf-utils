"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBoolean = exports.getNumber = exports.getJSON = exports.getString = exports.get = exports.EnvironmentVariableTypes = void 0;
const STORAGE_PREFIX = "Dianamics.EnvironmentVariables";
var EnvironmentVariableTypes;
(function (EnvironmentVariableTypes) {
    EnvironmentVariableTypes[EnvironmentVariableTypes["String"] = 100000000] = "String";
    EnvironmentVariableTypes[EnvironmentVariableTypes["Number"] = 100000001] = "Number";
    EnvironmentVariableTypes[EnvironmentVariableTypes["Boolean"] = 100000002] = "Boolean";
    EnvironmentVariableTypes[EnvironmentVariableTypes["JSON"] = 100000003] = "JSON";
    EnvironmentVariableTypes[EnvironmentVariableTypes["DataSource"] = 100000004] = "DataSource";
})(EnvironmentVariableTypes = exports.EnvironmentVariableTypes || (exports.EnvironmentVariableTypes = {}));
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
exports.get = get;
const getString = async (webApi, name) => {
    const res = await exports.get(webApi, name?.toLowerCase(), EnvironmentVariableTypes.String);
    return res?.value;
};
exports.getString = getString;
const getJSON = async (webApi, name) => {
    const res = await exports.get(webApi, name?.toLowerCase(), EnvironmentVariableTypes.JSON);
    const val = res?.value;
    try {
        return val != null ? JSON.parse(val) : undefined;
    }
    catch (e) {
        return undefined;
    }
};
exports.getJSON = getJSON;
const getNumber = async (webApi, name) => {
    const res = await exports.get(webApi, name?.toLowerCase(), EnvironmentVariableTypes.Number);
    const val = res?.value;
    return val != null ? Number.parseFloat(val) : undefined;
};
exports.getNumber = getNumber;
const getBoolean = async (webApi, name) => {
    const res = await exports.get(webApi, name?.toLowerCase(), EnvironmentVariableTypes.Boolean);
    const val = res?.value;
    return val != null ? new Boolean(val) : undefined;
};
exports.getBoolean = getBoolean;
