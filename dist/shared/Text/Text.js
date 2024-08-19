"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EColor = void 0;
exports.Text = Text;
const react_1 = __importDefault(require("react"));
const text_css_1 = __importDefault(require("./text.css"));
const classnames_1 = __importDefault(require("classnames"));
var EColor;
(function (EColor) {
    EColor["black"] = "black";
    EColor["orange"] = "orange";
    EColor["green"] = "green";
    EColor["white"] = "white";
    EColor["grayf4"] = "grayf4";
    EColor["grayf3"] = "grayf3";
    EColor["grayEC"] = "grayEC";
    EColor["grayd9"] = "grayd9";
    EColor["grayc4"] = "grayc4";
    EColor["gray99"] = "gray99";
    EColor["gray66"] = "gray66";
})(EColor || (exports.EColor = EColor = {}));
function Text(props) {
    const { As = 'span', color = EColor.black, children, size, mobileSize, desktopSize, tabletSize } = props;
    const classes = (0, classnames_1.default)(text_css_1.default[`s${size}`], { [text_css_1.default[`m${mobileSize}`]]: mobileSize }, { [text_css_1.default[`t${tabletSize}`]]: tabletSize }, { [text_css_1.default[`d${desktopSize}`]]: desktopSize }, text_css_1.default[color]);
    return (react_1.default.createElement(As, { className: classes }, children));
}
//# sourceMappingURL=Text.js.map