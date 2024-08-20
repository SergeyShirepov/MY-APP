"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preventDefault = preventDefault;
function preventDefault(fn) {
    return (e) => {
        e.preventDefault();
        fn(e);
    };
}
//# sourceMappingURL=preventDefault.js.map