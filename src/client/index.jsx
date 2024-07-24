import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {App} from '../App';

window.addEventListener(
    'load', 
    () => {
    ReactDOM.createRoot(document.getElementById('react_root'),).render(<App />);
    }
);