"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = exports.assignId = exports.generateRandomString = void 0;
const assoc_1 = require("../js/assoc");
const generateRandomString = () => Math.random().toString(36).substring(2, 15);
exports.generateRandomString = generateRandomString;
exports.assignId = (0, assoc_1.assoc)('id', (0, exports.generateRandomString)());
// export const generateId = <O extends object>(obj: O) => (assignId)(obj);
const generateId = (obj) => ((0, assoc_1.assoc)("id", (0, exports.generateRandomString)()))(obj);
exports.generateId = generateId;
//# sourceMappingURL=generateRandomIndex.js.map