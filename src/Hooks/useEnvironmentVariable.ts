import * as React from "react";
import  {EnvironmentVariable, EVType, JSONValue} from "../Utils/environmentVariable";

const RequestsMapper = {
    [EVType.Boolean] : EnvironmentVariable.getBoolean, 
    [EVType.String] : EnvironmentVariable.getString, 
    [EVType.Number] : EnvironmentVariable.getNumber, 
    [EVType.JSON] : EnvironmentVariable.getJSON
}


export const useEnvironmentVariable = (webApi: any, name: string, type: EVType) => {
    const [envVar, setEnvVar] = React.useState<string | Boolean | Number | JSONValue | undefined>();

    React.useEffect(() => {
        RequestsMapper[type](webApi, name)
            .then(setEnvVar);
    }, [name]);

    return envVar;
}




