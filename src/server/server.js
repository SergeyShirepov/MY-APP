import express from 'express';
import ReactDOMServer from 'react-dom/server';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { App } from '../App.tsx';
import { indexTemplate } from './indexTemplate.tsx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use('/static', express.static(path.join(__dirname, '../../dist/client')));

app.get('/', (req, res) => {
  const appString = ReactDOMServer.renderToString(App());
  res.send(indexTemplate(appString));
});

app.listen(3000, () => {
  console.log('SSR Server started on http://localhost:3000');
});