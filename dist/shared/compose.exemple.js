"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const pickFromSyntheticEvent_1 = require("../utils/react/pickFromSyntheticEvent");
const preventDefault_1 = require("../utils/react/preventDefault");
const stopPropagation_1 = require("../utils/react/stopPropagation");
function InputExample({ value, onChange }) {
    return (react_1.default.createElement("input", { value: value, 
        // onChange={preventDefault(stopPropagation(getValue(onChange)))}
        // onChange={compose(onChange, getValue, stopPropagation, preventDefault)}
        onChange: pipe(preventDefault_1.preventDefault, stopPropagation_1.stopPropagation, pickFromSyntheticEvent_1.getValue, onChange) }));
}
function compose(...fns) {
    return (initialValue) => fns.reduceRight((previousValue, fn) => fn(previousValue), initialValue);
}
function pipe(...fns) {
    return (initialValue) => fns.reduce((previousValue, fn) => fn(previousValue), initialValue);
}
function pick(prop) {
    return (obj) => obj[prop];
}
function isEqual(left) {
    return (right) => left === right;
}
//# sourceMappingURL=compose.exemple.js.map