import {EnvironmentVariable, EVType, IEV}  from "./environmentVariable"
import webApi from '../../__mocks__/webAPI';


describe('String', () => {
    beforeEach(() => {
        webApi.retrieveMultipleRecords.mockClear();
        sessionStorage.clear();
    })
    test('Only default was set', async () => {     
        //setup
        const name= "string1";
        webApi.retrieveMultipleRecords.mockResolvedValueOnce({ 
            entities: [{
            schemaname: name, 
            defaultvalue : "ok default",              
            displayname : "String1", 
            environmentvariabledefinition_environmentvariablevalue: []                    
            }]
        }); 
        //test
        const val = await EnvironmentVariable.getString(webApi, name);
        expect(webApi.retrieveMultipleRecords).toHaveBeenCalledTimes(1);
        expect(webApi.retrieveMultipleRecords).toHaveBeenLastCalledWith("environmentvariabledefinition",`?$select=schemaname,defaultvalue,displayname&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)&$filter=schemaname eq '${name}' and type eq ${EVType.String}`);      
        expect(val).toBe("ok default");
    });
    test('Value was set', async () => {     
        //setup
        const name= "string1";
        webApi.retrieveMultipleRecords.mockResolvedValueOnce({ 
            entities: [{
            schemaname: name, 
            defaultvalue : "this was default",              
            displayname : "String1", 
            environmentvariabledefinition_environmentvariablevalue: [{value: "ok"}]                
            }]
        });
        //test
        const val = await EnvironmentVariable.getString(webApi, name);
        expect(webApi.retrieveMultipleRecords).toHaveBeenLastCalledWith("environmentvariabledefinition",`?$select=schemaname,defaultvalue,displayname&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)&$filter=schemaname eq '${name}' and type eq ${EVType.String}`);  
        expect(val).toBe("ok");
    });
  
    test('Solution name set', async () => {     
        //setup
        const name= "string1";        
        webApi.retrieveMultipleRecords.mockResolvedValueOnce({ 
            entities: [{
            schemaname: name, 
            defaultvalue : "this was default",              
            displayname : "String1", 
            environmentvariabledefinition_environmentvariablevalue: [{value: "ok"}]                
            }]
        });
        //test
        const val = await EnvironmentVariable.getString(webApi, name);
        expect(webApi.retrieveMultipleRecords).toHaveBeenLastCalledWith("environmentvariabledefinition",`?$select=schemaname,defaultvalue,displayname&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)&$filter=schemaname eq '${name}' and type eq ${EVType.String}`);      
        expect(val).toBe("ok");
    });
    test('not found (solution name not found)', async () => {     
         //setup
         const name= "string1";         
         webApi.retrieveMultipleRecords.mockResolvedValueOnce({ 
             entities: []
         });
         //test
         const val = await EnvironmentVariable.getString(webApi, name);
         expect(webApi.retrieveMultipleRecords).toHaveBeenLastCalledWith("environmentvariabledefinition",`?$select=schemaname,defaultvalue,displayname&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)&$filter=schemaname eq '${name}' and type eq ${EVType.String}`);
         expect(val).not.toBeDefined();          
    }); 
    test('raise an error', () => {
         //setup
         const name= "string1";       
         webApi.retrieveMultipleRecords.mockRejectedValueOnce('Could not be resolved');         
         //test
         return expect(EnvironmentVariable.getString(webApi, name)).rejects.toEqual('Could not be resolved'); 
    });
    
});


