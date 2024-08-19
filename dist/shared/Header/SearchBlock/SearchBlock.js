"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchBlock = SearchBlock;
const react_1 = __importDefault(require("react"));
const searchblock_css_1 = __importDefault(require("./searchblock.css"));
const UserBlock_1 = require("./UserBlock/UserBlock");
function SearchBlock() {
    return (react_1.default.createElement("div", { className: searchblock_css_1.default.serchblock },
        react_1.default.createElement(UserBlock_1.UserBlock, null)));
}
//# sourceMappingURL=SearchBlock.js.map