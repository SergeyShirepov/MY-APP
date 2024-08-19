"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardsList = CardsList;
const react_1 = __importDefault(require("react"));
const Card_1 = require("./Card");
const cardslist_css_1 = __importDefault(require("./cardslist.css"));
function CardsList() {
    return (react_1.default.createElement("ul", { className: cardslist_css_1.default.cardlist },
        react_1.default.createElement(Card_1.Card, null)));
}
//# sourceMappingURL=CardsList.js.map