
const STORAGE_PREFIX = "Dianamics.EnvironmentVariables"

export interface IEnvVar_value{
    environmentvariablevalueid ?: string;
    value ?: any;   
}

export interface IEnvVar_definition{
    defaultvalue ?: any;  
    environmentvariabledefinition_environmentvariablevalue: IEnvVar_value[];
    environmentvariabledefinitionid ?: string;
    schemaname : string;
}

export interface IEV{  
    value ?: string;
    defaultValue ?: string;
}

export type EnvironmentVariableType<T extends string | Number | Boolean | JSONValue> = T extends string 
            ? string | undefined
            : T extends Number
                ? Number  | undefined
                : T extends Boolean 
                    ? Boolean | undefined
                    : T extends JSONValue
                        ? JSONValue | undefined
                        : string | undefined;                        
                        


export enum EnvironmentVariableTypes{
    String = 100000000, 
    Number = 100000001, 
    Boolean = 100000002,
    JSON = 100000003,
    DataSource =100000004
}

let userId : string | undefined;

export interface JSONValue {
    [key: string]: string;
}

interface ICache {
    [key: string]: string;
}
let cache : ICache={}

export const clearCache = () => {
    cache ={};
}

export const get = async (webApi : any, name : string, type :EnvironmentVariableTypes): Promise<IEV> => {    
        
   let val : string | null | undefined = cache[name]; 
   if(val!=null){
        return Promise.resolve(JSON.parse(val));
    }
    val = sessionStorage.getItem(`[${STORAGE_PREFIX}] ${name}`);

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
    if(ev==null) return {
        value : undefined, 
        defaultValue : undefined
    } 
    
    const defaultValue = ev.defaultvalue;        
    const valFound = ev.environmentvariabledefinition_environmentvariablevalue?.[0]?.value;        
    const ret = {        
        value : valFound ?? defaultValue,
        defaultValue : defaultValue,      
    };
    cache[name] = JSON.stringify(ret);
    
    sessionStorage.setItem(`[${STORAGE_PREFIX}] ${name}`, JSON.stringify(ret));
    
    return ret;      
    
}

export const getString = async (webApi : any,  name: string): Promise<EnvironmentVariableType<string>> => {
   const res = await get(webApi, name?.toLowerCase(), EnvironmentVariableTypes.String);
   return res?.value;
}

export const getJSON = async (webApi : any,  name: string): Promise<EnvironmentVariableType<JSONValue>> => {
    const res = await get(webApi, name?.toLowerCase(), EnvironmentVariableTypes.JSON);
    const val = res?.value;
    try{
    return val!=null ? JSON.parse(val) : undefined;
    }
    catch(e){
        return undefined;
    }
 }

export const getNumber = async (webApi : any,  name: string): Promise< EnvironmentVariableType<Number>> => {
    const res = await get(webApi, name?.toLowerCase(), EnvironmentVariableTypes.Number);
    const val = res?.value;
    return val!=null ? Number.parseFloat(val) : undefined;
 }

 export const getBoolean = async (webApi : any,  name: string): Promise< EnvironmentVariableType<Boolean>> => {
    const res = await get(webApi, name?.toLowerCase(),  EnvironmentVariableTypes.Boolean);
    const val = res?.value;
    return val!=null ? new Boolean(val) : undefined;
 }


