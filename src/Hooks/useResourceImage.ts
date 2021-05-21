import {useState, useEffect } from 'react';

export const getResourceImagePromise = (resources: any, resourceName: string, fileType : string): Promise<string> => {
    return new Promise((resolve, reject) => {
        resources.getResource(resourceName, (fileContent : string)=> {
            resolve(`data:image/${fileType==="svg"?"svg+xml":fileType};base64,${fileContent}`);
        }, reject);
    });
}

export const useResourceImage = (resources: any, resourceName: string, fileType : string ) => { 
    const [imageSrc, setImageSrc ] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState<boolean|undefined>();
    const [errorMessage, setErrorMessage] = useState<string|undefined>();

    useEffect(() => {
        if(resourceName==null || resourceName ==="") {
            return;
        }
        setIsLoading(true);
        setErrorMessage(undefined);
        getResourceImagePromise(resources, resourceName, fileType).then((content)=> {
            setImageSrc(content);
            setIsLoading(false);
        }, (e:any)=> {
            console.error(e);
            setIsLoading(false);
            setErrorMessage(e?.message ?? e);
        })
    }, [resourceName, fileType]);

    return {src: imageSrc, isLoading, errorMessage};
}

export const useResourceImages = (resources: any, resourceNames: string[], fileType: string) => {
    const [images, setImages] = useState<string[]>([]);
    useEffect(() => {
        Promise.all(resourceNames.map((name) => getResourceImagePromise(resources, name, fileType)))
        .then(setImages).catch(console.error);
    }, [...resourceNames]);
    return images;
}