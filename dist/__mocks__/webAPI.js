"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mockedResult = [];
const webApi = {
    retrieveMultipleRecords: jest.fn((entityName) => {
        if (entityName === "environmentvariable") {
            return Promise.resolve({ entities: mockedResult });
        }
        return Promise.resolve({ entities: [] });
    })
};
exports.default = webApi;
