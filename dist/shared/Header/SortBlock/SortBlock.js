"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortBlock = SortBlock;
const react_1 = __importDefault(require("react"));
const sortblock_css_1 = __importDefault(require("./sortblock.css"));
function SortBlock() {
    return (react_1.default.createElement("div", { className: sortblock_css_1.default.sortblock }, "sorting dropdown"));
}
//# sourceMappingURL=SortBlock.js.map