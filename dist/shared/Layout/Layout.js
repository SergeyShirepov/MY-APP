"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layout = Layout;
const react_1 = __importDefault(require("react"));
const layout_css_1 = __importDefault(require("./layout.css"));
function Layout({ children }) {
    return (react_1.default.createElement("div", { className: layout_css_1.default.layout }, children));
}
//# sourceMappingURL=Layout.js.map