describe('JSON', () => {
    
    beforeEach(() => {
        webApi.retrieveMultipleRecords.mockClear();
        sessionStorage.clear();
    })
    test('Only default was set', async () => {     
        //setup
        const name= "json1";
        webApi.retrieveMultipleRecords.mockResolvedValueOnce({ 
            entities: [{
            schemaname: name, 
            defaultvalue : '{"prop": "ok default"}',
            displayname : "JSON1", 
            environmentvariabledefinition_environmentvariablevalue: []                    
            }]
        });
        //test
        const val = await EnvironmentVariable.getJSON(webApi, name);
        expect(webApi.retrieveMultipleRecords).toHaveBeenCalledTimes(1);
        expect(webApi.retrieveMultipleRecords).toHaveBeenLastCalledWith("environmentvariabledefinition",`?$select=schemaname,defaultvalue,displayname&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)&$filter=schemaname eq '${name}' and type eq ${EVType.JSON}`);        
        expect(val).toHaveProperty("prop");
        expect(val?.prop).toBe("ok default");
    });
    test('Value was set', async () => {     
        //setup
        const name= "json1";
        webApi.retrieveMultipleRecords.mockResolvedValueOnce({ 
            entities: [{
            schemaname: name, 
            defaultvalue : '{"prop": "ok default"}',              
            displayname : "JSON1", 
            environmentvariabledefinition_environmentvariablevalue: [{value: '{"prop": "ok"}'}]                
            }]
        });
        //test
        const val = await EnvironmentVariable.getJSON(webApi, name);
        expect(webApi.retrieveMultipleRecords).toHaveBeenLastCalledWith("environmentvariabledefinition",`?$select=schemaname,defaultvalue,displayname&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)&$filter=schemaname eq '${name}' and type eq ${EVType.JSON}`);        
        expect(val).toHaveProperty("prop");
        expect(val?.prop).toBe("ok");
    });
  
    test('Solution name set', async () => {     
        //setup
        const name= "json1";        
        webApi.retrieveMultipleRecords.mockResolvedValueOnce({ 
            entities: [{
            schemaname: name, 
            defaultvalue : '{"prop": "ok default"}',              
            displayname : "Json1", 
            environmentvariabledefinition_environmentvariablevalue: [{value: '{"prop": "ok"}'}]                
            }]
        });
        //test
        const val = await EnvironmentVariable.getJSON(webApi, name);
        expect(webApi.retrieveMultipleRecords).toHaveBeenLastCalledWith("environmentvariabledefinition",`?$select=schemaname,defaultvalue,displayname&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)&$filter=schemaname eq '${name}' and type eq ${EVType.JSON}`);        
        expect(val).toHaveProperty("prop");
        expect(val?.prop).toBe("ok");
    });
    test('not found (solution name not found)', async () => {     
         //setup
         const name= "json1";
         
         webApi.retrieveMultipleRecords.mockResolvedValueOnce({ 
             entities: []
         });
         //test
         const val = await EnvironmentVariable.getJSON(webApi, name );
         expect(webApi.retrieveMultipleRecords).toHaveBeenLastCalledWith("environmentvariabledefinition",`?$select=schemaname,defaultvalue,displayname&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)&$filter=schemaname eq '${name}' and type eq ${EVType.JSON}`);
         expect(val).not.toBeDefined();          
    }); 
    test('raise an error', () => {
         //setup
         const name= "string1";       
         webApi.retrieveMultipleRecords.mockRejectedValueOnce('Could not be resolved');         
         //test
         return expect(EnvironmentVariable.getJSON(webApi, name)).rejects.toEqual('Could not be resolved');
    });
    test('defaultValue is not a JSON',  () => {
        //setup
        const name= "json1";        
        webApi.retrieveMultipleRecords.mockResolvedValueOnce({ 
            entities: [{
            schemaname: name, 
            defaultvalue : 'This is NOT a JSON and should throw an error',              
            displayname : "Json1", 
            environmentvariabledefinition_environmentvariablevalue: []                
            }]
        });        
        //test
        return expect(EnvironmentVariable.getJSON(webApi, name)).rejects.toThrowError();       
    });
    test('value is not a JSON',  () => {
        //setup
        const name= "json1";        
        webApi.retrieveMultipleRecords.mockResolvedValueOnce({ 
            entities: [{
            schemaname: name, 
            defaultvalue : "{'value': 'default value'}",              
            displayname : "Json1", 
            environmentvariabledefinition_environmentvariablevalue: [{value: 'NOT a JSON, will throw an error'}]                
            }]
        });        
        //test
        return expect(EnvironmentVariable.getJSON(webApi, name)).rejects.toThrowError();       
    });
    
});

