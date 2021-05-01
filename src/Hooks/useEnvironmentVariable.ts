import * as React from "react";
import  {EnvironmentVariable, EnvironmentVariableType, EnvironmentVariableTypes, JSONValue} from "../Utils/environmentVariable";
/*
const RequestsMapper = {
    [EnvironmentVariableTypes.Boolean] : EnvironmentVariable.getBoolean, 
    [EnvironmentVariableTypes.String] : EnvironmentVariable.getString, 
    [EnvironmentVariableTypes.Number] : EnvironmentVariable.getNumber, 
    [EnvironmentVariableTypes.JSON] : EnvironmentVariable.getJSON, 
    [EnvironmentVariableTypes.DataSource] : EnvironmentVariable.getString
}*/

export const useEnvironmentVariable = <T  extends string | Number | Boolean | JSONValue = string >(webAPI: any, name: string, type: EnvironmentVariableTypes)=> {  
  const [envVar, setEnvVar] = React.useState<EnvironmentVariableType<T> | undefined >();
    React.useEffect(() => {       
      if(type===EnvironmentVariableTypes.String){
        EnvironmentVariable.getString(webAPI, name).then((val) => setEnvVar(val as EnvironmentVariableType<T>));
        return;
      }
      if(type===EnvironmentVariableTypes.Number){
        EnvironmentVariable.getNumber(webAPI, name).then((val) => setEnvVar(val as EnvironmentVariableType<T>));
        return;
      }
      if(type===EnvironmentVariableTypes.Boolean){
        EnvironmentVariable.getBoolean(webAPI, name).then((val) => setEnvVar(val as EnvironmentVariableType<T>));
        return;
      }
      if(type===EnvironmentVariableTypes.JSON){
        EnvironmentVariable.getJSON(webAPI, name).then((val) => setEnvVar(val as EnvironmentVariableType<T>));
        return;
      }
      if(type===EnvironmentVariableTypes.DataSource){
        EnvironmentVariable.getString(webAPI, name).then((val) => setEnvVar(val as EnvironmentVariableType<T>));
        return;
      } 
    /*    RequestsMapper[_type](webAPI, name).then((val) => setEnvVar(val as EnvironmentVariableType<T>));
        */
     }, [name]);

    return envVar;
}

