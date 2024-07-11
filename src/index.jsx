import * as React from "react";
import * as ReactDOM from "react-dom";
import { Header } from "..Header";

window.addEventListener(
    'load', 
    () => {
    ReactDOM.createRoot(document.getElementById('react_root'),).render(<Header />);
    }
);