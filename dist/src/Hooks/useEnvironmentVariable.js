"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEnvironmentVariable = void 0;
var react_1 = require("react");
var environmentVariable_1 = require("../Utils/environmentVariable");
/*
const RequestsMapper = {
    [EnvironmentVariableTypes.Boolean] : EnvironmentVariable.getBoolean,
    [EnvironmentVariableTypes.String] : EnvironmentVariable.getString,
    [EnvironmentVariableTypes.Number] : EnvironmentVariable.getNumber,
    [EnvironmentVariableTypes.JSON] : EnvironmentVariable.getJSON,
    [EnvironmentVariableTypes.DataSource] : EnvironmentVariable.getString
}*/
var useEnvironmentVariable = function (webAPI, name, type) {
    var _a = react_1.useState(), envVar = _a[0], setEnvVar = _a[1];
    react_1.useEffect(function () {
        if (type === environmentVariable_1.EnvironmentVariableTypes.String) {
            environmentVariable_1.getString(webAPI, name).then(function (val) { return setEnvVar(val); });
            return;
        }
        if (type === environmentVariable_1.EnvironmentVariableTypes.Number) {
            environmentVariable_1.getNumber(webAPI, name).then(function (val) { return setEnvVar(val); });
            return;
        }
        if (type === environmentVariable_1.EnvironmentVariableTypes.Boolean) {
            environmentVariable_1.getBoolean(webAPI, name).then(function (val) { return setEnvVar(val); });
            return;
        }
        if (type === environmentVariable_1.EnvironmentVariableTypes.JSON) {
            environmentVariable_1.getJSON(webAPI, name).then(function (val) { return setEnvVar(val); });
            return;
        }
        if (type === environmentVariable_1.EnvironmentVariableTypes.DataSource) {
            environmentVariable_1.getString(webAPI, name).then(function (val) { return setEnvVar(val); });
            return;
        }
        /*    RequestsMapper[_type](webAPI, name).then((val) => setEnvVar(val as EnvironmentVariableType<T>));
            */
    }, [name]);
    return envVar;
};
exports.useEnvironmentVariable = useEnvironmentVariable;
