import {useState, useEffect } from 'react';

export const useResourceImage = (resources: any, name: string, fileType : string ) => { 
    const [imageUrl, setImageUrl ] = useState<string | undefined>();
    useEffect(() => {
        resources.getResource(name, (fileContent : string)=> {
            setImageUrl(`data:image/${fileType};base64${fileContent}`);
        }, console.error)
    }, [name, fileType]);
    return imageUrl;
}