"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = Menu;
const react_1 = __importDefault(require("react"));
const menu_css_1 = __importDefault(require("./menu.css"));
const Icons_1 = require("../../../Icons");
const Dropdown_1 = require("../../../Dropdown");
const Text_1 = require("../../../Text");
const MenuItemList_1 = require("./MenuItemList");
function Menu() {
    return (react_1.default.createElement("div", { className: menu_css_1.default.menu },
        react_1.default.createElement(Dropdown_1.Dropdown, { button: react_1.default.createElement("button", { className: menu_css_1.default.menuButton },
                react_1.default.createElement(Icons_1.MenuIcon, null)) },
            react_1.default.createElement("div", { className: menu_css_1.default.dropDown },
                react_1.default.createElement(MenuItemList_1.MenuItemList, { postId: '1234' }),
                react_1.default.createElement("button", { className: menu_css_1.default.closeButton },
                    react_1.default.createElement(Text_1.Text, { mobileSize: 12, size: 14, color: Text_1.EColor.gray66 }, "\u0417\u0430\u043A\u0440\u044B\u0442\u044C"))))));
}
//# sourceMappingURL=Menu.js.map