describe('JSON', () => {
    beforeEach(() => {
        webApi.retrieveMultipleRecords.mockClear();        
        sessionStorage.clear();
    })
    test('Only default was set', async () => {     
        //setup
        const name= "SuperEnvVar";
        webApi.retrieveMultipleRecords.mockResolvedValueOnce({ 
            entities: [{
            schemaname: name, 
            defaultvalue : '{"prop": "ok default"}',
            displayname : "JSON1", 
            environmentvariabledefinition_environmentvariablevalue: []                    
            }]
        });
        //test
        const val = await EnvironmentVariable.getJSON(webApi, name);
        expect(webApi.retrieveMultipleRecords).toHaveBeenCalledTimes(1);
        expect(webApi.retrieveMultipleRecords).toHaveBeenLastCalledWith("environmentvariabledefinition",`?$select=schemaname,defaultvalue,displayname&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)&$filter=schemaname eq '${name.toLowerCase()}' and type eq ${EVType.JSON}`);        
        expect(val).toHaveProperty("prop");
        expect(val?.prop).toBe("ok default");

        const val1 = await EnvironmentVariable.getJSON(webApi, name);       
        expect(webApi.retrieveMultipleRecords).toHaveBeenCalledTimes(1);      
        expect(val1).toHaveProperty("prop");
        expect(val1?.prop).toBe("ok default");
    });
    test('Only default was set', async () => {     
        //setup
        const name1= "SuperEnvVar";
        webApi.retrieveMultipleRecords.mockResolvedValueOnce({ 
            entities: [{
            schemaname: name1, 
            defaultvalue : '{"prop": "ok default"}',
            displayname : "JSON1", 
            environmentvariabledefinition_environmentvariablevalue: []                    
            }]
        });
        //test
        const val = await EnvironmentVariable.getJSON(webApi, name1);
        expect(webApi.retrieveMultipleRecords).toHaveBeenCalledTimes(1);
        expect(webApi.retrieveMultipleRecords).toHaveBeenLastCalledWith("environmentvariabledefinition",`?$select=schemaname,defaultvalue,displayname&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)&$filter=schemaname eq '${name1.toLowerCase()}' and type eq ${EVType.JSON}`);        
        expect(val).toHaveProperty("prop");
        expect(val?.prop).toBe("ok default");
      
        const name2= "AnotherEnvVar"
        webApi.retrieveMultipleRecords.mockResolvedValueOnce({ 
            entities: [{
            schemaname: name2, 
            defaultvalue : '{"prop": "super value"}',
            displayname : "JSON1", 
            environmentvariabledefinition_environmentvariablevalue: []                    
            }]
        });

        const val2 = await EnvironmentVariable.getJSON(webApi, name2);       
        expect(webApi.retrieveMultipleRecords).toHaveBeenCalledTimes(2);      
        expect(val2).toHaveProperty("prop");
        expect(val2?.prop).toBe("super value");


        //first from storage
        const valStorage = await EnvironmentVariable.getJSON(webApi, name1);
        expect(webApi.retrieveMultipleRecords).toHaveBeenCalledTimes(2); //no new request
        expect(valStorage).toHaveProperty("prop");
        expect(valStorage?.prop).toBe("ok default");

        //second from storage
        const val2Storage = await EnvironmentVariable.getJSON(webApi, name2);       
        expect(webApi.retrieveMultipleRecords).toHaveBeenCalledTimes(2);  //no new request
        expect(val2Storage).toHaveProperty("prop");
        expect(val2Storage?.prop).toBe("super value");
        
      

    });
});