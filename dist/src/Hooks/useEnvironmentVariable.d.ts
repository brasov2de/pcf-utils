import { EnvironmentVariableType, EnvironmentVariableTypes, JSONValue } from "../Utils/environmentVariable";
export declare const useEnvironmentVariable: <T extends string | Number | Boolean | JSONValue = string>(webAPI: any, name: string, type: EnvironmentVariableTypes) => EnvironmentVariableType<T> | undefined;
