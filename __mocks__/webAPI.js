"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mockedResult = [];
var webApi = {
    retrieveMultipleRecords: jest.fn(function (entityName) {
        if (entityName === "environmentvariable") {
            return Promise.resolve({ entities: mockedResult });
        }
        return Promise.resolve({ entities: [] });
    })
};
exports.default = webApi;
