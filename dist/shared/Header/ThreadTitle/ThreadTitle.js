"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadTitle = ThreadTitle;
const react_1 = __importDefault(require("react"));
const ThreadTitle_css_1 = __importDefault(require("./ThreadTitle.css"));
function ThreadTitle() {
    return (react_1.default.createElement("h1", { className: ThreadTitle_css_1.default.threadTitle }, "Header"));
}
//# sourceMappingURL=ThreadTitle.js.map