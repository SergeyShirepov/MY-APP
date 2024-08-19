"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = App;
const react_1 = __importDefault(require("react"));
const Layout_1 = require("./shared/Layout");
const Header_1 = require("./shared/Header/Header");
const Content_1 = require("./shared/Content");
require("./main.global.css");
const CardsList_1 = require("./shared/CardsList");
// import { GenericList } from './shared/genericlist/genericlist';
// import { assignId, generateId, generateRandomString } from '../utils/react/generateRandomIndex';
// import { merge } from '../utils/js/merge';
// const LIST = [
//     {As: 'a' as const, text: 'some'},
//     {As: 'a' as const, text: 'other some'},
//     {As: 'a' as const, text: 'some'},
// ].map(generateId)
function App() {
    // const [list, setList] =React.useState(LIST);
    // const handleItemClick = (id:string) => {
    //     setList(list.concat(generateId({text: generateRandomString(), As: 'a' as const })));
    // }
    return (react_1.default.createElement(Layout_1.Layout, null,
        react_1.default.createElement(Header_1.Header, null),
        react_1.default.createElement(Content_1.Content, null,
            react_1.default.createElement(CardsList_1.CardsList, null),
            react_1.default.createElement("div", { style: { padding: 20 } },
                react_1.default.createElement("br", null)))));
}
// export const AppComponent = Component () => <AppComponent></AppComponent>
//# sourceMappingURL=App.js.map