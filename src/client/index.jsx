import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { App } from '../App';

const container = document.getElementById('react_root');
if (container) {
    hydrateRoot(container, <App token={window.__token__} />);
} else {
    console.error('Root container not found');
}