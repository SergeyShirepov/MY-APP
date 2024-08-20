"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = Header;
const react_1 = __importDefault(require("react"));
const header_css_1 = __importDefault(require("./header.css"));
const SearchBlock_1 = require("./SearchBlock");
const ThreadTitle_1 = require("./ThreadTitle");
const SortBlock_1 = require("./SortBlock");
function Header() {
    return (react_1.default.createElement("header", { className: header_css_1.default.header },
        react_1.default.createElement(SearchBlock_1.SearchBlock, null),
        react_1.default.createElement(ThreadTitle_1.ThreadTitle, null),
        react_1.default.createElement(SortBlock_1.SortBlock, null)));
}
//# sourceMappingURL=Header.js.map