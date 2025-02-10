import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);

  if (module.hot) {
    module.hot.accept('./App', () => {
      const NextApp = require('./App').default;
      root.render(<NextApp />);
    });
  }

} else {
  console.error('No element with id "root" found.');
}


