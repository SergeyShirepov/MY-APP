"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericList = GenericList;
const react_1 = __importDefault(require("react"));
const noop = () => { };
function GenericList({ list }) {
    return (react_1.default.createElement(react_1.default.Fragment, null, list.map(({ As = 'div', text, onClick = noop, className, id, href }) => (react_1.default.createElement(As, { className: className, onClick: () => onClick(id), key: id, href: href }, text)))));
}
//# sourceMappingURL=genericlist.js.map