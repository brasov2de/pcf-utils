declare const _default: {
    EnvironmentVariable: {
        getString: (webApi: any, name: string, userId?: string | undefined) => Promise<string | undefined>;
        getJSON: (webApi: any, name: string, userId?: string | undefined) => Promise<any>;
        getNumber: (webApi: any, name: string, userId?: string | undefined) => Promise<Number | undefined>;
        getBoolean: (webApi: any, name: string, userId?: string | undefined) => Promise<Boolean | undefined>;
    };
};
export default _default;
