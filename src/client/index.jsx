import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { App } from '../App';

  const container = document.getElementById('react_root');
  if (container) {
    hydrateRoot(container, <App />);
  } else {
    console.error('Root container not found');
  }