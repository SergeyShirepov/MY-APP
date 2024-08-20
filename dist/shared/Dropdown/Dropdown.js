"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dropdown = Dropdown;
const react_1 = __importDefault(require("react"));
const dropdown_css_1 = __importDefault(require("./dropdown.css"));
const noop = () => { };
function Dropdown({ button, children, isOpen, onOpen = noop, onClose = noop }) {
    const [isDropdownOpen, setIsDropdownOpen] = react_1.default.useState(isOpen);
    react_1.default.useEffect(() => setIsDropdownOpen(isOpen), [isOpen]);
    react_1.default.useEffect(() => isDropdownOpen ? onOpen() : onClose(), [isDropdownOpen]);
    const handleOpen = () => {
        if (isOpen === undefined) {
            setIsDropdownOpen(!isDropdownOpen);
        }
    };
    return (react_1.default.createElement("div", { className: dropdown_css_1.default.container },
        react_1.default.createElement("div", { onClick: () => setIsDropdownOpen(!isDropdownOpen) }, button),
        isDropdownOpen && (react_1.default.createElement("div", { className: dropdown_css_1.default.listContainer },
            react_1.default.createElement("div", { className: dropdown_css_1.default.list, onClick: () => setIsDropdownOpen(false) }, children)))));
}
//# sourceMappingURL=Dropdown.js.map