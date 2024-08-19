"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = merge;
function merge(Obj) {
    return (obj2) => (Object.assign(Object.assign({}, Obj), obj2));
}
//# sourceMappingURL=merge.js.map