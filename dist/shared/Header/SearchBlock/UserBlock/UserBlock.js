"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBlock = UserBlock;
const react_1 = __importDefault(require("react"));
const Break_1 = require("../../../Break");
const Text_1 = require("../../../Text");
const Icons_1 = require("../../../Icons");
const userblock_css_1 = __importDefault(require("./userblock.css"));
function UserBlock({ avatarSrc, username }) {
    return (react_1.default.createElement("a", { href: `https://www.reddit.com/api/v1/authorize?client_id=SI6_ql3msvAkDVKeffKG_w&response_type=code&state=random_string&redirect_uri=http://localhost:3000/auth&duration=permanent&scope=read%20submit%20identity`, className: userblock_css_1.default.userBox },
        react_1.default.createElement("div", { className: userblock_css_1.default.avatarBox }, avatarSrc
            ? react_1.default.createElement("img", { src: avatarSrc, alt: "user avatar", className: userblock_css_1.default.avatarImage })
            : react_1.default.createElement(Icons_1.IconAnon, null)),
        react_1.default.createElement("div", { className: userblock_css_1.default.username },
            react_1.default.createElement(Break_1.Break, { size: 12 }),
            react_1.default.createElement(Text_1.Text, { size: 20, color: username ? Text_1.EColor.black : Text_1.EColor.gray99 }, username || 'Аноним'))));
}
//# sourceMappingURL=UserBlock.js.map