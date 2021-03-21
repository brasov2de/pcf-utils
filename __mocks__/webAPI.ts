import { IEnvVar_definition } from "../src/Utils/environmentVariable";


const mockedResult : IEnvVar_definition[] = [];

const webApi = {    
    retrieveMultipleRecords: jest.fn((entityName: string) =>{ 
        if(entityName==="environmentvariable"){
            return Promise.resolve({ entities: mockedResult })
        }
        return Promise.resolve({ entities: [] });
    })
}


export default webApi;

