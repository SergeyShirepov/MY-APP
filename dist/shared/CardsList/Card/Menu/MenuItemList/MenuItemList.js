"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItemList = MenuItemList;
const react_1 = __importDefault(require("react"));
const menuitemlist_css_1 = __importDefault(require("./menuitemlist.css"));
const Icons_1 = require("../../../../Icons");
const Text_1 = require("../../../../Text");
const Text_2 = require("../../../../Text");
const postId = 1;
function MenuItemList({ postId }) {
    return (react_1.default.createElement("ul", { className: menuitemlist_css_1.default.menuitemlist },
        react_1.default.createElement("li", { className: menuitemlist_css_1.default.menuItem, onClick: () => console.log(postId) },
            react_1.default.createElement(Text_1.Text, { size: 12, color: Text_2.EColor.gray99 }, "\u0421\u043A\u0440\u044B\u0442\u044C")),
        react_1.default.createElement("div", { className: menuitemlist_css_1.default.divider }),
        react_1.default.createElement("li", { className: menuitemlist_css_1.default.menuItem },
            react_1.default.createElement(Icons_1.WarningIcon, null),
            react_1.default.createElement(Text_1.Text, { size: 12, color: Text_2.EColor.gray99 }, "\u041F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C\u0441\u044F"))));
}
//# sourceMappingURL=MenuItemList.js.map