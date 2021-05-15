"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useResourceImage = void 0;
var react_1 = require("react");
var useResourceImage = function (resources, name, fileType) {
    var _a = react_1.useState(), imageUrl = _a[0], setImageUrl = _a[1];
    react_1.useEffect(function () {
        resources.getResource(name, function (fileContent) {
            setImageUrl("data:image/" + fileType + ";base64" + fileContent);
        }, console.error);
    }, [name, fileType]);
    return imageUrl;
};
exports.useResourceImage = useResourceImage;
