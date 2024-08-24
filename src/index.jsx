import * as React from "react";
import { createRoot } from "react-dom/client";
import { App } from "../src/App";
// import { Header } from "./shared/Header";

window.addEventListener('load', () => {
    const rootElement = document.getElementById('react_root');
    if (rootElement) {
        const root = createRoot(rootElement);
        root.render(<App />);
    } else {
        console.error('No element with id "react_root" found.');
    }
});


