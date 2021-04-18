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
export declare enum EVType {
    String = 100000000,
    Number = 100000001,
    Boolean = 100000002,
    JSON = 100000003
}
export interface JSONValue {
    [key: string]: string;
}
export declare const EnvironmentVariable: {
    get: (webApi: any, name: string, type: EVType) => Promise<IEV>;
    getString: (webApi: any, name: string) => Promise<string | undefined>;
    getJSON: (webApi: any, name: string) => Promise<JSONValue | undefined>;
    getNumber: (webApi: any, name: string) => Promise<Number | undefined>;
    getBoolean: (webApi: any, name: string) => Promise<Boolean | undefined>;
};
