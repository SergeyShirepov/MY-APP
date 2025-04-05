import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { App } from '../../App.tsx';
import { indexTemplate } from '../indexTemplate.tsx';

export const renderApp = (req, res) => {
  const appString = ReactDOMServer.renderToString(React.createElement(App));
  res.send(indexTemplate(appString));
};