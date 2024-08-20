"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChecked = exports.getValue = void 0;
function pickFromSyntheticEvent() {
    return (key) => (fn) => (e) => fn(e.currentTarget[key]);
}
exports.getValue = pickFromSyntheticEvent()('value');
exports.getChecked = pickFromSyntheticEvent()('checked');
//# sourceMappingURL=pickFromSyntheticEvent.js.map