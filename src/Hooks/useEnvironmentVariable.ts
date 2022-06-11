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

export interface TypesMap {
  [EnvironmentVariableTypes.Boolean]: Boolean;
  [EnvironmentVariableTypes.DataSource]: string;
  [EnvironmentVariableTypes.JSON]: JSONValue;
  [EnvironmentVariableTypes.Number]: Number;
  [EnvironmentVariableTypes.String]: string;
}

export const useEnvironmentVariable = 
<TInput extends EnvironmentVariableTypes, T extends TypesMap[TInput]>(webAPI: any, name: string, type: TInput)=> {  
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
        getString(webAPI, name).then((val) => setEnvVar(val as EnvironmentVariableType<T>)).then(success).catch(fail);
        return;
      }
      if(type===EnvironmentVariableTypes.Number){
        getNumber(webAPI, name).then((val) => setEnvVar(val as EnvironmentVariableType<T>)).then(success).catch(fail);
        return;
      }
      if(type===EnvironmentVariableTypes.Boolean){
        getBoolean(webAPI, name).then((val) => setEnvVar(val as EnvironmentVariableType<T>)).then(success).catch(fail);
        return;
      }
      if(type===EnvironmentVariableTypes.JSON){
        getJSON(webAPI, name).then((val) => setEnvVar(val as EnvironmentVariableType<T>)).then(success).catch(fail);
        return;
      }
      if(type===EnvironmentVariableTypes.DataSource){
        getString(webAPI, name).then((val) => setEnvVar(val as EnvironmentVariableType<T>)).then(success).catch(fail);
        return;
      } 
    /*    RequestsMapper[_type](webAPI, name).then((val) => setEnvVar(val as EnvironmentVariableType<T>));
        */
     }, [name]);

    return {value: envVar as EnvironmentVariableType<T>, isLoading, errorMessage};
}


