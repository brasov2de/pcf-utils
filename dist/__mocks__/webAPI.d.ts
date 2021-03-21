/// <reference types="jest" />
import { IEnvVar_definition } from "../src/Utils/environmentVariable";
declare const webApi: {
    retrieveMultipleRecords: jest.Mock<Promise<{
        entities: IEnvVar_definition[];
    }>, [entityName: string]>;
};
export default webApi;
