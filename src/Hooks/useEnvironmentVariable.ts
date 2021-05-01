import * as React from "react";
import  {EnvironmentVariable, EnvironmentVariableType, EVType, JSONValue} from "../Utils/environmentVariable";

const RequestsMapper = {
    [EVType.Boolean] : EnvironmentVariable.getBoolean, 
    [EVType.String] : EnvironmentVariable.getString, 
    [EVType.Number] : EnvironmentVariable.getNumber, 
    [EVType.JSON] : EnvironmentVariable.getJSON, 
    [EVType.DataSource] : EnvironmentVariable.getString
}

export const useEnvironmentVariable = <T  extends string | Number | Boolean | JSONValue = string >(webAPI: any, name: string, _type: EVType) : EnvironmentVariableType<T> => {  
  const [envVar, setEnvVar] = React.useState<EnvironmentVariableType<T>>();
    React.useEffect(() => {        
        RequestsMapper[_type](webAPI, name).then((val) => setEnvVar(val as EnvironmentVariableType<T>));
     }, [name]);

    return envVar;
}

