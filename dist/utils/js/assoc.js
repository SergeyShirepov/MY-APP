"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assoc = assoc;
function assoc(key, value) {
    return (obj) => (Object.assign(Object.assign({}, obj), { [key]: value }));
}
//# sourceMappingURL=assoc.js.map