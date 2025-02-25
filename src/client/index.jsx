import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { App } from '../App';

async function startServiceWorker() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('../mocks/browser.js');
    return worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
  return Promise.resolve();
}

startServiceWorker().then(() => {
  const container = document.getElementById('react_root');
  if (container) {
    hydrateRoot(container, <App />);
  } else {
    console.error('Root container not found');
  }
});