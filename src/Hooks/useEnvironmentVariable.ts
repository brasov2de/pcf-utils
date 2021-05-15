import {useState, useEffect} from "react";
import  {EnvironmentVariableType, EnvironmentVariableTypes, getBoolean, getJSON, getNumber, getString, JSONValue} from "../Utils/environmentVariable";
/*
const RequestsMapper = {
    [EnvironmentVariableTypes.Boolean] : EnvironmentVariable.getBoolean, 
    [EnvironmentVariableTypes.String] : EnvironmentVariable.getString, 
    [EnvironmentVariableTypes.Number] : EnvironmentVariable.getNumber, 
    [EnvironmentVariableTypes.JSON] : EnvironmentVariable.getJSON, 
    [EnvironmentVariableTypes.DataSource] : EnvironmentVariable.getString
}*/

export const useEnvironmentVariable = <T  extends string | Number | Boolean | JSONValue = string >(webAPI: any, name: string, type: EnvironmentVariableTypes)=> {  
  const [envVar, setEnvVar] = useState<EnvironmentVariableType<T> | undefined >();
    useEffect(() => {       
      if(type===EnvironmentVariableTypes.String){
        getString(webAPI, name).then((val) => setEnvVar(val as EnvironmentVariableType<T>));
        return;
      }
      if(type===EnvironmentVariableTypes.Number){
        getNumber(webAPI, name).then((val) => setEnvVar(val as EnvironmentVariableType<T>));
        return;
      }
      if(type===EnvironmentVariableTypes.Boolean){
        getBoolean(webAPI, name).then((val) => setEnvVar(val as EnvironmentVariableType<T>));
        return;
      }
      if(type===EnvironmentVariableTypes.JSON){
        getJSON(webAPI, name).then((val) => setEnvVar(val as EnvironmentVariableType<T>));
        return;
      }
      if(type===EnvironmentVariableTypes.DataSource){
        getString(webAPI, name).then((val) => setEnvVar(val as EnvironmentVariableType<T>));
        return;
      } 
    /*    RequestsMapper[_type](webAPI, name).then((val) => setEnvVar(val as EnvironmentVariableType<T>));
        */
     }, [name]);

    return envVar;
}


