import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { App } from '../App.tsx';
import { indexTemplate } from './indexTemplate.tsx';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();


app.use('/static', express.static(path.join(__dirname, '../../dist/client')));

app.get('/', (req, res) => {
  const appString = ReactDOMServer.renderToString(React.createElement(App));
  res.send(indexTemplate(appString, null)); // Передаем null, так как у нас нет access_token
});

app.get('/auth', (req, res) => {
  axios.post(
      'https://www.reddit.com/api/v1/access_token',
      `grant_type=authorization_code&code=${req.query.code}&redirect_uri=http://localhost:3000/auth`,
      {
        auth: { username: process.env.CLIENT_ID, password: 'uW5RuT-6oP0vLKBIyjP9w09YyhRmcQ' },
        headers: { 'Content-type': 'application/x-www-form-urlencoded' }
      }
  )
      .then(({ data }) => {
        const appString = ReactDOMServer.renderToString(React.createElement(App, { token: data['access_token'] }));
        res.send(indexTemplate(appString, data['access_token']));
      })
      .catch(error => {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        res.status(500).send(`Error fetching data: ${error.response ? error.response.data : error.message}`);
      });
});

app.listen(3000, () => {
  console.log('SSR Server started on http://localhost:3000');
});