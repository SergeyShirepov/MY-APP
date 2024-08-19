"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopPropagation = stopPropagation;
function stopPropagation(fn) {
    return (e) => {
        e.stopPropagation();
        fn(e);
    };
}
//# sourceMappingURL=stopPropagation.js.map