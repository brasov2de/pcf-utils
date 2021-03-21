export interface IEnvVar_value {
    environmentvariablevalueid?: string;
    value?: any;
}
export interface IEnvVar_definition {
    defaultvalue?: any;
    displayname: string;
    environmentvariabledefinition_environmentvariablevalue: IEnvVar_value[];
    environmentvariabledefinitionid?: string;
    schemaname: string;
}
export interface IEV {
    name: string;
    value?: string;
    defaultValue?: string;
    displayName: string;
}
export declare enum EVType {
    String = 100000000,
    Number = 100000001,
    Boolean = 100000002,
    JSON = 100000003,
    ConnectionReference = 100000004
}
export declare const EnvironmentVariable: {
    getString: (webApi: any, name: string, userId?: string | undefined) => Promise<string | undefined>;
    getJSON: (webApi: any, name: string, userId?: string | undefined) => Promise<any>;
    getNumber: (webApi: any, name: string, userId?: string | undefined) => Promise<Number | undefined>;
    getBoolean: (webApi: any, name: string, userId?: string | undefined) => Promise<Boolean | undefined>;
};
