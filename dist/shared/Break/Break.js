"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Break = Break;
const react_1 = __importDefault(require("react"));
const break_css_1 = __importDefault(require("./break.css"));
const classnames_1 = __importDefault(require("classnames"));
function Break(props) {
    const { inline = false, top = false, size, mobileSize, tabletSize, desktopSize, } = props;
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)(break_css_1.default[`s${size}`], { [break_css_1.default[`mobile_s${mobileSize}`]]: mobileSize }, { [break_css_1.default[`tablet_s${tabletSize}`]]: tabletSize }, { [break_css_1.default[`desktop_s${desktopSize}`]]: desktopSize }, { [break_css_1.default.inline]: inline }, { [break_css_1.default.top]: top }) }));
}
//# sourceMappingURL=Break.js.map