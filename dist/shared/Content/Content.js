"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Content = Content;
const react_1 = __importDefault(require("react"));
const content_css_1 = __importDefault(require("./content.css"));
function Content({ children }) {
    return (react_1.default.createElement("main", { className: content_css_1.default.content }, children));
}
//# sourceMappingURL=Content.js.map