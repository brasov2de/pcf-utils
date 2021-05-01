export interface IEnvVar_value {
    environmentvariablevalueid?: string;
    value?: any;
}
export interface IEnvVar_definition {
    defaultvalue?: any;
    environmentvariabledefinition_environmentvariablevalue: IEnvVar_value[];
    environmentvariabledefinitionid?: string;
    schemaname: string;
}
export interface IEV {
    value?: string;
    defaultValue?: string;
}
export declare type EnvironmentVariableType<T extends string | Number | Boolean | JSONValue> = T extends string ? string | undefined : T extends Number ? Number | undefined : T extends Boolean ? Boolean | undefined : T extends JSONValue ? JSONValue | undefined : string | undefined;
export declare enum EnvironmentVariableTypes {
    String = 100000000,
    Number = 100000001,
    Boolean = 100000002,
    JSON = 100000003,
    DataSource = 100000004
}
export interface JSONValue {
    [key: string]: string;
}
export declare const get: (webApi: any, name: string, type: EnvironmentVariableTypes) => Promise<IEV>;
export declare const getString: (webApi: any, name: string) => Promise<EnvironmentVariableType<string>>;
export declare const getJSON: (webApi: any, name: string) => Promise<EnvironmentVariableType<JSONValue>>;
export declare const getNumber: (webApi: any, name: string) => Promise<EnvironmentVariableType<Number>>;
export declare const getBoolean: (webApi: any, name: string) => Promise<EnvironmentVariableType<Boolean>>;
