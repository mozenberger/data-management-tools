//>>built
(function(a){"object"===typeof module&&"object"===typeof module.exports?(a=a(require,exports),void 0!==a&&(module.exports=a)):"function"===typeof define&&define.amd&&define(["require","exports","./Patch","./Pointer"],a)})(function(a,b){Object.defineProperty(b,"__esModule",{value:!0});var c=a("./Patch"),d=a("./Pointer");b.add=function(a,b){return{op:c.OperationType.ADD,path:new d.Pointer(a.path),value:b}};b.replace=function(a,b){return{op:c.OperationType.REPLACE,path:new d.Pointer(a.path),value:b}};
b.remove=function(a){return{op:c.OperationType.REMOVE,path:new d.Pointer(a.path)}};b.test=function(a,b){return{op:c.OperationType.TEST,path:new d.Pointer(a.path),value:b}}});