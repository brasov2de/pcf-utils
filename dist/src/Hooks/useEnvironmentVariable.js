"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEnvironmentVariable = void 0;
const React = __importStar(require("react"));
const environmentVariable_1 = require("../Utils/environmentVariable");
/*
const RequestsMapper = {
    [EnvironmentVariableTypes.Boolean] : EnvironmentVariable.getBoolean,
    [EnvironmentVariableTypes.String] : EnvironmentVariable.getString,
    [EnvironmentVariableTypes.Number] : EnvironmentVariable.getNumber,
    [EnvironmentVariableTypes.JSON] : EnvironmentVariable.getJSON,
    [EnvironmentVariableTypes.DataSource] : EnvironmentVariable.getString
}*/
const useEnvironmentVariable = (webAPI, name, type) => {
    const [envVar, setEnvVar] = React.useState();
    React.useEffect(() => {
        if (type === environmentVariable_1.EnvironmentVariableTypes.String) {
            environmentVariable_1.EnvironmentVariable.getString(webAPI, name).then((val) => setEnvVar(val));
            return;
        }
        if (type === environmentVariable_1.EnvironmentVariableTypes.Number) {
            environmentVariable_1.EnvironmentVariable.getNumber(webAPI, name).then((val) => setEnvVar(val));
            return;
        }
        if (type === environmentVariable_1.EnvironmentVariableTypes.Boolean) {
            environmentVariable_1.EnvironmentVariable.getBoolean(webAPI, name).then((val) => setEnvVar(val));
            return;
        }
        if (type === environmentVariable_1.EnvironmentVariableTypes.JSON) {
            environmentVariable_1.EnvironmentVariable.getJSON(webAPI, name).then((val) => setEnvVar(val));
            return;
        }
        if (type === environmentVariable_1.EnvironmentVariableTypes.DataSource) {
            environmentVariable_1.EnvironmentVariable.getString(webAPI, name).then((val) => setEnvVar(val));
            return;
        }
        /*    RequestsMapper[_type](webAPI, name).then((val) => setEnvVar(val as EnvironmentVariableType<T>));
            */
    }, [name]);
    return envVar;
};
exports.useEnvironmentVariable = useEnvironmentVariable;
