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
const RequestsMapper = {
    [environmentVariable_1.EVType.Boolean]: environmentVariable_1.EnvironmentVariable.getBoolean,
    [environmentVariable_1.EVType.String]: environmentVariable_1.EnvironmentVariable.getString,
    [environmentVariable_1.EVType.Number]: environmentVariable_1.EnvironmentVariable.getNumber,
    [environmentVariable_1.EVType.JSON]: environmentVariable_1.EnvironmentVariable.getJSON
};
const useEnvironmentVariable = (webApi, name, type) => {
    const [envVar, setEnvVar] = React.useState();
    React.useEffect(() => {
        RequestsMapper[type](webApi, name)
            .then(setEnvVar);
    }, [name]);
    return envVar;
};
exports.useEnvironmentVariable = useEnvironmentVariable;
