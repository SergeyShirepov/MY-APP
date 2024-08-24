import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {App} from '../App';

window.addEventListener(
    'load', 
    () => {
    ReactDOM.hydrateRoot(<App />, document.getElementById('react_root'));
    }
);