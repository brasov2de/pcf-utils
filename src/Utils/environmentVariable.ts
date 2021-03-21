
const STORAGE_PREFIX = "Dianamics.EnvironmentVariables"

export interface IEnvVar_value{
    environmentvariablevalueid ?: string;
    value ?: any;   
}

export interface IEnvVar_definition{
    defaultvalue ?: any;
    displayname : string;
    environmentvariabledefinition_environmentvariablevalue: IEnvVar_value[];
    environmentvariabledefinitionid ?: string;
    schemaname : string;
}

export interface IEV{
    name : string;
    value ?: string,
    defaultValue ?: string,
    displayName : string
}

export enum EVType{
    String = 100000000, 
    Number = 100000001, 
    Boolean = 100000002,
    JSON = 100000003,
    ConnectionReference=100000004
}

let userId : string | undefined;

interface ICache {
    [key: string]: string;
}
const cache : ICache={}

const get = async (webApi : any, name : string, type ?:EVType): Promise<IEV | undefined> => {    
    /* todo const val = myStorage.getStorageValue(name);

    if(val!=null){
        return Promise.resolve(JSON.parse(val));
    }
    */
   const val = cache[name]; 
   if(val!=null){
    return Promise.resolve(JSON.parse(val));
}
    
    const filter =  [
        name !== undefined ? `schemaname eq '${name}'` : undefined, 
        type!==undefined ? `type eq ${type}` : undefined        
    ].filter(Boolean).join(" and ");
    const query = [
        "?$select=", 
        "schemaname,defaultvalue,displayname", 
        "&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)", 
        filter !=="" ? `&$filter=${filter}` : ""
    ].join("");
    //console.log(query);
    const results = await webApi.retrieveMultipleRecords("environmentvariabledefinition", query);
    const ev : IEnvVar_definition = results.entities[0];
    if(ev==null) return undefined 
    
    const defaultValue = ev.defaultvalue;        
    const valFound = ev.environmentvariabledefinition_environmentvariablevalue?.[0]?.value;        
    const ret = {
        name : ev.schemaname,
        value : valFound ?? defaultValue,
        defaultValue : defaultValue,
        displayName : ev.displayname
    };
    cache[name] = JSON.stringify(ret);
    /* todo
    myStorage.setStorageValue(name, JSON.stringify(ret));
    */
    return ret;      
    
}

const getString = async (webApi : any,  name: string): Promise<string | undefined> => {
   const res = await get(webApi, name?.toLowerCase(), EVType.String);
   return res?.value;
}

const getJSON = async (webApi : any,  name: string): Promise<any> => {
    const res = await get(webApi, name?.toLowerCase(), EVType.JSON);
    const val = res?.value;
    return val!=null ? JSON.parse(val) : undefined;
 }

const getNumber = async (webApi : any,  name: string): Promise<Number | undefined> => {
    const res = await get(webApi, name?.toLowerCase(), EVType.Number);
    const val = res?.value;
    return val!=null ? Number.parseFloat(val) : undefined;
 }

 const getBoolean = async (webApi : any,  name: string): Promise<Boolean | undefined> => {
    const res = await get(webApi, name?.toLowerCase(),  EVType.Boolean);
    const val = res?.value;
    return val!=null ? new Boolean(val) : undefined;
 }

export const EnvironmentVariable = {
    getString, 
    getJSON, 
    getNumber, 
    getBoolean
};

