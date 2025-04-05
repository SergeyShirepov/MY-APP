import app from './app.js';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { App } from '../App.tsx';
import { indexTemplate } from './indexTemplate.tsx';

app.get('*', (req, res) => {
  const appString = ReactDOMServer.renderToString(React.createElement(App));
  res.send(indexTemplate(appString));
});

app.listen(3000, () => {
  console.log('SSR Server started on http://localhost:3000');
});