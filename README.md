# @dianamics\pcf-utils

This npm package is designed for Power Apps Component Framework (PCF). It provides utilities for working with PCF, most of them are React Hooks, which needs to be used in function components.

## How to install

```
npm install @dianamics/pcf-utils
```
# Content 

## Utils\environmentVariable

### Loading value with default value
The purpose of this utility is loading and caching the environmentVariables from Dataverse. It will make the request. It will return the value defined for the environment variable. If no value is found, it will return the default value set in Dataverse.

### Type conversion

Another advantage is the automatically conversion to the types: for instance a JSON env var will return an object, a number env var will return a Number, aso.

### Caching

Another benefit of this environment variables utility, is the possibility to cache the value. It will cache the content, avoiding a second requests. It will also save the retrieved values in sessionStorage. This way, when the user navigates inside the application, the values will be returned directly from the storage. If that is not possible, will make another request.

If you don't wish a caching, set this in the code using
```javascript
setupEnvironmentVariable(false);
```
The default is true.
You could also set the starting part of the sessionStorage key:
```javascript
setupEnvironmentVariable(false, "MyAwesomeRoot.EnvironmentVariable");
```
The default is "Dianamics.EnvironmentVariables"
The sessionStorage key will add the name of the session variable to your key.



## Hooks\useEnvironmentVariable

Making use of environment variable utility, this is a custom React Hook, so it can be used inside React function components.
Example:

```javascript
import {useEnvironmentVariable} from "@dianamics/pcf-utils";

export const PCFComponent({webAPI}) : JSX.Element => {
    const {value, isLoading, errorMessage} = useEnvironmentVariable<string>(webAPI, "orb_chosedImage", EnvironmentVariableTypes.String);  

    //or, if you need more env vars inside the same component
    const secondEnvVar = useEnvironmentVariable<string>(webAPI, "orb_secondName", EnvironmentVariableTypes.String); 
    
}
```
The "webAPI" is the "context.webAPI" property from PCFs. Remember to decalre the webAPI in your PCF manifest 
```xml
<feature-usage>        
    <uses-feature name="WebAPI" required="true" />
</feature-usage>
```

## Hooks\useResourceImage & useResourceImages

This custom Hook is designed to load resources from your PCF.
In order to work, you need first to declare the images in the manifest. Also the utility feature is required.

Example: 
```xml
<?xml version="1.0" encoding="utf-8" ?>
<manifest>
  <control ...>   
     ...    
    <resources>
      <code path="index.ts" order="1"/>
      <img path="images/skating/s1.png"/> 
      <img path="images/skating/s2.png"/> 
      <img path="images/skating/s3.png"/> 
      <img path="images/My.svg"/>       
    </resources>
     <feature-usage>    
      <uses-feature name="Utility" required="true" />      
    </feature-usage>    
  </control>
</manifest>
```

The return of this custom hook contains {src, isLoading, errorMessage}.
Example to get the content of a image in your react function component:
```javascript
import {useResourceImage} from "@dianamics/pcf-utils";

export const PCFComponent({resources}) : JSX.Element => {
   const mySVG = useResourceImage(resources, "images/My.svg", "svg");
   return <img src={mySVG.src}>
}
```
The "resources" is provided by pcf (context.resources).

In case you need to load a bunch of images, you can use "useResourceImages". They only need to be of the same type.
The return of this hook is an array of strings, with all the image content (without indicators of loading or error messages). The error messages will be shown in the console.
Example:
```javascript
import {useResourceImages} from "@dianamics/pcf-utils";

export const PCFComponent({webAPI}) : JSX.Element => {
   const images = const images = useResourceImages(resources, ["images/skating/s1.png", "images/skating/s2.png", "images/skating/s3.png"], "png");
   return (<div>
    {images.map((img) => <img src={img}/>)}
   </div>)
}
```


## Hooks\Dataset\usePaging

This custom hook is supposed to be used for PCFs of type dataset.
It makes it easier to keep track of the current page, first record on the page, last one and there are some navigation methods.

```javascript
import {usePaging} from "@dianamics/pcf-utils";
export const PCFComponent({dataset}) : JSX.Element => {
    const { currentPage, moveNext, movePrevious} = usePaging(dataset);
    //currentPage, firstItemNumber, lastItemNumber, totalRecords
    //moveToFirst,  movePrevious, moveNext
        return (<div>                      
            <button onClick={movePrevious}>Prev</button>
            Page:{currentPage}           
            <button onClick={moveNext}>Next</button> 
        </div>
        )
}

```

## More to come...

## Making of
This package was made using the tsdx [readme tsdx](./README_tsdx.md)


