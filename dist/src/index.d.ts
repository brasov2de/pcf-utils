declare const _default: {
    EnvironmentVariable: {
        getString: (webApi: any, name: string) => Promise<string | undefined>;
        getJSON: (webApi: any, name: string) => Promise<any>;
        getNumber: (webApi: any, name: string) => Promise<Number | undefined>;
        getBoolean: (webApi: any, name: string) => Promise<Boolean | undefined>;
    };
};
export default _default;
