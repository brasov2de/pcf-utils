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

export const useEnvironmentVariable = <T  extends string | Number | Boolean | JSONValue = string >(webAPI: any, name: string, type: EnvironmentVariableTypes, useStorageCache: boolean = true)=> {  
  const [envVar, setEnvVar] = useState<EnvironmentVariableType<T> | undefined >();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string|undefined>();

  const success = () => {    
    setIsLoading(false);  
  }
  const fail= (e: Error) => {
    setIsLoading(false);
    setErrorMessage(e?.message ?? e);
  }

    useEffect(() => {   
      setIsLoading(true);    
      setErrorMessage(undefined);
      if(type===EnvironmentVariableTypes.String){
        getString(webAPI, name, useStorageCache).then((val) => setEnvVar(val as EnvironmentVariableType<T>)).then(success).catch(fail);
        return;
      }
      if(type===EnvironmentVariableTypes.Number){
        getNumber(webAPI, name, useStorageCache).then((val) => setEnvVar(val as EnvironmentVariableType<T>)).then(success).catch(fail);
        return;
      }
      if(type===EnvironmentVariableTypes.Boolean){
        getBoolean(webAPI, name, useStorageCache).then((val) => setEnvVar(val as EnvironmentVariableType<T>)).then(success).catch(fail);
        return;
      }
      if(type===EnvironmentVariableTypes.JSON){
        getJSON(webAPI, name, useStorageCache).then((val) => setEnvVar(val as EnvironmentVariableType<T>)).then(success).catch(fail);
        return;
      }
      if(type===EnvironmentVariableTypes.DataSource){
        getString(webAPI, name, useStorageCache).then((val) => setEnvVar(val as EnvironmentVariableType<T>)).then(success).catch(fail);
        return;
      } 
    /*    RequestsMapper[_type](webAPI, name).then((val) => setEnvVar(val as EnvironmentVariableType<T>));
        */
     }, [name]);

    return {value: envVar as EnvironmentVariableType<T>, isLoading, errorMessage};
}


